import { Send, HTTP_METHODS } from '@/core/http'
class Api {
  list(params?: any) {
    return Send({
      url: '/rest/ls/myYj',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }
  pay(params?: any) {
    return Send({
      url: '/rest/wxPay/unifiedYj',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    })
  }
}

export const PpsMyDepositApi = new Api()
