<template>
  <van-sticky :offset-top="offsetTop">
    <van-nav-bar
      class="base-nav-bar"
      v-bind="Config"
      v-on="mergeEventsAndDasherizeKeys(Config.on)"
    >
      <template v-for="(name, slot) in Config?.slots || {}" #[slot]>
        <slot :name="name"></slot>
      </template>
    </van-nav-bar>
  </van-sticky>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { NavBar, Sticky } from 'vant'
import { NavBarAdapter } from './BaseNavBar.adapter'
import { NAV_BAR_DEFAULT_CONFIG } from './BaseNavBar.default'
import { mergeEventsAndDasherizeKeys } from '@/core/utils/factory/view.factory'
export default defineComponent({
  name: 'BaseNavBar',
  components: {
    [Sticky.name]: Sticky,
    [NavBar.name]: NavBar
  },
  props: {
    offsetTop: {
      type: Number,
      default: 64
    },
    config: {
      type: Object as PropType<NavBarAdapter>
    }
  },
  setup(props) {
    const Config = computed(() => {
      return { ...NAV_BAR_DEFAULT_CONFIG, ...props.config }
    })
    return {
      Config,
      mergeEventsAndDasherizeKeys
    }
  }
})
</script>
