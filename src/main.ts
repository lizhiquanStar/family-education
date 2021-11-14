import { createApp } from 'vue'
import axios from 'axios'
import vantNext from '@/core/utils/plugins/vant-next'
import '@vant/touch-emulator'
import globalVar from '@/core/utils/vue/global-var'
import i18n from '@/core/utils/i18n'
import router from '@/router'
import { store } from '@/store'
import App from './App.vue'
import { getWexinCode } from '@/core/utils/tools/enviroment'

import {
  BaseCell,
  BaseLabel,
  BaseEmpty,
  BaseButton,
  BaseProgress,
  BaseFormDetail,
  BaseNavBar,
  BaseLoadMore,
  BasePullDown
} from '@/components'
import '@/core/styles/var.css'
import '@/core/styles/index.scss'

axios.defaults.baseURL = window.GLOBAL_CONFIG?.gatewayUrl
const app = createApp(App)
app.use(vantNext)
app.use(i18n).use(globalVar).use(store).use(router)

const globalComponents = [
  BaseCell,
  BaseLabel,
  BaseEmpty,
  BaseFormDetail,
  BaseProgress,
  BaseNavBar,
  BaseLoadMore,
  BaseButton,
  BasePullDown
]
globalComponents.forEach((component: any) => {
  app.component(component.name, component)
})
app.config.globalProperties['$t'] = key => {
  if (store.state.lang == 'zh_CN') return key
  i18n.global.t.bind(i18n)
}
// 国际化初始化
!store.state.lang &&
  i18n.$setLocale(
    (window as any).$runtime?.environment?.config?.language || 'zh_CN'
  )
if (!store.state.token && !store.state.openId) {
  getWexinCode()
}
app.mount('#app')
