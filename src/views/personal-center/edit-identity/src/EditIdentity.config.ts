import { reactive, ref, onMounted, getCurrentInstance } from 'vue'
import { ImagePreview, Toast } from 'vant'
import { PpsEditIdentityApi } from './EditIdentity.api'
import { FormatDate } from '@/core/utils/tools/format-date'
import { PpsGlobalApi } from '@/config/global.api'
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
export function PpsEditIdentityConfig() {
  const { proxy } = getCurrentInstance() as any

  const cardInfo = reactive({
    xm: '',
    sex: '',
    birthday: '',
    card: '',
    cardZ: '',
    cardF: '',
    id: ''
  })
  const currentDate = ref(new Date())
  const sexName = ref('')
  const showPicker = ref(false)
  const birthdayShow = ref(false)
  const handlePreview = () => {
    ImagePreview(['https://img.yzcdn.cn/vant/cat.jpeg'])
  }
  const onConfirm = ({ value, text }) => {
    cardInfo.sex = value
    sexName.value = text
    showPicker.value = false
  }
  const onConfirmDate = value => {
    console.log('birthday', value)
    cardInfo.birthday = FormatDate(value)
    birthdayShow.value = false
  }
  const getDeatil = async () => {
    const [res] = await PpsEditIdentityApi.cardDetails()
    console.log('res', res)
    if (Object.keys(res).length > 0 && res.id) {
      let _sex = ''
      for (const n in cardInfo) {
        cardInfo[n] = res[n]
        if (n === 'sex') _sex = res[n]
      }
      sexName.value = filterLabel(gender, _sex)
    }
  }
  const filterLabel = (arr, value) => {
    let val = ''
    arr.forEach(item => {
      if (item.value === value) val = item.text
    })
    return val
  }
  const beforeRead = file => {
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      Toast('请上传 jpg 或 png 格式图片')
      return false
    }
    return true
  }
  const afterReadZ = async file => {
    const [res] = await PpsGlobalApi.uploadFile({ file: file.file })
    cardInfo.cardZ = res
  }
  const afterReadF = async file => {
    const [res] = await PpsGlobalApi.uploadFile({ file: file.file })
    cardInfo.cardF = res
  }
  const handleSubmit = async () => {
    const [res] = await PpsEditIdentityApi.updateCard(cardInfo)
    console.log('res', res)
    if (res.code === 0) {
      Toast(res.msg)
      proxy.$router.go(-1)
    }
  }
  onMounted(() => {
    getDeatil()
  })
  return {
    cardInfo,
    birthdayShow,
    showPicker,
    gender,
    sexName,
    minDate: new Date(1900, 0, 1),
    maxDate: new Date(),
    currentDate,
    beforeRead,
    onConfirmDate,
    afterReadZ,
    afterReadF,
    getDeatil,
    filterLabel,
    handlePreview,
    onConfirm,
    handleSubmit
  }
}
