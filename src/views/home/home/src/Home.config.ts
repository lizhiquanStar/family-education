import { reactive, ref, onMounted } from 'vue'
import { GetUser, getKM, getAreaList } from '@/core/utils/vue/get-user'
// import { PpsHomeApi } from './Home.api'
const experienceOptions = [
  { text: '执教经验', value: '' },
  { text: '1年经验', value: 1 },
  { text: '2年经验', value: 2 },
  { text: '3年经验', value: 3 },
  { text: '4年经验', value: 4 },
  { text: '5年经验', value: 5 }
]

export function PpsHomeConfig() {
  const { USERINFO, proxy } = GetUser()
  const show = ref(false)
  const areaInfo = ref(USERINFO.areaCn || '浙江省/杭州市')
  const areaValue = ref(
    USERINFO.street ||
      USERINFO.countyDistrict ||
      USERINFO.city ||
      USERINFO.province
  )
  const params = ref({
    province: USERINFO.province || '330000',
    city: USERINFO.city || '330100000000',
    countyDistrict: USERINFO.countyDistrict || '',
    street: USERINFO.street || '',
    jdId: '',
    kmId: '',
    zjnx: ''
  })
  const filterOptions = reactive([
    {
      key: 'jdId',
      options: [{ text: '所有阶段', value: '' }]
    },
    {
      key: 'kmId',
      options: [{ text: '所有科目', value: '' }]
    },
    {
      key: 'zjnx',
      hidden: USERINFO.type == 2,
      options: experienceOptions
    }
  ])
  const areaList = ref()
  const areaChange = async opt => {
    const sel = opt.selectedOptions
    const area: any = await getAreaList({ parentCode: opt.value })
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

  // 筛选
  const handleChange = () => {
    proxy.$refs.pullDown.onRefresh()
  }

  // 详情
  const goDetail = item => {
    proxy.$router.push({ name: 'UserDetail', query: { id: item.id } })
  }

  // 位置选择
  const onFinish = ({ selectedOptions }) => {
    show.value = false
    const text = selectedOptions.map(option => option.text)
    const value = selectedOptions.map(option => option.value)
    areaInfo.value = text.join('/')
    params.value.province = value[0]
    params.value.city = value[1]
    params.value.countyDistrict = value[2]
    params.value.street = value[3]
    proxy.$refs.pullDown.onRefresh()
  }

  onMounted(async () => {
    const area: any = await getAreaList({ parentCode: 0 })
    areaList.value = area
    const res: any = await getKM()
    const jdList: any = []
    const kmList: any = []
    res?.jdList.map(item => {
      jdList.push({ text: item.name, value: item.id })
    })
    res?.kmList.map(item => {
      kmList.push({ text: item.name, value: item.id })
    })
    filterOptions[0].options = filterOptions[0].options.concat(jdList)
    filterOptions[1].options = filterOptions[1].options.concat(kmList)
  })

  return {
    show,
    areaList,
    areaValue,
    areaInfo,
    params,
    USERINFO,
    filterOptions,
    handleChange,
    onFinish,
    areaChange,
    goDetail
  }
}
