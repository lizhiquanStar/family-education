<template>
  <van-notice-bar
    wrapable
    :scrollable="false"
    text="友情提示：请提前与老师沟通好服务时间"
  />
  <div class="appointed-time">
    <van-field
      v-model="startTime"
      is-link
      readonly
      name="datetimePicker"
      label="开始时间"
      placeholder="选择开始时间"
      @click="showStart = true"
    />
    <van-field
      v-model="endTime"
      is-link
      readonly
      name="datetimePicker"
      label="结束时间"
      placeholder="选择结束时间"
      @click="showEnd = true"
    />
    <van-popup v-model:show="showStart" position="bottom">
      <van-datetime-picker
        type="datetime"
        title="选择开始时间"
        :min-date="new Date(today)"
        :max-date="new Date(endTime || endDay)"
        @confirm="onStartConfirm"
        @cancel="showStart = false"
      />
    </van-popup>
    <van-popup v-model:show="showEnd" position="bottom">
      <van-datetime-picker
        type="datetime"
        title="选择结束时间"
        :min-date="new Date(startTime || today)"
        @confirm="onEndConfirm"
        @cancel="showEnd = false"
      />
    </van-popup>
  </div>
  <van-submit-bar>
    <template #button>
      <van-button type="primary" block @click="onSubmit">提交</van-button>
    </template>
  </van-submit-bar>
  <van-dialog v-model:show="show" title="标题" show-cancel-button>
    <img src="https://img.yzcdn.cn/vant/apple-3.jpg" />
  </van-dialog>
</template>

<script lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { NoticeBar, DatetimePicker, SubmitBar, Dialog } from 'vant'
import { PpsAppointedTimeApi } from './AppointedTime.api'
export default {
  components: {
    [NoticeBar.name]: NoticeBar,
    [DatetimePicker.name]: DatetimePicker,
    [SubmitBar.name]: SubmitBar
  },
  setup() {
    const { proxy } = getCurrentInstance() as any
    const today = proxy.$filters.Date(new Date(), 'yyyy-MM-dd hh:mm', '')
    const endDay = new Date(new Date().getFullYear() + 10, 11, 31)
    const startTime = ref('')
    const endTime = ref('')
    const showStart = ref(false)
    const showEnd = ref(false)

    const onStartConfirm = value => {
      startTime.value = proxy.$filters.Date(value, 'yyyy-MM-dd hh:mm', '')
      showStart.value = false
    }
    const onEndConfirm = value => {
      endTime.value = proxy.$filters.Date(value, 'yyyy-MM-dd hh:mm', '')
      showEnd.value = false
    }

    const onSubmit = async () => {
      if (!startTime.value || !endTime.value) return proxy.$toast('请选择时间')
      Dialog.confirm({
        title: '再次确认',
        message: `开始时间:${startTime.value}\n\n结束时间:${endTime.value}`
      }).then(async () => {
        const params = {
          id: proxy.$route.query.id,
          startTime: startTime.value,
          endTime: endTime.value
        }
        proxy.$toast.loading()
        const [res] = await PpsAppointedTimeApi.submit(params)
        proxy.$toast.clear()
        if (!res) return
        proxy.$toast('约定时间成功，等待确认')
        proxy.$router.back()
      })
    }

    return {
      today,
      endDay,
      startTime,
      endTime,
      showStart,
      showEnd,
      onStartConfirm,
      onEndConfirm,
      onSubmit
    }
  }
}
</script>
<style lang="scss" scoped>
.appointed-time {
  padding: 16px;
  .info {
    color: var(--van-gray-6);
  }
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-width: 1px;
  }
  .title {
    font-size: var(--van-font-size-md);
    padding-bottom: 10px;
    margin-top: 20px;
  }
}
</style>
