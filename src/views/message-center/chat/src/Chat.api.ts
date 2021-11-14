import { Send, HTTP_METHODS } from '@/core/http'
class Api {
  list(params?: any) {
    return Send({
      url: '/rest/share/getGtContentList',
      params,
      method: HTTP_METHODS.GET,
      isHandleBySelf: true,
      errorText: '获取数据失败'
    })
  }
}

export const PpsChatApi = new Api()
