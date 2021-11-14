import { CliConfig } from '../../config'
import {
  url,
  Rule,
  applyTemplates,
  move,
  chain,
  mergeWith,
  MergeStrategy,
  apply,
  Tree
} from '@angular-devkit/schematics'
import { setConfigToOptions } from '../../utils/options'
import { normalize, join } from 'path'
import { strings } from '@angular-devkit/core'
import { readIntoSourceFile } from '../../utils/file'
import {
  findNodes,
  insertImport,
  getTextIndentation
} from '../../utils/ast-utils'
import ts = require('typescript')
import { InsertChange } from '../../utils/change'

function setViewRouter(options: CliConfig): Rule {
  return (host: Tree) => {
    const classifyName = strings.classify(options.name)

    const routerPath = options.modulePath
      ? join(options.viewPath, options.modulePath, '/index.route.ts')
      : options.mainRouterPath
    const routerSource = readIntoSourceFile(host, routerPath)
    const viewRouteName = `${classifyName}Routes`
    const viewRoutePath = options.modulePath
      ? join('./', options.modulePath, '/index.route')
      : join(options.routerToViewPath, options.name, '/index.route')
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

    // 默认最后一个带有routes属性的对象为Router对象
    const arrayNodes = findNodes(routerSource, ts.SyntaxKind.VariableDeclaration)
      .reverse()
      .filter((node: ts.VariableStatement) => {
        return node.getChildren().some(node => node.getText() === 'routes')
      })
    if (arrayNodes && arrayNodes.length) {
      const routerNode = arrayNodes[0]
      const routesArrayNode = routerNode.getChildren().find(node => node.kind === ts.SyntaxKind.ArrayLiteralExpression)
      if (routesArrayNode) {
        const ele = (routesArrayNode as ts.ArrayLiteralExpression).elements
        .find(node =>{
          return node.kind === ts.SyntaxKind.SpreadElement
        })
        const indentation = ele ? getTextIndentation(ele!.getFullText()): ''
        const routesChange = new InsertChange(
          routerPath,
          routesArrayNode.pos + 2,
          `...${viewRouteName}${indentation ? ', ' : ''}`
        )
        routerRecorder.insertLeft(routesChange.pos, routesChange.toAdd)
      }
    }

    host.commitUpdate(routerRecorder)
    return host
  }
}

export function module(options: CliConfig): Rule {
  return () => {
    // 设置默认和用户配置
    options = setConfigToOptions(options)

    const movePath = normalize(options.viewPath)
    const templateSource = apply(url('./templates'), [
      applyTemplates({ ...strings, ...options }),
      move(movePath)
    ])
    return chain([
      setViewRouter(options),
      mergeWith(templateSource, MergeStrategy.Overwrite)
    ])
  }
}
