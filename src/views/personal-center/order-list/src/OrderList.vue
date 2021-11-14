<template>
  <div class="order-list pps-page">
    <van-sticky :offset-top="0">
      <van-tabs v-model:active="active" @click-tab="onClickTab">
        <van-tab
          :name="item.value"
          :title="item.label"
          v-for="item in tabs"
          :key="item.value"
        ></van-tab>
      </van-tabs>
    </van-sticky>
    <base-pull-down :api="PpsOrderListApi.list" :params="params" ref="pullDown">
      <template #default="slotProps">
        <div
          v-for="(item, index) in slotProps.list"
          :key="index"
          class="list-order"
        >
          <van-cell
            :title="item.name"
            :label="item.createTime"
            :value="USER_ORDER_STATUS[item.state]?.label"
            :value-class="`pps-${USER_ORDER_STATUS[item.state]?.color}`"
          >
          </van-cell>
          <van-row justify="space-between" class="head">
            <van-col span="6">阶段</van-col>
            <van-col span="6">科目</van-col>
            <van-col span="6">单价</van-col>
            <van-col span="6">数量</van-col>
          </van-row>
          <div
            v-for="(sub, index) in item.kcOrderItemList"
            :key="sub.id"
            :class="{ 'list-sub': index != item.kcOrderItemList.length }"
          >
            <van-row justify="space-between">
              <van-col span="6">{{ sub.jd }}</van-col>
              <van-col span="6">{{ sub.km }}</van-col>
              <van-col span="6">¥{{ sub.je }}</van-col>
              <van-col span="6">{{ sub.sl }}</van-col>
            </van-row>
          </div>
          <!-- // 订单状态(1 待支付 2已支付 3取消 4 审核中 5 退款中 6 服务中 7  已完成) -->
          <!-- （待支付，已支付，服务中，可取消订单）(除待支付和取消订单无查看课程） -->
          <div
            class="handle"
            v-if="item.state != 4 || item.state != 5 || item.state != 7"
          >
            <van-button
              type="default"
              size="small"
              @click="cancelOrder(item.id)"
              v-if="item.state == 1 || item.state == 2 || item.state == 6"
            >
              取消订单
            </van-button>
            <van-button
              type="primary"
              @click="lookCourses(item.id)"
              size="small"
              v-if="item.state != 1 && item.state != 3"
            >
              查看课程
            </van-button>
          </div>
        </div>
      </template>
    </base-pull-down>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue'
import { PpsOrderListConfig, tabs } from './OrderList.config'
import { USER_ORDER_STATUS } from '@/config/config'
import { PpsOrderListApi } from './OrderList.api'
export default {
  components: {},
  setup() {
    const { proxy } = getCurrentInstance() as any
    const cancelOrder = async id => {
      const toast = proxy.$showLoading()
      const [res] = await PpsOrderListApi.cancelOrder({ id })
      toast.clear()
      if (!res) return
      proxy.$toast('取消成功')
      proxy.$refs.pullDown.onRefresh()
    }
    const lookCourses = async id => {
      proxy.$router.push({ name: 'StudentCourses', query: { id } })
    }

    return {
      tabs,
      USER_ORDER_STATUS,
      PpsOrderListApi,
      cancelOrder,
      lookCourses,
      ...PpsOrderListConfig()
    }
  }
}
</script>
<style lang="scss" scoped>
.list-order {
  background: #fff;
  border-bottom: 8px solid var(--van-gray-1);
  .handle {
    padding: 16px;
    text-align: right;
    .van-button:not(:last-child) {
      margin-right: 20px;
    }
  }
  .van-row {
    padding: 6px 0;
  }
  .van-row.head {
    padding: 10px 0;
    background: var(--van-gray-1);
  }
  .van-col {
    text-align: center;
  }
  .list-sub {
    border-bottom: 1px solid var(--van-gray-1);
  }
}
.van-cell::after {
  right: 0;
  left: 0;
}

:deep {
  .van-cell__label {
    margin-top: 0;
  }
  .van-sticky {
    margin-bottom: 8px;
  }
}
</style>
