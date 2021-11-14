export interface CliAdapter {
  exportScssPath?: string
  mainRouterPath?: string

  viewPath?: string
  routerToViewPath?: string
}

export interface CliConfig {
  [k: string]: any
  exportScssPath: string
  mainRouterPath: string

  viewPath: string
  routerToViewPath: string
  baseComponentPath: string
  formComponentPath: string
  customizeComponentPath: string
  functionalComponentPath: string
  businessComponentPath: string

  businessComponentPrefix: string
}

type ViewType = 'Module' | 'Page' | 'Crud' | 'Component'

export interface ViewDirItem {
  name: string
  type: ViewType
  child?: ViewDirItem[]
}

export interface ViewDirCliItem extends ViewDirItem {
  parentPath?: string
  child?: ViewDirCliItem[]
}

export interface ViewConfigAdapter {
  dirs: ViewDirItem[]
}

export const CLI_DEFAULT_CONFIG: CliConfig = {
  exportScssPath: 'src/core/styles/export.scss',
  routerToViewPath: '../views',
  mainRouterPath: 'src/router/router.ts',
  viewPath: 'src/views',
  baseComponentPath: 'src/components/base',
  formComponentPath: 'src/components/base/form',
  customizeComponentPath: 'src/components/customize',
  functionalComponentPath: 'src/components/functional',
  businessComponentPath: 'src/components/business',
  businessComponentPrefix: 'Pps' // 潘帕斯
}
