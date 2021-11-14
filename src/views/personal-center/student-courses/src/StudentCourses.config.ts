import { ref, getCurrentInstance } from 'vue'
import { COURSES_STATUS_ENUM } from '@/config/config'
import { PpsGlobalApi } from '@/config/global.api'
import { PpsStudentCoursesApi } from './StudentCourses.api'

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
export function PpsStudentCoursesConfig() {
  const { proxy } = getCurrentInstance() as any
  const params = ref({ orderId: proxy.$route.query.id, state: 0 })
  const active = ref(0)

  const onClickTab = val => {
    params.value.state = val.name
    proxy.$refs.pullDown.onRefresh()
  }

  const confirm = async id => {
    proxy.$toast.loading()
    const [res] = await PpsStudentCoursesApi.confirmOrder({ id })
    proxy.$toast.clear()
    if (!res) return
    proxy.$toast('确认成功！')
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
    params,
    active,
    confirm,
    goChat,
    onClickTab
  }
}
