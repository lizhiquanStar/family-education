/* eslint-disable no-undef */
<template>
  <div class="my-deposit">
    <van-row class="deposit-head" type="flex">
      <van-col span="22"
        >￥<span>{{ deposit.yj }}</span></van-col
      >
      <van-col span="22">押金</van-col>
    </van-row>
    <van-row class="deposit-result" type="flex">
      <van-col span="22" v-if="deposit.state == 1" class="pps-danger"
        >您暂未缴纳押金</van-col
      >
      <van-col span="22" v-if="deposit.state == 2" class="pps-success"
        >已缴纳</van-col
      >
      <van-col span="22" v-if="deposit.state == 3" class="pps-info"
        >已退还</van-col
      >
    </van-row>
    <div class="paySure">
      <van-button
        block
        size="md"
        type="primary"
        v-if="deposit.state == 1"
        @click="pay"
        >去支付</van-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, ref } from 'vue'
import { PpsMyDepositApi } from './MyDeposit.api'
import { WeiXinPay } from '@/core/utils/tools/wechat-pay'
export default {
  components: {},
  setup() {
    const { proxy } = getCurrentInstance() as any
    const deposit: any = ref({})

    const getDepoit = async () => {
      const [res] = await PpsMyDepositApi.list()
      if (!res) return
      deposit.value = res
    }

    const pay = async () => {
      const params = {
        openId: proxy.$store.state.openId
      }
      proxy.$toast.loading('调取微信支付...')
      const [res] = await PpsMyDepositApi.pay(params)
      if (!res) return proxy.$toast.clear()
      WeiXinPay(res, result => {
        if (result == 'ok') {
          proxy.$toast.success('支付成功')
          getDepoit()
        }
      })
    }

    onMounted(() => {
      getDepoit()
    })

    return {
      deposit,
      pay
    }
  }
}
</script>
<style lang="scss" scoped>
.deposit-head {
  background: var(--van-blue);
  color: #fff;
  padding: 30px 0 30px 15px;
  font-size: 22px;
  font-weight: bold;
}
.deposit-result {
  font-size: 16px;
  margin: 0 auto;
  padding: 30px 0 30px 15px;
}
.paySure {
  position: absolute;
  bottom: 10px;
  padding: 10px 16px;
  width: 100%;
}
</style>
