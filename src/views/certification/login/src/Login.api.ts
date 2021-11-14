import { Send, HTTP_METHODS, HTTP_BODY_TYPES } from '@/core/http'
class Api {
  login(params?: any) {
    return Send({
      url: '/rest/wxlogin',
      params,
      unauthorized: true,
      method: HTTP_METHODS.GET,
      bodyType: HTTP_BODY_TYPES.X_WWW_FORM_URLENCODED,
      errorText: '获取数据失败'
    })
  }

  register(params?: any) {
    return Send({
      url: '/rest/wxregister',
      params,
      unauthorized: true,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    })
  }

  // 用户信息
  getUserInfo() {
    return Send({
      url: '/rest/share/getInfo',
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }
}

export const PpsLoginApi = new Api()
