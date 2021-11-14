import { createI18n } from 'vue-i18n/index'
import { PpsGlobalApi } from '@/config/global.api'
import { getStorageItem, setStorageItem } from '@/core/utils/tools/storage'

const locale = getStorageItem('language') || 'zh_CN'
const messages = {
  zh_CN: {},
  zh_TW: {},
  zh_HK: {}
}
const i18n: any = createI18n({
  locale, // 设置地区
  messages, // 设置地区信息
  silentTranslationWarn: true
})

// 初始化页面国际化内容

i18n.$setLocale = async locale => {
  const [res] = await PpsGlobalApi.i18n({ locale })
  if (res.messages?.default) {
    i18n.global.setLocaleMessage(res.locale, {
      ...i18n.global.messages[res.locale],
      ...res.messages.default
    })
  }
  i18n.global.locale = res.locale
  setStorageItem('lang', res.locale)
}

export default i18n
