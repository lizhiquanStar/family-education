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
  //
  getZd(params?: any) {
    return Send({
      url: '/rest/share/getZdlist',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }
  getDetail(url, params?: any) {
    return Send({
      url,
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }
  updatePublish(url, params?: any) {
    return Send({
      url,
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    })
  }
  // 教师资格证列表
  jszgList(params?: any) {
    return Send({
      url: '/rest/ls/getSelectJszgz',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }
}

export const PpsEditPublishApi = new Api()
