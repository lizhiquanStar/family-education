import { store } from '../store'
import { ApiConfig, HTTP_BODY_TYPES } from '@/core/http/http.dto'

export const API_CONFIG: ApiConfig = {
  apiPrefixUrl: process.env.NODE_ENV === 'production' ? '' : '',
  defaultBodyType: HTTP_BODY_TYPES.RAW_JSON,
  successCode: 0,
  showError: true, // 接口报错是否需要提示
  successMessage: '请求成功',
  errroDefaultMessage: '其他错误',
  errorHandles: [
    (httpStatus: number) => {
      if (httpStatus === 401) {
        store.commit('tokenExpired')
      }
    }
  ],
  beforeApiSend(options) {
    const token = store.state.token
    const tokenType = store.state.token_type || 'Bearer'
    if (token && !options.unauthorized) {
      if (options.headers) {
        options.headers.Authorization = `${tokenType} ${token}`
      } else {
        options.headers = {
          Authorization: `${tokenType} ${token}`
        }
      }
    }
    return options
  },
  hasNoErrorHandle(httpStatus) {
    if (httpStatus === 401) return true
    return false
  }
}

export interface HttpResponeType {
  success?: number | string
  message?: string
  data?: any
  timestamp?: number
}

export interface HttpErrorResponeType {
  success: number | string
  message: string
  data: any
  timestamp?: number
}
