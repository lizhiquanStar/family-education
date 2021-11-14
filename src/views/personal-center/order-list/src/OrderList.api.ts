import { Send, HTTP_METHODS } from '@/core/http'
class Api {
  list(params?: any) {
    return Send({
      url: '/rest/user/orderList',
      params,
      method: HTTP_METHODS.GET,
      isHandleBySelf: true,
      errorText: '获取数据失败'
    })
  }

  /**
   * 订单提交
   *        订单id
   * @param   {
             "name": "订单名称",
            "remark": "备注",
            "sje": '总金额',
            "zsl": '总数量'
            "kcOrderItemList": [
              {
                "fyId": '费用id',
                "jd": "阶段名称",
                "jdId": '阶段id',
                "je": '单价',
                "km": "科目名称",
                "kmId": '科目id',
                "lsId": '老师id',
                "lsMc": "老师名称",
                "sl": '数量'
              }
            ]
          }
   * @returns
   */
  orderSubmit(params?: any) {
    return Send({
      mock: {
        msg: '操作成功',
        code: '0',
        data: { id: '1', orderNo: '2', openId: '3' }
      },
      url: '/rest/user/orderSubmit',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    })
  }

  /**
   * 再支付请求订单号
   *        订单id
   * @param {id: ''}
   * @returns
   */
  getZfzOrderNo(params?: any) {
    return Send({
      mock: {
        msg: '操作成功',
        code: '0',
        data: '订单编号'
      },
      url: '/rest/user/updateOrderPayState',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }

  /**
   * 统一下单接口（订单）
   *        订单编号          支付人openId
   * @param {outTradeNo: '',openId: ''}
   * @returns
   */
  unifiedOrder(params?: any) {
    return Send({
      mock: {
        msg: '操作成功',
        code: '0',
        data: {
          appId: '',
          timeStamp: '',
          nonceStr: '',
          package: '',
          signType: '',
          paySign: ''
        }
      },
      url: '/rest/wxPay/unifiedOrder',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    })
  }

  /**
   * 更新支付状态
   *        订单编号      订单状态(1待支付2已支付)  实际支付金额  支付方式(1支付宝2微信3银联)
   * @param {orderNo: '',state: '',zfjeb: '',zfsf: ''}
   * @returns
   */
  updateOrderPayState(params?: any) {
    return Send({
      mock: {
        msg: '操作成功',
        code: '0'
      },
      url: '/rest/user/updateOrderPayState',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    })
  }

  /**
   * 查看课程接口
   *           订单id    课程状态{1 未服务 2 服务中 3 服务结束}   页码       显示数量
   * @param {orderId:'',state:'',pageNo:'',pageSize:''} (订单状态(1 未服务 2 服务中 3 服务结束))
   * @returns
   */
  kclist(params?: any) {
    return Send({
      mock: {
        msg: '操作成功',
        code: '0',
        total: '',
        rows: [
          {
            id: '课程id',
            jdId: '阶段id',
            jd: '初中',
            kmId: '科目Id',
            km: '语文',
            state: '1 未服务 2 服务中 3 服务结束',
            startTime: '开始时间',
            endTime: '结束时间',
            isSfRz: '身份信息1未认证2已认证',
            isJsZgRz: '执教资格 1 未认证 2已认证',
            userId: '用户Id',
            lsId: '老师id',
            lsMc: '老师名称'
          }
        ]
      },
      url: '/rest/user/list',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }

  /**
   * 取消订单
   * @param {id: ''}(订单id)
   * @returns
   */
  cancelOrder(params?: any) {
    return Send({
      url: '/rest/user/cancelOrder',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }

  /**
   * 约定时间
   *        课程id   开始时间        结束时间
   * @param {id: '',startTime: '',endTime: ''}
   * @returns
   */
  updateYdSj(params?: any) {
    return Send({
      mock: {
        msg: '操作成功',
        code: '0'
      },
      url: '/rest/user/updateYdSj',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    })
  }

  /**
   * 评价
   *        课程id   评星   评级
   * @param {id: '',px: '',pj: ''}
   * @returns
   */
  updateKcPjPx(params?: any) {
    return Send({
      mock: {
        msg: '操作成功',
        code: '0'
      },
      url: '/rest/user/updateKcPjPx',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    })
  }

  /**
   * 确定服务完成
   *        课程id
   * @param {id: ''}
   * @returns
   */
  updateFwZt(params?: any) {
    return Send({
      mock: {
        msg: '操作成功',
        code: '0'
      },
      url: '/rest/user/updateFwZt',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    })
  }
}

export const PpsOrderListApi = new Api()
