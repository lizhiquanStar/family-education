import { ref, getCurrentInstance } from 'vue'
import { COURSES_STATUS_ENUM, COURSES_ORDER_STATUS } from '@/config/config'
import { PpsGlobalApi } from '@/config/global.api'
import { PpsMyCoursesApi } from './MyCourses.api'
export const tabs = [
  {
    label: '全部',
    value: 0
  },
  {
    label: '待服务',
    value: COURSES_STATUS_ENUM.toBeServe
  },
  {
    label: '服务中',
    value: COURSES_STATUS_ENUM.serving
  },
  {
    label: '已完成',
    value: COURSES_STATUS_ENUM.completed
  }
]

export function PpsMyCoursesConfig() {
  const { proxy } = getCurrentInstance() as any
  const active = ref(0)
  const params = ref({ state: 0 })
  const show = ref(false)
  const message = ref('')
  const kcId: any = ref('')

  const dailogShowClick = kid => {
    message.value = ''
    kcId.value = kid
    show.value = true
  }

  const onClickTab = val => {
    params.value.state = val.name
    proxy.$refs.pullDown.onRefresh()
  }

  const updateCourse = async (id, state) => {
    proxy.$toast.loading()
    const [res] = await PpsMyCoursesApi.startEndService({
      id,
      state: state == 1 ? 2 : 3
    })
    proxy.$toast.clear()
    if (!res) return
    proxy.$toast(state == 1 ? '服务已开始' : '服务已结束')
    proxy.$refs.pullDown.onRefresh()
  }

  const onSubmitTxt = async () => {
    const params = {
      content: message.value,
      kcId: kcId.value
    }
    proxy.$toast.loading()
    const [res] = await PpsMyCoursesApi.upDateContent(params)
    proxy.$toast.clear()
    if (!res) return
    proxy.$toast('提交成功')
    message.value = ''
    proxy.$refs.pullDown.onRefresh()
  }

  const goChat = async (id, name) => {
    const params = {
      anotherId: id
    }
    const [res] = await PpsGlobalApi.buildChat(params)
    if (!res) return
    proxy.$router.push({ name: 'Chat', query: { id: res, name } })
  }

  return {
    COURSES_ORDER_STATUS,
    active,
    params,
    show,
    message,
    onClickTab,
    dailogShowClick,
    updateCourse,
    onSubmitTxt,
    goChat
  }
}
