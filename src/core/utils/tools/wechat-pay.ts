import { Toast } from 'vant'
export function onBridgeReady(res, callback?: Function) {
  // eslint-disable-next-line no-undef

  WeixinJSBridge.invoke(
    'getBrandWCPayRequest',
    {
      appId: window.GLOBAL_CONFIG.appid,
      timeStamp: res.timeStamp,
      nonceStr: res.nonceStr,
      package: res.package,
      signType: res.signType,
      paySign: res.paySign
    },
    res => {
      if (res.err_msg == 'get_brand_wcpay_request:ok') {
        callback && callback('ok')
      } else {
        callback && callback('err')
        Toast.fail('调取微信支付失败')
      }
      Toast.clear()
    }
  )
}

export function WeiXinPay(res, callback?: Function) {
  if (typeof WeixinJSBridge == 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
    } else if ((document as any).attachEvent) {
      ;(document as any).attachEvent('WeixinJSBridgeReady', onBridgeReady)
      ;(document as any).attachEvent('onWeixinJSBridgeReady', onBridgeReady)
    }
  } else {
    onBridgeReady(res, callback)
  }
}
