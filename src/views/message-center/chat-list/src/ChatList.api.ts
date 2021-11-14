import { Send, HTTP_METHODS } from '@/core/http'
class Api {
  list(params?: any) {
    return Send({
      url: '/rest/share/index',
      params,
      method: HTTP_METHODS.GET,
      isHandleBySelf: true,
      errorText: '获取数据失败'
    })
  }

  /**
   * 新增聊天主体
   * @param {anotherId: ''}(对方id)
   * @returns
   */
  gtAdd(params?: any) {
    return Send({
      mock: {
        msg: '操作成功',
        code: '0'
      },
      url: '/rest/share/gtAdd',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    })
  }

  /**
   * 删除聊天主体
   * @param {id: ''}(聊天主体id)
   * @returns
   */
  delGt(params?: any) {
    return Send({
      url: '/rest/share/delGt',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }

  /**
   * 获取历史聊天记录
   *                聊天主体id         页码      显示数量
   * @param params{communicateId:'',pageNo:'',pageSize:''}
   * @returns
   */
  gtLslist(params?: any) {
    return Send({
      mock: {
        msg: '操作成功',
        code: '0',
        data: [
          {
            id: ' 聊天记录Id',
            communicateId: '聊天主体id',
            sendId: '对方编号',
            sendnc: '对方头像',
            sendTx: '对方昵称',
            jsId: '未读消息数',
            content: '最后一条消息',
            sendTime: '最后聊天的日期',
            isLatest: '是否最后一条',
            ydzt: '阅读状态(1未阅读2已阅读)'
          }
        ]
      },
      url: '/rest/share/getGtContentList',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }
}

export const PpsChatListApi = new Api()
