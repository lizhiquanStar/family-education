import { Send, HTTP_METHODS } from '@/core/http'
class Api {
  submit(params?: any) {
    return Send({
      url: '/rest/user/updateYdSj',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    })
  }
}

export const PpsAppointedTimeApi = new Api()
