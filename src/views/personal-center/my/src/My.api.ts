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

export const PpsMyApi = new Api()
