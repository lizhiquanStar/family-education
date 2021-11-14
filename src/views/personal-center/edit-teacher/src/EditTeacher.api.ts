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
  getZd(params?: any) {
    return Send({
      url: '/rest/share/getZdlist',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }
  updateTeacher(params?: any) {
    return Send({
      url: '/rest/ls/jszgAdd',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    })
  }
  jszgzDetail(params?: any) {
    return Send({
      url: '/rest/ls/getIdZjzgz',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }
}

export const PpsEditTeacherApi = new Api()
