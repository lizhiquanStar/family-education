<template>
  <div class="my-settlement">
    <base-pull-down :api="PpsMySettlementApi.list" ref="pullDown">
      <template #default="slotProps">
        <div
          v-for="(item, index) in slotProps.list"
          :key="index"
          class="list-order"
        >
          <van-row justify="space-between" class="head">
            <van-col span="6">金额</van-col>
            <van-col span="6">平台佣金</van-col>
            <van-col span="6">实际结算佣金</van-col>
            <van-col span="6">结算时间</van-col>
          </van-row>
          <div
            v-for="(sub, index) in item.rows"
            :key="sub.id"
            :class="{ 'list-sub': index != item.rows.length }"
          >
            <van-row justify="space-between">
              <van-col span="6">{{ sub.zje }}</van-col>
              <van-col span="6">{{ sub.ccJe }}</van-col>
              <van-col span="6">{{ sub.sjJs }}</van-col>
              <van-col span="6">{{ sub.createTime }}</van-col>
            </van-row>
          </div>
        </div>
      </template>
    </base-pull-down>
  </div>
</template>

<script lang="ts">
// import { PpsMySettlementConfig } from './MySettlement.config'
import { PpsMySettlementApi } from './MySettlement.api'
export default {
  components: {},
  emits: [],
  setup() {
    return {
      PpsMySettlementApi
      // ...PpsMySettlementConfig()
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
    font-size: 14px;
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
