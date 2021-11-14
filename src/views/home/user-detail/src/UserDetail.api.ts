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
   * 查看详情（用户点击）
   * @param {id:''} (老师id)
   * @returns
   */
  details(params?: any) {
    return Send({
      mock: {
        msg: '操作成功',
        code: '0',
        data: [
          {
            id: '用户id',
            tx: '头像',
            xm: '姓名',
            sex: '1男2女',
            xl: '学历',
            zjnx: '执教年限',
            introduce: '自我介绍',
            isSfRz: '身份信息 1 未认证 2已认证',
            isJsZgRz: '执教资格 1 未认证 2已认证',
            userId: '用户id',
            scList: [
              {
                fyId: '费用id',
                jdId: '阶段id',
                jdCn: '阶段名称',
                kmId: '科目id',
                kmCn: '科目名称',
                fy: '价格'
              }
            ],
            pxList: [
              {
                nc: '昵称',
                content: '评价内容',
                xj: '星级',
                updateTime: '评价时间'
              }
            ]
          }
        ]
      },
      url: '/rest/user/details',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }

  /**
   * 查看详情（老师点击）
   * @param {id:''} (需求id)
   * @returns
   */
  lsdetails(params?: any) {
    return Send({
      mock: {
        msg: '操作成功',
        code: '0',
        data: {
          demandSideId: '需求id',
          tx: '头像',
          xm: '姓名',
          sex: '1男2女',
          jdId: '阶段id',
          jdCn: '阶段名称',
          kmId: '科目id',
          kmCn: '科目名称',
          isSfRz: '身份信息 1 未认证 2已认证',
          fbContent: '需求描述',
          userId: '用户id'
        }
      },
      url: '/rest/ls/details',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }
}

export const PpsUserDetailApi = new Api()
