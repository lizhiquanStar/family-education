import { Dialog, Toast } from 'vant'
import { ActionContext } from 'vuex'
import router from '@/router'
import { PpsGlobalApi } from '@/config/global.api'
import { PpsLoginApi } from '@/views/certification/login/src/Login.api'
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem
} from '@/core/utils/tools/storage'
interface State {
  [key: string]: any
}
const user = getStorageItem('user') || {}
const lang = getStorageItem('lang') || 'zh_CN'
const color = getStorageItem('color') || '#0065FF'
const token = getStorageItem('token') || window.GLOBAL_CONFIG.accessToken
const openId = getStorageItem('openId')
const User = {
  state: {
    lang,
    color,
    token,
    user,
    openId,
    isTokenExpiredHandling: false // 是否正在处理401
  },
  mutations: {
    setSkin: (state: any, color: any) => {
      setStorageItem('color', color)
      state.color = color
    },
    setToken: (state: any, token: any) => {
      setStorageItem('token', token)
      state.token = token
    },
    setOpenId: (state: any, opid: any) => {
      setStorageItem('openId', opid)
      state.openId = opid
    },
    setUserInfo: (state: any, userInfo: any) => {
      setStorageItem('user', userInfo)
      state.user = userInfo
    },
    clearUser: (state: any) => {
      removeStorageItem('user')
      removeStorageItem('token')
      removeStorageItem('openId')
      state.user = {}
      state.token = ''
      state.openId = ''
    },
    tokenExpired: (state: any) => {
      if (state.isTokenExpiredHandling) return
      state.isTokenExpiredHandling = true
      Dialog.alert({
        title: '登录过期',
        message: '登录已过期，请重新登录。',
        confirmButtonText: '重新登录'
      }).then(() => {
        removeStorageItem('user')
        removeStorageItem('token')
        state.user = {}
        state.token = ''
        state.isTokenExpiredHandling = false
        router.push({
          name: '/'
        })
      })
    }
  },
  actions: {
    async login(context: ActionContext<State, any>, data: any) {
      const toast = Toast.loading({
        message: 'loading...',
        forbidClick: true
      })
      const [res] = await PpsLoginApi.login(data)
      toast.clear()
      if (!res) return false
      context.commit('setToken', res)
      return res
    },
    async getUser(context: ActionContext<State, any>) {
      const [res] = await PpsLoginApi.getUserInfo()
      if (res) {
        context.commit('setUserInfo', res)
      }
    },
    async getOpenId(context: ActionContext<State, any>, params) {
      const [res] = await PpsGlobalApi.getOpenId(params)
      if (res) {
        context.commit('setOpenId', res)
        context.dispatch('checkIsRegister')
      }
    },
    async checkIsRegister(context: ActionContext<State, any>) {
      const params = {
        openId: context.state.openId
      }
      const [res] = await PpsGlobalApi.checkOpenId(params)
      if (res == 0) {
        router.push({
          name: 'Login'
        })
      } else {
        const result = await context.dispatch('login', params)
        if (!result) return
        await context.dispatch('getUser')
        router.push({
          name: 'Home'
        })
      }
    }
  }
}

export default User
