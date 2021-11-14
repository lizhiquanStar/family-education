import { Send, HTTP_METHODS } from '@/core/http'
class Api {
  // 列表接口
  list(params?: any) {
    return Send({
      url: '/rest/ls/KcList',
      params,
      method: HTTP_METHODS.GET,
      isHandleBySelf: true,
      errorText: '获取数据失败'
    })
  }
  startEndService(params?: any) {
    return Send({
      url: '/rest/ls/updateKcState',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    })
  }

  upDateContent(params?: any) {
    return Send({
      url: '/rest/ls/updateKcContent',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    })
  }
}

export const PpsMyCoursesApi = new Api()
