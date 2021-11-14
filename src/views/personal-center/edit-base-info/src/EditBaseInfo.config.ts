import { ref, reactive, computed, onMounted } from 'vue'
import { Toast } from 'vant'
import { getAreaList, GetUser } from '@/core/utils/vue/get-user'
import { PpsGlobalApi } from '@/config/global.api'
import { PpsEditBaseInfoApi } from './EditBaseInfo.api'
import { store } from '@/store'
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
export const eduList = [
  {
    text: '小学',
    value: 1
  },
  {
    text: '初中',
    value: 2
  },
  {
    text: '大专',
    value: 3
  },
  {
    text: '本科及以上',
    value: 4
  }
]
export function PpsEditBaseInfoConfig() {
  const { USERINFO, proxy } = GetUser()
  const userInfo = reactive({
    userTx: '',
    // userNc: '',
    province: '',
    city: '',
    countyDistrict: '',
    street: '',
    areaCn: '',
    xaddress: '',
    sex: '',
    xl: '',
    zjnx: '',
    introduce: '',
    id: ''
  })
  const arrerInfo = reactive({
    province: '',
    city: '',
    countyDistrict: '',
    street: ''
  })
  const showInfo = reactive({
    birthdayShow: false,
    genderShow: false,
    areaShow: false,
    eduShow: false
  })
  const eduName = ref('')
  const genderName = ref('')
  const areaValue = ref('')
  const getUserInfo = async () => {
    for (const n in USERINFO) {
      userInfo[n] = USERINFO[n]
      if (n === 'xl') {
        eduName.value = filterLabel(eduList, USERINFO[n])
      }
      if (n === 'sex') genderName.value = filterLabel(gender, USERINFO[n])
    }
    areaValue.value = userInfo.countyDistrict
  }
  const filterLabel = (arr, value) => {
    let val = ''
    arr.forEach(item => {
      if (item.value === value) val = item.text
    })
    return val || value
  }
  const areaList = ref()
  const areaChange = async opt => {
    const sel = opt.selectedOptions
    console.log('opt', opt)
    if (!opt.value) return
    const area: any = await getAreaList({ parentCode: opt.value })
    if (sel.length === 3) area[0].isLeaf = true
    console.log('area', area)
    if (area[0].isLeaf) {
      console.log(9)
      Reflect.deleteProperty(area[0], 'children')
    }

    if (sel.length == 1) {
      areaList.value[sel[0].index].children = area
    } else if (sel.length == 2) {
      areaList.value[sel[0].index].children[sel[1].index].children = area
    } else if (sel.length == 3) {
      areaList.value[sel[0].index].children[sel[1].index].children[
        sel[2].index
      ].children = area
    }
  }
  const handleSubmit = async () => {
    const _info = {
      1: 'updateStudentInfo',
      2: 'updateTeacherInfo'
    }
    let parmas = {}
    console.log('userInfo', userInfo)
    if (USERINFO.type === 1) {
      parmas = {
        userTx: userInfo.userTx,
        // userNc: userInfo.userNc,
        province: userInfo.province,
        city: userInfo.city,
        countyDistrict: userInfo.countyDistrict,
        street: userInfo.street,
        xaddress: userInfo.xaddress,
        areaCn: userInfo.areaCn,
        sex: userInfo.sex,
        id: userInfo.id
      }
    } else {
      parmas = {
        userTx: userInfo.userTx,
        // userNc: userInfo.userNc,
        province: userInfo.province,
        city: userInfo.city,
        countyDistrict: userInfo.countyDistrict,
        street: userInfo.street,
        xaddress: userInfo.xaddress,
        xl: userInfo.xl,
        zjnx: userInfo.zjnx,
        areaCn: userInfo.areaCn,
        introduce: userInfo.introduce,
        id: userInfo.id
      }
    }
    const [res] = await PpsEditBaseInfoApi[_info[USERINFO.type]](parmas)
    console.log('upppress', res)
    if (res.code === 0) {
      Toast(res.msg)
      store.dispatch('getUser')
      proxy.$router.go(-1)
    }
  }
  const onConfirmArea = ({ selectedOptions }) => {
    userInfo.province = selectedOptions[0].value
    userInfo.city = selectedOptions[1].value
    userInfo.countyDistrict = selectedOptions[2].value
    userInfo.street = selectedOptions[3].value
    userInfo.areaCn = ''
    selectedOptions.forEach(item => {
      userInfo.areaCn += `/${item.text}`
    })
    showInfo.areaShow = false
  }
  const onConfirmEdu = value => {
    eduName.value = value.text
    userInfo.xl = value.value
    showInfo.eduShow = false
  }
  const onConfirmGender = value => {
    userInfo.sex = value.value
    genderName.value = value.text
    showInfo.genderShow = false
  }
  const onConfirmDate = value => {
    userInfo.province = value
    showInfo.birthdayShow = false
  }
  const region = computed(() => {
    return `${arrerInfo.province} ${arrerInfo.city} ${arrerInfo.countyDistrict} ${arrerInfo.street}`
  })
  const beforeRead = file => {
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      Toast('请上传 jpg 或 png 格式图片')
      return false
    }
    return true
  }
  const afterRead = async file => {
    console.log('file', file)
    const [img] = await PpsGlobalApi.uploadFile({ file: file.file })
    const [res] = await PpsEditBaseInfoApi.updateTx({ userTx: img })
    console.log('resuppp---', res)
    userInfo.userTx = img
  }
  onMounted(async () => {
    getUserInfo()
    const area: any = await getAreaList({ parentCode: 0 })
    areaList.value = area
  })
  return {
    areaValue,
    USERINFO,
    userInfo,
    beforeRead,
    afterRead,
    getUserInfo,
    areaChange,
    arrerInfo,
    eduName,
    genderName,
    areaList,
    region,
    showInfo,
    onConfirmArea,
    onConfirmEdu,
    onConfirmGender,
    onConfirmDate,
    handleSubmit
  }
}
