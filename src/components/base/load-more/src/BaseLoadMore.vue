<template>
  <div class="base-load-more pps-font-sm pps-weight-light">
    <span v-if="!showLoadMore"></span>
    <span
      class="more"
      @click="handleMore"
      v-else-if="!loading && totalPage && totalPage !== currentPage"
    >
      {{ $t('查看更多') }}
      <i class="iconfont a-icon-loadmore"></i>
    </span>
    <span v-else-if="loading">
      <van-loading size="20px" color="">{{ $t('加载中') }}...</van-loading>
    </span>
    <span v-else>
      {{ !totalPage && finshedText ? $t('暂无数据') : $t(finshedText) }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BaseLoadMore',
  props: {
    loading: Boolean,
    showLoadMore: {
      type: Boolean,
      default: true
    },
    finshedText: {
      type: [String, Number],
      default: '没有更多了~'
    },
    totalPage: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    }
  },
  emits: ['loadMore'],
  setup(props, ctx) {
    const handleMore = () => {
      ctx.emit('loadMore')
    }
    return {
      handleMore
    }
  }
})
</script>
<style lang="scss" scoped>
.base-load-more {
  text-align: center;
  padding: 24px;
  color: #999;
  span.more {
    padding: 10px;
    cursor: pointer;
    &:hover {
      font-weight: 400;
    }
    i.a-icon-loadmore {
      color: #666;
      margin-left: 5px;
    }
  }
}
</style>
