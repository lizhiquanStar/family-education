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
  jszgList(params?: any) {
    return Send({
      url: '/rest/ls/zjzgList',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }
  delJszgz(params?: any) {
    return Send({
      url: '/rest/ls/delJszg',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    })
  }
}

export const PpsTeacherInfoApi = new Api()
