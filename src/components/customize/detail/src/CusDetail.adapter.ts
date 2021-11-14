import { NoticeAdapter } from '@/components/base/notice/src/BaseNotice.adapter'
import { TagAdapter } from '@/components/base/tag/src/BaseTag.adapter'
import { ButtonAdapter } from '@/components/base/button/src/BaseButton.adapter'
import { FormDetailAdapter } from '@/components/base/form-detail/src/BaseFormDetail.adapter'
export interface Status {
  className?: string
  text?: string
}
export interface DetailAdapter {
  title: string
  sub?: string
  showNotice?: false | true
  noticeConfig?: NoticeAdapter
  showTag?: false | true
  tagConfig?: TagAdapter[]
  showBtn?: false | true
  btnConfig?: ButtonAdapter[]
  showForm?: boolean
  formConfig?: FormDetailAdapter
  showTip?: boolean
  statusConfig?: Status
}
