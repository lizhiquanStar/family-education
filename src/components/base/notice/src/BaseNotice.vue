<template>
  <van-notice-bar
    class="base-notice"
    v-bind="Config"
    v-on="mergeEventsAndDasherizeKeys(Config.on)"
  >
    <slot>{{ Config.title }}</slot>
    <template v-for="(name, slot) in Config.slots || {}" #[slot]>
      <slot :name="name"></slot>
    </template>
  </van-notice-bar>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { NoticeBar } from 'vant'
import { mergeEventsAndDasherizeKeys } from '@/core/utils/factory/view.factory'
import { NoticeAdapter } from './BaseNotice.adapter'
import { NOTICE_DEFAULT_CONFIG } from './BaseNotice.default'
export default defineComponent({
  name: 'PpsNotice',
  components: {
    [NoticeBar.name]: NoticeBar
  },
  props: {
    config: {
      type: Object as PropType<NoticeAdapter>
    }
  },
  setup(props) {
    const Config = computed(() => {
      return { ...NOTICE_DEFAULT_CONFIG, ...props.config }
    })
    return {
      Config,
      mergeEventsAndDasherizeKeys
    }
  }
})
</script>
