import { InsertChange } from './../../utils/change'
import { CliConfig } from './../../config'
import {
  Rule,
  Tree,
  mergeWith,
  apply,
  url,
  move,
  MergeStrategy,
  applyTemplates,
  chain,
  noop,
  filter
} from '@angular-devkit/schematics'
import { normalize } from 'path'
import { strings } from '@angular-devkit/core'
import { join } from 'path'
import { setConfigToOptions } from '../../utils/options'
import { readIntoSourceFile, readIntoSourceText } from '../../utils/file'
import {
  insertImport,
  findNodes,
  getTextIndentation,
  isImported
} from '../../utils/ast-utils'
import ts = require('typescript')

export function setViewRouter(options: CliConfig): Rule {
  return (host: Tree) => {
    const classifyName = strings.classify(options.name)
    const dasherizeName = strings.dasherize(options.name)
    // 如果是模块页面下，只要将新建路由代码注入到模块的index.route.ts中
    if (options.module) {
      const routerPath = join(
        options.viewPath,
        options.module,
        'index.route.ts'
      )
      const routerSource = readIntoSourceFile(host, routerPath)
      const insertCode = `
  {
    name: '${classifyName}',
    path: '/${dasherizeName}',
    component: () =>
      import(/* webpackChunkName: "${dasherizeName}" */ './${dasherizeName}')
  }`
      if (readIntoSourceText(host, routerPath).includes(insertCode)) return host
      // 默认最后一个export default导出的数组为该moduleRouter对象
      const exportNodes = findNodes(
        routerSource,
        ts.SyntaxKind.ExportAssignment
      )
      if (exportNodes && exportNodes.length) {
        const exportObjectNode = (exportNodes[0] as ts.ExportAssignment)
          .expression as ts.ArrayLiteralExpression
        const hasOtherRoute = !!exportObjectNode.elements.length
        const routerRecorder = host.beginUpdate(routerPath)
        routerRecorder.insertLeft(
          exportObjectNode.pos + 2,
          `${insertCode}${hasOtherRoute ? ',' : ''}`
        )

        host.commitUpdate(routerRecorder)
      }
    } else {
      const routerPath = options.mainRouterPath
      const routerSource = readIntoSourceFile(host, options.mainRouterPath)
      const viewRouteName = `${classifyName}Route`
      const viewRoutePath = join(
        options.routerToViewPath,
        options.name,
        '/index.route'
      )
      if (isImported(routerSource, viewRouteName, viewRoutePath)) return host
      const change = insertImport(
        routerSource,
        routerPath,
        viewRouteName,
        viewRoutePath,
        true
      )
      const routerRecorder = host.beginUpdate(routerPath)
      if (change instanceof InsertChange) {
        routerRecorder.insertLeft(change.pos + 1, change.toAdd)
      }

      // 向ruotes定义的变量里插入路由
      // ts.SyntaxKind.PropertyAssignment 可以处理export default中
      // ts.SyntaxKind.VariableDeclaration 处理的是变量
      const arrayNodes = findNodes(routerSource, ts.SyntaxKind.VariableDeclaration)
        .reverse()
        .filter((node: ts.PropertyAssignment) => {
          return node.getChildren().some(node => node.getText() === 'routes')
        })
      if (arrayNodes && arrayNodes.length) {
        const routerNode = arrayNodes[0]
        const routesArrayNode = routerNode
          .getChildren()
          .find(node => node.kind === ts.SyntaxKind.ArrayLiteralExpression)
        if (routesArrayNode) {
          const indentation = getTextIndentation((routesArrayNode as ts.ArrayLiteralExpression).elements
            .find(node => node.kind === ts.SyntaxKind.ObjectLiteralExpression)!
            .getFullText()
          )
          const routesChange = new InsertChange(
            routerPath,
            routesArrayNode.pos + 2,
            `${indentation}${viewRouteName},`
          )
          routerRecorder.insertLeft(routesChange.pos, routesChange.toAdd)
        }
      }

      host.commitUpdate(routerRecorder)
    }
    return host
  }
}

export function view(options: CliConfig): Rule {
  return () => {
    // 设置默认和用户配置
    options = setConfigToOptions(options)

    const dirPath = options.module
      ? join(options.viewPath, options.module)
      : options.viewPath // 添加view文件夹所在的地址

    const movePath = normalize(dirPath)
    const templateSource = apply(url('./templates'), [
      options.module
        ? filter(path => !path.endsWith('index.route.ts.template'))
        : noop(),
      applyTemplates({ ...strings, ...options }),
      move(movePath)
    ])
    return chain([
      setViewRouter(options),
      mergeWith(templateSource, MergeStrategy.Overwrite)
    ])
  }
}
