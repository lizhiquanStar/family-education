<template>
  <div class="base-empty">
    <van-loading
      v-if="!data"
      :size="size"
      :color="color"
      :text-color="textColor"
      :vertical="vertical"
    >
      <slot>
        {{ $t(text) }}
      </slot>
    </van-loading>
    <van-empty
      v-else
      :description="description"
      :image="image"
      :image-size="imageSize"
    >
      <slot></slot>
      <slot name="image"></slot>
      <slot name="description"></slot>
    </van-empty>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Empty } from 'vant'
type Image = 'error' | 'network' | 'search' | 'default'

export default defineComponent({
  name: 'BaseEmpty',
  components: {
    [Empty.name]: Empty
  },
  props: {
    data: {
      type: [null, Array, Object, String] as any,
      default: null
    },
    text: {
      type: [String, Number],
      default: '加载中请稍后...'
    },
    color: {
      type: String,
      default: '#34A876'
    },
    textColor: {
      type: String,
      default: '#666'
    },
    vertical: Boolean,
    size: [Number, String],
    image: {
      type: String as PropType<Image | string>,
      default: 'https://img.yzcdn.cn/vant/empty-image-default.png'
    },
    imageSize: {
      type: [Number, String]
    },
    description: {
      type: String,
      default: '暂无数据'
    }
  }
})
</script>
<style lang="scss">
.base-empty {
  height: 100%;
  display: flex;
  justify-content: center;
  .van-loading {
    text-align: center;
    position: absolute;
    top: 50%;
    width: 100%;
  }
}
</style>
