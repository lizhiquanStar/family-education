import { Send, HTTP_METHODS } from '@/core/http'
class Api {
  // 列表接口
  list(params?: any) {
    return Send({
      url: '/admin/list',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }
  cardDetails(params?: any) {
    return Send({
      url: '/rest/share/cardDetails',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }
  // 更新身份信息
  updateCard(params?: any) {
    return Send({
      url: '/rest/share/userSfSubmit',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    })
  }
}

export const PpsEditIdentityApi = new Api()
