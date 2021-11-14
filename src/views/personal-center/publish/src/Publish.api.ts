import { Send, HTTP_METHODS } from '@/core/http'
class Api {
  // 列表接口
  list(params?: any) {
    return Send({
      url: '/rest/user/fbList',
      params,
      method: HTTP_METHODS.GET,
      isHandleBySelf: true,
      errorText: '获取数据失败'
    })
  }
  lsList(params?: any) {
    return Send({
      url: '/rest/ls/fbList',
      params,
      method: HTTP_METHODS.GET,
      isHandleBySelf: true,
      errorText: '获取数据失败'
    })
  }
  // 删除发布
  delPublish(url, params?: any) {
    return Send({
      url,
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }
}

export const PpsPublishApi = new Api()
