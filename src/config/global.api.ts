import { Send, HTTP_METHODS, HTTP_BODY_TYPES } from '@/core/http'
class Api {
  checkOpenId(params?: any) {
    return Send({
      mock: { data: 1 },
      url: '/rest/checkOpenId',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }

  getOpenId(params?: any) {
    return Send({
      mock: 'oTq1m0oXqdI4F4MGumEnbgnIbcm4', // 用户的open ID
      // mock: 'oTq1m0qMj6pxgs33Dzm_hbOTur_c', // 老师的open ID
      // mock: 'oTq1m0qMj6pxgs33Dzm_hbOTur_c', // 真实openid
      url: '/rest/getOpenId',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }

  getCaptcha(params?: any) {
    return Send({
      url: '/rest/sendsms',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }

  /**
   * 通用上传请求
   * @param params{MultipartFile file}
   * @returns
   */
  uploadFile(params?: any) {
    return Send({
      url: '/rest/common/uploadFile',
      params,
      method: HTTP_METHODS.POST,
      bodyType: HTTP_BODY_TYPES.FORM_DATA,
      errorText: '获取数据失败'
    })
  }

  /**
   * 获取区域代码   上级code   0为省级
   * @param params{parentCode:''}
   * @returns
   */
  getAreaList(params?: any) {
    return Send({
      url: '/rest/share/getAreaList',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }

  /**
   * 获取阶段科目接口 父级Id((2阶段3科目))
   * @param params{parentId:''}
   * @returns
   */
  getZdlist(params?: any) {
    return Send({
      url: '/rest/share/getZdlist',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    })
  }

  // 创建聊天主体
  buildChat(params?: any) {
    return Send({
      url: '/rest/share/gtAdd',
      params,
      method: HTTP_METHODS.POST,
      errorText: ''
    })
  }

  // 国际化
  i18n(params?: any) {
    return Send({
      mock: {},
      url: '/system/api/i18n',
      params,
      method: HTTP_METHODS.GET,
      errorText: ''
    })
  }
}

export const PpsGlobalApi = new Api()

export const serviceImgSrc =
  window.GLOBAL_CONFIG.gatewayUrl + '/file/api/storage/preview?key='
