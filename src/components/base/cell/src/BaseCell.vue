<template>
  <div class="base-cell" :class="{ 'show-cus-badge': badgeIcon }">
    <div class="base-cell-left" @click="leftClick">
      <van-badge :dot="dot" :content="badge || ''" :max="badgeMax">
        <template #content v-if="badgeIcon">
          <i class="iconfont" :class="badgeIcon" />
        </template>
        <van-image
          class="cell-left-img"
          fit="containt"
          :src="imgUrl"
          :round="round"
          v-if="showImg"
        >
          <template v-slot:loading v-if="!showDefaultImg">
            <slot name="loadingSlot">
              <i>{{ avatar }}</i>
            </slot>
          </template>
          <template v-slot:error v-if="!showDefaultImg">
            <slot name="errorSlot">
              <i>{{ avatar }}</i>
            </slot>
          </template>
        </van-image>
      </van-badge>

      <div class="cell-left-info" :class="infoClass">
        <p :class="`pps-font-${size}`" class="title pps-weight-bold">
          <slot name="title">
            <span>{{ title }}</span>
          </slot>
          <span
            class="info-tag pps-font-sm pps-weight-light"
            :style="!title ? 'margin-left: 0' : ''"
            v-if="tag"
          >
            {{ tag }}
          </span>
        </p>
        <p class="pps-sub-font pps-sub" v-if="sub">
          <slot name="sub">
            {{ sub }}
          </slot>
        </p>
      </div>
    </div>

    <slot name="right">
      <div class="base-cell-right">
        {{ rightText }}
      </div>
    </slot>
    <div
      class="base-cell-arrow"
      v-if="showArrow"
      @click.prevent.stop="rightClick"
    >
      <slot name="arrow">
        <van-icon name="arrow" />
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Image as VanImage, Badge } from 'vant'
type Size = 'sm' | 'normal' | 'md' | 'lg' | 'xl' | 'xxl'
export default defineComponent({
  name: 'BaseCell',
  components: {
    [VanImage.name]: VanImage,
    [Badge.name]: Badge
  },
  props: {
    size: {
      type: String as PropType<Size>,
      default: 'md'
    },
    infoClass: {
      type: String,
      default: ''
    },
    showDefaultImg: {
      type: Boolean,
      default: false
    },
    showImg: {
      type: Boolean,
      default: true
    },
    imgUrl: {
      type: String,
      default: ''
    },
    title: {
      type: [String, Number],
      default: ''
    },
    dot: {
      type: Boolean,
      default: false
    },
    badge: {
      type: [String, Number],
      default: 0
    },
    badgeIcon: {
      type: String,
      default: ''
    },
    badgeMax: {
      type: [String, Number],
      default: 9
    },
    sub: {
      type: [String, Number, Boolean],
      default: ''
    },
    tag: {
      type: [String, Number],
      default: ''
    },
    rightText: {
      type: [String, Number],
      default: ''
    },
    showArrow: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: true
    }
  },
  emits: ['right-click', 'left-click'],
  computed: {
    avatar() {
      if (this.showDefaultImg) {
        return ''
      }
      const reg = /^[a-zA-Z ]+$/
      let res = ''
      if (this.title && reg.test(String(this.title))) {
        const arr = String(this.title).trim().split(' ')
        res =
          arr.length == 1
            ? arr[0].substr(0, 2).charAt(0).toUpperCase() +
              arr[0].substr(0, 2).slice(1)
            : arr
                .reduce(
                  (prev, curr) => prev.substr(0, 1) + '' + curr.substr(0, 1)
                )
                .toUpperCase()
      } else {
        res = String(this.title).slice(-2)
      }
      return res
    }
  },
  setup(props, ctx) {
    const rightClick = value => {
      ctx.emit('right-click', value)
    }
    const leftClick = () => {
      ctx.emit('left-click')
    }
    return {
      rightClick,
      leftClick
    }
  }
})
</script>
<style lang="scss" scoped>
.show-cus-badge {
  :deep .van-badge {
    background: none;
    padding: 0;
    line-height: inherit;
    min-width: none;
    &.van-badge--fixed {
      right: 5px;
      top: 10px;
    }
  }
}
.base-cell {
  @include layout(row, wrap, center, start);
  width: 100%;
}
.base-cell-left {
  flex-shrink: 0;
  @include layout(row, nowrap, center, start);
  margin-right: 20px;
  .pps-sub-font {
    margin-top: 5px;
    text-align: left;
  }
}
.cell-left-info {
  margin-left: 12px;
  .title {
    @include layout(row, nowrap, center, start);
    line-height: 20px;
    .info-tag {
      padding: 0 3px;
      margin-left: 6px;
      border-radius: 1px;
      flex-shrink: 0;
      align-self: flex-start;
      border: 1px solid var(--van-text-color);
    }
  }
}
.cell-left-img {
  // margin-right: 12px;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  .cell-badge {
    right: -3px;
    position: absolute;
    top: -2px;
  }
  &.van-image--round {
    overflow: inherit;
    background: #f5f5f5;
    padding: 2px;
  }
  :deep {
    .van-image__error,
    .van-image__loading {
      color: var(--van-text-color);
      font-size: var(--van-font-size-normal);
      font-weight: var(--van-font-weight-bold);
      border: 1px solid var(--van-gray-3);
      background: var(--van-background-color-light);
      border-radius: 50%;
    }
  }
}
.base-cell-right {
  flex: 1;
  flex-shrink: 0;
  @include layout(row, nowrap, center, end);
}
.base-cell-arrow {
  min-width: 24px;
  flex-shrink: 0;
  @include layout(row, nowrap, center, end);
}
</style>
