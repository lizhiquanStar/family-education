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
  // 获取用户信息
  getInfo(params?: any) {
    return Send({
      url: '/rest/share/getInfo',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }
  // 更新老实
  updateTeacherInfo(params?: any) {
    return Send({
      url: '/rest/ls/supplement',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    })
  }
  // 更新用户
  updateStudentInfo(params?: any) {
    return Send({
      url: '/rest/user/userSupplement',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    })
  }
  /**
   * 更新头像
   * @param params{userTx:''}
   * @returns
   */
  updateTx(params?: any) {
    return Send({
      mock: {
        msg: '操作成功',
        code: '0'
      },
      url: '/rest/share/updateTx',
      params,
      unauthorized: true,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    })
  }
}

export const PpsEditBaseInfoApi = new Api()
