import { ref, onMounted } from 'vue'
import { GetUser } from '@/core/utils/vue/get-user'
import { PpsChatApi } from './Chat.api'
export function PpsChatConfig() {
  const message = ref('')
  const refreshing = ref(false)
  const list = ref([])
  const loosingText = ref('获取更多历史信息...')
  const { USERINFO, proxy } = GetUser()
  const params = ref({
    pageNum: 1,
    pageSize: 10,
    communicateId: proxy.$route.query.id
  })

  const init = async () => {
    if (loosingText.value == '没有更多~') {
      return (refreshing.value = false)
    }
    const [res] = await PpsChatApi.list(params.value)
    if (!res) return
    refreshing.value = false
    list.value = list.value.concat(res.data.rows)
    if (list.value.length >= res.data.total) {
      loosingText.value = '没有更多~'
    } else {
      params.value.pageNum += 1
    }
  }

  const onRefresh = () => {
    init()
  }

  onMounted(() => {
    onRefresh()
  })

  return {
    list,
    message,
    refreshing,
    loosingText,
    USERINFO,
    onRefresh
  }
}
