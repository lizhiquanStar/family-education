<template>
  <base-pull-down
    :api="PpsChatListApi.list"
    :params="params"
    class="chat-list"
    ref="pullDown"
  >
    <template #default="slotProps">
      <template v-for="(item, index) in slotProps.list" :key="index">
        <van-swipe-cell>
          <base-cell
            :imgUrl="item.dfTx || $defaultAvatar"
            :title="item.nc"
            :sub="true"
            :tag="item.zhLtSj"
            :badge="item.wdnum"
            @click="
              () =>
                $router.push({
                  name: 'Chat',
                  query: { id: item.id, name: item.nc }
                })
            "
          >
            <template #sub>
              <div v-html="item.msg" class="chat-info"></div>
            </template>
          </base-cell>
          <template #right>
            <van-button
              square
              type="danger"
              text="删除"
              @click="del(item.id)"
            />
          </template>
        </van-swipe-cell>
      </template>
    </template>
  </base-pull-down>
</template>

<script lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { PpsChatListApi } from './ChatList.api'
export default {
  setup() {
    const params = ref({})
    const { proxy } = getCurrentInstance() as any

    const del = async id => {
      proxy.$toast.loading()
      const [res] = await PpsChatListApi.delGt({ id })
      proxy.$toast.clear()
      if (!res) return
      proxy.$toast.success('删除成功')
      proxy.$refs.pullDown.onRefresh()
    }

    return {
      params,
      del,
      PpsChatListApi
    }
  }
}
</script>
<style lang="scss" scoped>
.chat-list {
  height: 100%;
  background: var(--van-gray-1);
  .base-cell {
    padding: 24px 16px;
    background: #fff;
    &:not(:last-child) {
      border-bottom: 1px solid var(--van-gray-1);
    }
  }
  .van-swipe-cell {
    .van-button {
      height: 100%;
    }
  }
  .chat-info {
    :deep p {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  :deep {
    .cell-badge {
      padding: 3px;
      background: var(--van-red);
      border-radius: 50%;
      top: 1px;
      right: 2px;
    }
    .cell-left-info {
      flex: 1;
    }
    .base-cell-left {
      flex: 1;
      margin-right: 0;
    }
    .base-cell-left .title {
      display: flex;
      span {
        border: none !important;
        &.info-tag {
          color: var(--van-gray-9);
        }
      }
      span:first-child {
        flex: 1;
      }
    }
    .pps-sub {
      width: 250px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .base-cell-right {
      flex: 0;
    }
  }
}
</style>
