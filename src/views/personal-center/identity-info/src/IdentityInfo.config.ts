import { reactive, onMounted } from 'vue'
import { PpsIdentityInfoApi } from './IdentityInfo.api'

export const gender = [
  {
    text: '男',
    value: 1
  },
  {
    text: '女',
    value: 2
  }
]
export const state = [
  {
    text: '审核中',
    value: 1
  },
  {
    text: '审核未通过',
    value: 2
  },
  {
    text: '审核通过',
    value: 3
  }
]

export function PpsIdentityInfoConfig() {
  const cardInfo = reactive({
    birthday: '',
    xm: '',
    sex: '',
    card: '',
    cardZ: '',
    cardF: '',
    state: ''
  })
  const getDeatil = async () => {
    const [res] = await PpsIdentityInfoApi.cardDetails()
    if (Object.keys(res).length > 0 && res.id) {
      for (const n in cardInfo) {
        cardInfo[n] = res[n]
      }
    }
  }
  const filterLabel = (arr, value) => {
    let val = ''
    arr.forEach(item => {
      if (item.value === value) val = item.text
    })
    return val
  }
  onMounted(() => {
    getDeatil()
  })
  return {
    cardInfo,
    state,
    gender,
    filterLabel,
    getDeatil
  }
}
