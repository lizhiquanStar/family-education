import { ButtonAdapter } from '@/components/base/button/src/BaseButton.adapter'
import forOwn from 'lodash/forOwn'
import { CusGridAdapter } from '@/components/customize/grid/src/CusGrid.adapter'
export enum COMPONENT_TYPE {
  // Small
  button = 'button',
  buttonGroup = 'buttonGroup',
  input = 'input',
  checkbox = 'checkbox',
  pagination = 'pagination',
  // Base
  tabs = 'tabs',
  tree = 'tree',
  form = 'form',
  dialog = 'dialog',
  // Combo
  grid = 'grid',
  search = 'search',
  formDialog = 'formDialog',
  addEditDialog = 'addEditDialog',
  dataBus = 'dataBus',
  // others
  asyncData = 'asyncData'
}

export interface ComponentConfig {
  // Small
  button?: ButtonAdapter
  grid?: CusGridAdapter
}

export enum COMPONENT_METHOD {
  gridUpdate = 'grid-update',
  gridSetParams = 'grid-setParams',
  gridResetPage = 'grid-resetPage',

  formValidate = 'form-validate',
  formReset = 'form-reset',

  searchSearch = 'search-search',
  searchReset = 'search-reset',

  changeableFormValidate = 'changeableForm-validate',
  changeableFormAdd = 'changeableForm-add',

  tabsSetTab = 'tabs-setTab',

  dialogOpen = 'dialog-open',
  dialogClose = 'dialog-close',
  dialogSubmit = 'dialog-submit',
  dialogSubmiting = 'dialog-submiting',
  dialogSubmited = 'dialog-submited',

  formDialogOpen = 'formDialog-open',
  formDialogClose = 'formDialog-close',
  formDialogReset = 'formDialog-reset',
  formDialogValidate = 'formDialog-validate',

  addEditDialogOpen = 'addEditDialog-open',
  addEditDialogClose = 'addEditDialog-close',
  addEditDialogReset = 'addEditDialog-reset',
  addEditDialogValidate = 'addEditDialog-validate',

  treeGetData = 'tree-getData',
  treeGetCheckedKeys = 'tree-getCheckedKeys',

  dataBusSend = 'dataBus-send',
  dataBusEmit = 'dataBus-emit',

  asyncDataSend = 'asyncData-send',
  asyncDataSetData = 'asyncData-setData',
  asyncDataSetParams = 'asyncData-setParams'
}

export enum COMPONENT_DATA {
  searchParams = 'search-params',

  gridPage = 'grid-page',
  gridPagesize = 'grid-pageSize',
  gridTotal = 'grid-total',
  gridResponseData = 'grid-responseData',

  amapMap = 'amap-map'
}

export const EmitComponentMethodConfig: {
  [name: string]: { type: COMPONENT_TYPE; outputName: string }
} = {}
forOwn(COMPONENT_METHOD, (value: string) => {
  EmitComponentMethodConfig[value] = {
    type: value.split('-')[0] as COMPONENT_TYPE,
    outputName: value.split('-')[1]
  }
})

export const ReceiveComponentDataConfig: {
  [name: string]: { type: COMPONENT_TYPE; outputName: string }
} = {}
forOwn(COMPONENT_DATA, (value: string) => {
  ReceiveComponentDataConfig[value] = {
    type: value.split('-')[0] as COMPONENT_TYPE,
    outputName: value.split('-')[1]
  }
})

export interface CustomizeComponentBase {
  id: string
  type: COMPONENT_TYPE
  output: { [k: string]: any }
  Config: { [k: string]: any }
}

export interface BaseComponent {
  compName?: string
  inner?: boolean
  id: string
  $$type: COMPONENT_TYPE
  output?: { [k: string]: any }
  Config: { [k: string]: any }
}

export interface FormComponentBase extends BaseComponent {
  Config: { [k: string]: any }
  overrideModelChange?: boolean
}
