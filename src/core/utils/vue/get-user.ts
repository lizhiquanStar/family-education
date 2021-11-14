import { getCurrentInstance } from 'vue'
import { PpsGlobalApi } from '@/config/global.api'
export function GetUser() {
  const { proxy } = getCurrentInstance() as any
  const USERINFO = proxy.$store.state.user

  return {
    proxy,
    USERINFO
  }
}

export async function getKM() {
  const [res] = await PpsGlobalApi.getZdlist()
  return res || {}
}

export async function getAreaList(params) {
  const [res] = await PpsGlobalApi.getAreaList(params)
  const a = res || []
  const area = a.map((item, index) => {
    const l = {
      text: item.name,
      index,
      value: item.adcode
    }
    if (!item.isLeaf) {
      l['children'] = []
    }
    return l
  })
  return area || []
}
