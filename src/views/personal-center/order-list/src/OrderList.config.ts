import { ref, getCurrentInstance } from 'vue'
import { USER_STATUS_ENUM } from '@/config/config'

export const tabs = [
  {
    label: '全部',
    value: 0
  },
  {
    label: '待支付',
    value: USER_STATUS_ENUM.waitingPay
  },
  {
    label: '已支付',
    value: USER_STATUS_ENUM.paid
  },
  {
    label: '已取消',
    value: USER_STATUS_ENUM.cancelled
  },
  {
    label: '审核中',
    value: USER_STATUS_ENUM.underReview
  },
  {
    label: '退款中',
    value: USER_STATUS_ENUM.refunding
  },
  {
    label: '服务中',
    value: USER_STATUS_ENUM.serving
  },
  {
    label: '已完成',
    value: USER_STATUS_ENUM.completed
  }
]
export function PpsOrderListConfig() {
  const { proxy } = getCurrentInstance() as any
  const active = ref(0)
  const params = ref({ state: 0 })

  const onClickTab = val => {
    params.value.state = val.name
    proxy.$refs.pullDown.onRefresh()
  }
  return {
    active,
    params,
    onClickTab
  }
}
