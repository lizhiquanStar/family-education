<template>
  <div class="login-form">
    <div class="form-box">
      <h2>
        {{ model == 'register' ? '用户注册' : '用户登录' }}
      </h2>
      <van-form
        ref="formRef"
        class="pps-form"
        :class="{ 'animated fadeInRight': hasSwitch }"
      >
        <van-cell-group inset>
          <base-phone v-model="form.mobileNo" ref="phone"></base-phone>
          <base-captcha
            v-model="form.captcha"
            ref="captcha"
            @sendCaptcha="sendCaptcha"
          ></base-captcha>
        </van-cell-group>
        <div class="form-btn">
          <van-checkbox v-model="checked" label-disabled shape="square">
            我已阅读
            <router-link class="pps-primary" :to="{ name: 'UserNotice' }">
              《用户须知》
            </router-link>
          </van-checkbox>
          <div class="role-select">
            <van-button
              :type="role == USER_TYPE.teacher ? 'success' : 'default'"
              size="small"
              block
              @click="() => (role = USER_TYPE.teacher)"
              >我是老师</van-button
            >
            <van-button
              :type="role == USER_TYPE.student ? 'success' : 'default'"
              size="small"
              block
              @click="() => (role = USER_TYPE.student)"
              >我是学生</van-button
            >
          </div>
          <van-button block type="primary" @click="submit">
            {{ $t(model == 'register' ? '注册' : '登录') }}
          </van-button>
        </div>
        <!-- <p
          class="pps-link pps-align-center"
          @click="showLogin(model == 'register' ? 'login' : 'register')"
        >
          {{
            $t(model == 'register' ? '已有账号？去登录' : '没有账号？去注册')
          }}
        </p> -->
      </van-form>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, getCurrentInstance, reactive } from 'vue'
import { Checkbox } from 'vant'
import { serviceImgSrc } from '@/config/global.api'
import { BasePhone, BaseCaptcha } from '@/components/base/form'
import { CAPTCHA_STATUS, USER_TYPE } from '@/config/config'
import { PpsLoginApi } from './Login.api'

export default {
  components: {
    BasePhone,
    BaseCaptcha,
    [Checkbox.name]: Checkbox
  },
  setup() {
    const { proxy } = getCurrentInstance() as any
    const hasSwitch = ref(false) // 切换动画
    const model = ref('register')
    const checked = ref(false)
    const role = ref(USER_TYPE.student)
    const openId = proxy.$store.state.openId
    let form = reactive({
      mobileNo: {
        areaCode: '0086',
        phone: ''
      },
      captcha: ''
    })

    // 切换动画
    const showLogin = val => {
      hasSwitch.value = true
      model.value = val
      form.captcha = ''
      proxy.$refs.formRef.resetValidation()
      proxy.$refs.captcha?.reset()
      setTimeout(() => {
        hasSwitch.value = false
      }, 2000)
    }

    // 获取验证码
    const sendCaptcha = async () => {
      const fail = proxy.$refs.phone?.validate(form.mobileNo.phone)
      if (fail) return
      const params = {
        phone: form.mobileNo.phone,
        type: CAPTCHA_STATUS.register
      }
      proxy.$refs.captcha.sendCaptcha(params)
    }

    // 登录
    const login = async () => {
      const params = {
        openId: openId
      }
      const res = await proxy.$store.dispatch('login', params, proxy)
      if (!res) return
      await proxy.$store.dispatch('getUser')
      proxy.$router.push({
        name: 'Home'
      })
    }

    // 注册
    const register = async () => {
      const params = {
        userPhone: form.mobileNo.phone,
        code: form.captcha,
        opid: openId,
        type: role.value
      }
      const toast = proxy.$showLoading(proxy.$t('注册中'))
      const [res] = await PpsLoginApi.register(params)
      toast.clear()
      if (!res) return
      login()
    }

    const submit = async () => {
      const fail = proxy.$refs.phone?.validate(form.mobileNo.phone)
      const captcha = proxy.$refs.formRef?.validate('captcha')
      if (fail || !captcha) return
      if (!checked.value) return proxy.$toast('请勾选已阅读须知')
      // model.value == 'login' && login()
      register()
    }

    // 校验

    return {
      serviceImgSrc,
      sendCaptcha,
      form,
      USER_TYPE,
      hasSwitch,
      showLogin,
      model,
      submit,
      checked,
      role
    }
  }
}
</script>
<style lang="scss" scoped>
.login,
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background-position: 50% 50%;
  background-size: cover;
  @include layout();
  @include layout-align(center, center);
}
.login-form {
  position: absolute;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  @include layout(column);
  @include layout-align(center, center);
  height: 100%;
}
.form-box {
  @include layout(column);
  @include layout-align(center, start);
  flex: 1;
  background: #fff;
  padding: 40px 33px;
  .van-form {
    width: 100%;
    margin: 36px 0;
  }
  h2 {
    font-size: 28px;
    font-weight: 500;
    width: 100%;
  }
  .van-cell-group--inset {
    border-radius: 0;
    margin: 0;
  }
  .pps-link {
    margin-top: 20px;
  }
  .role-select {
    margin-bottom: 20px;
    @include layout(row);
    @include layout-align(center);
    .van-button:first-child {
      margin-right: 20px;
    }
  }
  .form-btn {
    margin-top: 20px;
    .van-checkbox {
      margin-bottom: 20px;
      font-size: var(--van-font-size);
    }
  }
}
</style>
