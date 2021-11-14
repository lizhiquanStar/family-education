import { getUrlParam } from './common'
import { store } from '@/store'
/**
 * getDeviceWidth 获取设备宽高
 * @returns {windowWidth, windowHeight}
 */
export const getDeviceWidth = () => {
  let windowWidth = window.innerWidth
  let windowHeight = window.innerHeight
  if (typeof windowWidth !== 'number') {
    if (document.compatMode === 'CSS1Compat') {
      windowWidth = document.documentElement.clientWidth
      windowHeight = document.documentElement.clientHeight
    } else {
      windowWidth = document.body.clientWidth
      windowHeight = document.body.clientHeight
    }
  }
  return {
    windowWidth: windowWidth,
    windowHeight: windowHeight
  }
}

// 微信授权
export const getWexinCode = () => {
  const code = getUrlParam('code') || window.GLOBAL_CONFIG.wechatCode // 截取路径中的code
  const APPID = window.GLOBAL_CONFIG.appid
  if (code == null || code === '') {
    const local = window.location.href
    window.location.href = `
    https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${encodeURIComponent(
      local
    )}&response_type=code&scope=snsapi_base&state=1#wechat_redirect`
  } else {
    store.dispatch('getOpenId', { code })
  }
}
