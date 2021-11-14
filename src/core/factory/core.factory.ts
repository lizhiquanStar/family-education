import { isArray, isUndefined, get, set, isFunction } from 'lodash'
import { COMPONENT_TYPE } from './../dtos/factories.dto'
import { AsyncData } from '../dtos/component.dto'
import { dasherize, camelize } from '../utils/tools/strings'
import { COMPONENT_METHOD, COMPONENT_DATA } from '../dtos/factories.dto'
import { FactoryService } from '../service/factory.service'
import defaultsDeep from 'lodash/defaultsDeep'
import { CancelTokenService } from '../service/cancel-token.service'
import { ELEMENT_UI_CONFIG } from './../dtos/element-ui.dto'

type listener = Function | Function[] | undefined

/**
 * 触发组件提供的方法
 * @param methodName 触发组件方法的名称
 * @param preload 传递给方法的数据
 * @param componentName 组件的名称，默认’‘
 */
const emit = (
  methodName: COMPONENT_METHOD,
  preload?: any,
  componentName = ''
) => {
  FactoryService.emit(methodName, preload, componentName)
}

/**
 * 接收组件提供的数据
 * @param dataName 接受组件数据的名称
 * @param componentName 组件的名称，默认''
 * @param isGetAllMatchData 是否返回全部匹配的数据，默认false
 */
const reveice = (
  dataName: COMPONENT_DATA,
  componentName = '',
  isGetAllMatchData = false
) => {
  return FactoryService.reveice(dataName, componentName, isGetAllMatchData)
}

/**
* 配合async/await,使函数一直等待，直到val存在
* 不要传入一个非引用变量，否则永远不会存在
 ``` javascript
  await waitUnitResultTrue(() => this.$el) // 等待直到vue绑定dom完成
  ```
  @param handleFunction 处理函数，一直等待直到handleFunction返回true
*/
const waitUnitResultTrue = async (
  handleFunction: (...args: any[]) => boolean
): Promise<void> => {
  let maxTime = (10 * 1000) / 100 // 10s
  return new Promise(resolve => {
    const interval = setInterval(() => {
      maxTime--
      if (handleFunction()) {
        clearInterval(interval)
        resolve()
      }
      if (maxTime < 0) {
        clearInterval(interval)
      }
    }, 100)
  })
}
/**
 * 过滤attrs中的属性，使其能直接v-bind至第三方ui组件
 * @param attrs config对象
 * @param attrField 需要过滤的UI组件名称
 * @param uiConfig UI配置对象
 */
const filterAttrsForVBind = (
  attrs: { [k: string]: any },
  attrField: string,
  uiConfig: any = ELEMENT_UI_CONFIG.attrFields
) => {
  if (!uiConfig[attrField]) return attrs
  const target: { [k: string]: any } = {}
  Object.keys(attrs)
    .filter(key => {
      return !!uiConfig[attrField].includes(key)
    })
    .forEach(key => {
      if (attrs[key]) {
        target[key] = attrs[key]
      }
    })
  return target
}
/**
 * 将source（output）复制给名为targetName的变量
 * @param targetName 赋值source数据的变量名称
 * @param source change事件传递出来的数据
 */
const copyOutputsToTarget = (event: any, source: { [k: string]: any }) => {
  if (event) {
    event = Object.assign(event, source)
  }
}
/**
 * 执行名为listenerName的监听函数
 * @param listenerName 监听函数的名称
 * @param listenerFuncs 包含所以监听函数的集合，如 this.Config.on / this.Config.events
 * @param args 传入给监听函数的参数
 */
const executeListenerIfExist = (
  ctx: any,
  listenerName: string,
  listenerFuncs: undefined | { [k: string]: listener },
  ...args: any[]
) => {
  if (listenerFuncs) {
    Object.keys(listenerFuncs).forEach(listenerFunc => {
      if (listenerFunc === listenerName) {
        const listeners = listenerFuncs[listenerFunc]

        if (typeof listeners === 'function') {
          listeners!.apply(ctx, args)
        } else if (isArray(listeners)) {
          listeners!
            .filter(listener => typeof listener === 'function')
            .forEach(listener => listener!.apply(ctx, args))
        }
      }
    })
  }
}
/**
 * emit名为emitName的事件并执行监听函数
 * listenerName请使用驼峰写法
 * emitName为listenerName的短横线写法
 * @param listenerName 监听函数的名称
 * @param listenerFuncs 包含所以监听函数的集合，如 this.Config.on / this.Config.events
 * @param args 传入给监听函数的参数
 */
const emitEventAndExecuteListener = (
  ctx: any,
  listenerName: string,
  listenerFuncs: undefined | { [k: string]: listener },
  ...args: any[]
) => {
  listenerName = camelize(listenerName)
  const emitName = dasherize(listenerName)
  ctx.emit(emitName, ...args)
  executeListenerIfExist(ctx, listenerName, listenerFuncs, ...args)
}
/**
 * 返回一个v-on的对象
 * 合并listeners中的监听函数，并忽略ignoreEventNames中的事件
 * @param listeners 包含监听函数对象的数组
 * @param ignoreEventNames 忽略监听事件的名称数组
 */
const mergeEventsAndDasherizeKeys = (
  listeners: ({ [k: string]: any } | undefined)[],
  ignoreEventNames?: string[]
) => {
  const target: { [k: string]: any } = {}
  for (const key in listeners) {
    const argFun = listeners[key]
    if (target[key] && typeof target[key] === 'function') {
      target[key] = [target[key], argFun]
    } else if (
      target[key] &&
      Reflect.toString.call(target[key]) === '[object Array]'
    ) {
      target[key] = [...target[key], argFun]
    } else {
      target[key] = argFun
    }
  }
  if (ignoreEventNames) {
    ignoreEventNames
      .map(event => dasherize(event))
      .forEach(event => {
        Reflect.deleteProperty(target, event)
      })
  }
  return target
}
/**
 * 异步获取类型AsyncData的数据
 * @param data 类型为AsyncData的数据
 */
const getAsyncData = async (metaData: AsyncData): Promise<any> => {
  const data: AsyncData = defaultsDeep(metaData, {
    loading: true
  })
  // 如果c存在，说明之前调的接口未结束，执行c()可以abort之前的接口请求
  if (data.c && !data.disableAbort) data.c()
  // 真正传给Api的参数，有时候params并不是最后的参数，比如表格还要带额外的查询，分页参数
  if (!data._sendParams) {
    data._sendParams = data.paramsGetter ? data.paramsGetter() : data.params
  }
  if (
    !data.disableParamsCache &&
    !isUndefined(data._sendParams) &&
    data._sendParams === data._oldParams
  ) {
    data._sendParams = undefined
    return
  }
  data.loading = true
  const api = data.api(data._sendParams)
  /**
   * CancelTokenService.set前不要有await操作，否则会导致canceler不一致的问题
   */
  data.c = CancelTokenService.get()
  const res = await api
  data._oldParams = data._sendParams
  data._sendParams = undefined
  data.c = undefined
  data.loading = false
  if (!res) return
  data.data = res
  if (data.handleKey && data.handleData) {
    const meta = get(data.data, data.handleKey, [])
    if (data.handleEach && isArray(meta)) {
      const target = await Promise.all(meta.map(data.handleData))
      set(data.data, data.handleKey, target)
    } else {
      const target = await data.handleData(meta)
      set(data.data, data.handleKey, target)
    }
  } else if (data.handleData) {
    data.data = data.handleData(res)
  }
  return data.data
}
/**
 * 异步数据注册
 * @param metaData 类型为AsyncData的数据
 */
const asyncDataRegister = (metaData: AsyncData) => {
  const cid = Math.floor(Math.random() * Math.pow(10, 20)).toString()
  const name = metaData.providerName || ''
  const type = COMPONENT_TYPE.asyncData
  const setParams = (params: any) => {
    if (isFunction(params)) {
      metaData.params = params(metaData.params)
    } else {
      metaData.params = params
    }
  }
  const output = {
    send: (params: any) => {
      setParams(params)
      metaData.send && metaData.send()
    },
    setData: metaData.set,
    setParams
  }
  metaData.providerRegisterOpt = { cid, name, type, output }
  FactoryService.register(metaData.providerRegisterOpt)
}
/**
 * 异步数据登出
 * @param metaData 类型为AsyncData的数据
 */
const asyncDataLogout = (metaData: AsyncData) => {
  if (metaData.providerRegisterOpt) {
    FactoryService.logout(metaData.providerRegisterOpt.cid)
    metaData.providerRegisterOpt = undefined
  }
}

export {
  emit,
  reveice,
  waitUnitResultTrue,
  copyOutputsToTarget,
  mergeEventsAndDasherizeKeys,
  getAsyncData,
  asyncDataRegister,
  asyncDataLogout,
  emitEventAndExecuteListener,
  filterAttrsForVBind,
  COMPONENT_METHOD
}
