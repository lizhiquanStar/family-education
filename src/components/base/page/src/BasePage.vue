<template>
  <van-config-provider :theme-vars="themeVars">
    <slot></slot>
  </van-config-provider>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ConfigProvider } from 'vant'
import { GetSkin } from '../../../../core/styles/skin'
export default defineComponent({
  name: 'PpsPage',
  components: {
    [ConfigProvider.name]: ConfigProvider
  },
  setup() {
    return {
      ...GetSkin()
    }
  }
})
</script>
<style lang="scss" scoped>
.van-config-provider {
  height: 100%;
}
</style>
