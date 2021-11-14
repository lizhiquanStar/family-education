import { Toast } from 'vant'
import type { ToastPosition } from 'vant'
import mitt from 'mitt'
import { FormatDate } from '../tools/format-date'
import { serviceImgSrc } from '@/config/global.api'

export default {
  install: app => {
    // 默认头像
    app.config.globalProperties['$defaultAvatar'] = (
      window as any
    ).GLOBAL_CONFIG.defaultImg
    // cdn地址
    app.config.globalProperties['$src'] = (window as any).GLOBAL_CONFIG.cdnUrl

    // 事务总线
    app.config.globalProperties.$bus = mitt()

    // 全局过滤器
    app.config.globalProperties['$filters'] = {
      Money(value, fill = '--', min = 2, max = 2, pn = false) {
        if (typeof value !== 'number' && !value) return fill
        const res = Number(value).toLocaleString('zh', {
          maximumFractionDigits: max,
          minimumFractionDigits: min
        })
        return res && res != 'NaN'
          ? pn && value > 0 // 加减号
            ? '+' + res
            : '' + res
          : fill
      },
      Percent(value, fill = '--', min = 2, max = 2, pn = false, ratio = false) {
        if (typeof value !== 'number' && !value) return fill
        value = ratio ? value / 100 : value
        const res = Number(value).toLocaleString('zh', {
          maximumFractionDigits: max,
          minimumFractionDigits: min,
          style: 'percent'
        })
        return res && res != 'NaN'
          ? pn && value > 0 // 加减号
            ? '+' + res
            : '' + res
          : fill
      },
      Date(value, format = 'yyyy-MM-dd', fill = '--') {
        if (!value) return fill
        const date = FormatDate(value, format)
        return date
      },

      ImgUrl(val) {
        if (!val) return ''
        if (val.indexOf('http') > -1 || val.indexOf('https') > -1) {
          return val
        } else {
          return serviceImgSrc + val
        }
      }
    }

    // toast 轻提示
    Toast.allowMultiple()
    Toast.setDefaultOptions({ duration: 2000, forbidClick: true })
    app.config.globalProperties['$showLoading'] = (
      message?: string,
      position?: ToastPosition
    ) => {
      const toast = Toast.loading({
        duration: 0,
        message: message || 'loading...',
        position: position || 'middle'
      })
      return toast
    }
  }
}
