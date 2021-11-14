<template>
  <base-page id="app">
    <router-view></router-view>
  </base-page>
</template>
<script lang="ts">
import BasePage from '@/components/base/page'
import { getCurrentInstance, onMounted } from 'vue'
export default {
  components: {
    BasePage
  },
  setup() {
    const { proxy } = getCurrentInstance() as any
    onMounted(() => {
      window.onresize = () => {
        proxy.$store.state.screenWidth = document.body.clientWidth
      }
    })
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--van-gray-8);
  font-size: var(--van-font-size-normal);
  font-weight: var(--van-font-weight-normal);
  min-width: 320px;
  width: 100%;
  background: #fff;
  height: 100%;
  margin: 0 auto;
}
</style>
