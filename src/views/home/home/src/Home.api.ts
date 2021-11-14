import { Send, HTTP_METHODS } from '@/core/http'
class Api {
  // 用户首页接口
  list(params?: any) {
    return Send({
      url: '/rest/user/index',
      params,
      method: HTTP_METHODS.POST,
      isHandleBySelf: true,
      errorText: '获取数据失败'
    })
  }
  lslist(params?: any) {
    return Send({
      url: '/rest/ls/index',
      params,
      isHandleBySelf: true,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    })
  }
}

export const PpsHomeApi = new Api()
