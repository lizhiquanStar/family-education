<template>
  <div class="base-clear">BaseClear Working!</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { ClearAdapter } from './BaseClear.adapter'
import { CLEAR_DEFAULT_CONFIG } from './BaseClear.default'
import { mergeEventsAndDasherizeKeys } from '@/core/utils/factory/view.factory'
export default defineComponent({
  name: 'BaseClear',
  props: {
    config: {
      type: Object as PropType<ClearAdapter>
    }
  },
  setup(props) {
    const Config = computed(() => {
      return { ...CLEAR_DEFAULT_Config, ...props.config }
    })
    return {
      Config,
      mergeEventsAndDasherizeKeys
    }
  }
})
</script>

<style lang="scss"></style>
