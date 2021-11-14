import { Send, HTTP_METHODS } from '@/core/http'
class Api {
  // 列表接口
  list(params?: any) {
    return Send({
      url: '/rest/ls/jsList',
      params,
      isHandleBySelf: true,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }
}

export const PpsMySettlementApi = new Api()
