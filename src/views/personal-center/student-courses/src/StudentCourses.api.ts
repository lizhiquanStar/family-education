import { Send, HTTP_METHODS } from '@/core/http'
class Api {
  // 列表接口
  list(params?: any) {
    return Send({
      url: '/rest/user/list',
      params,
      method: HTTP_METHODS.GET,
      isHandleBySelf: true,
      errorText: '获取数据失败'
    })
  }
  // 确认完成
  confirmOrder(params?: any) {
    return Send({
      url: '/rest/user/updateFwZt',
      params,
      method: HTTP_METHODS.POST,
      isHandleBySelf: true,
      errorText: '获取数据失败'
    })
  }
}

export const PpsStudentCoursesApi = new Api()
