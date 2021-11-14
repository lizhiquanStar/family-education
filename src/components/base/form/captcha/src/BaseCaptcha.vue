<template>
  <div class="base-captcha">
    <van-field
      :border="false"
      v-model="value"
      autocomplete="off"
      type="digit"
      name="captcha"
      :maxlength="maxlength"
      label=""
      :placeholder="$t('验证码')"
      :rules="[{ required: true, message: $t('请输入验证码') }]"
    >
      <template #button>
        <van-count-down
          ref="captchaRef"
          :time="60000"
          :auto-start="false"
          format="ss"
          @finish="showCaptcha = false"
        >
          <template #default="timeData">
            <p
              class="pps-link"
              @click="() => $emit('sendCaptcha')"
              v-if="!showCaptcha"
            >
              {{ $t('发送验证码') }}
            </p>
            <p class="pps-link no-cursor" v-else>
              {{ timeData.seconds }}s {{ $t('后重新发送') }}
            </p>
          </template>
        </van-count-down>
      </template>
    </van-field>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance, onMounted, watch } from 'vue'
import { Field, CountDown } from 'vant'
import { PpsGlobalApi } from '@/config/global.api'
export default defineComponent({
  name: 'BaseCaptcha',
  components: {
    [Field.name]: Field,
    [CountDown.name]: CountDown
  },
  props: {
    modelValue: {
      type: [Number, String],
      default: ''
    },
    maxlength: {
      type: Number,
      default: 4
    }
  },
  setup(props, { emit }) {
    const showCaptcha = ref(false)
    const { proxy } = getCurrentInstance() as any
    const value = ref(props.modelValue)
    watch(value, () => {
      emit('update:modelValue', value)
    })
    // 获取验证码
    const sendCaptcha = async params => {
      const toast = proxy.$showLoading(proxy.$t('发送中...'))
      const [res] = await PpsGlobalApi.getCaptcha(params)
      toast.clear()
      if (!res) return
      proxy.$toast({
        message: proxy.$t('验证码发送成功'),
        position: 'top'
      })
      showCaptcha.value = true
      proxy.$refs.captchaRef?.start()
    }
    // 倒计时重制
    const reset = () => {
      proxy.$refs.captchaRef.reset()
    }
    onMounted(async () => {
      // await proxy.$store.dispatch('getAreaCode')
    })
    return {
      showCaptcha,
      sendCaptcha,
      reset,
      value
    }
  }
})
</script>

<style lang="scss"></style>
