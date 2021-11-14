import { Send, HTTP_METHODS } from '@/core/http'
class Api {
  userNotice(params?: any) {
    return Send({
      url: '/rest/getXzTk',
      params,
      unauthorized: true,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }
}

export const PpsUserNoticeApi = new Api()
