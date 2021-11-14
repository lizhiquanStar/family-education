<template>
  <van-tag
    class="base-tag"
    v-bind="Config"
    v-on="mergeEventsAndDasherizeKeys(Config.on)"
  >
    <slot>{{ Config.text }}</slot>
  </van-tag>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { Tag } from 'vant'
import { mergeEventsAndDasherizeKeys } from '@/core/utils/factory/view.factory'
import { TagAdapter } from './BaseTag.adapter'
import { TAG_DEFAULT_CONFIG } from './BaseTag.default'
export default defineComponent({
  name: 'PpsTag',
  components: {
    [Tag.name]: Tag
  },
  props: {
    config: {
      type: Object as PropType<TagAdapter>
    }
  },
  setup(props) {
    const Config = computed(() => {
      return { ...TAG_DEFAULT_CONFIG, ...props.config }
    })
    return {
      Config,
      mergeEventsAndDasherizeKeys
    }
  }
})
</script>
<style lang="scss" scoped>
.base-tag {
  &.van-tag {
    margin-right: 8px;
  }
  &.van-tag--medium {
    padding: 2px 8px;
  }
}
</style>
