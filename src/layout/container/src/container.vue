<template>
  <div
    class="pps-content"
    :class="{ pd: ['Home', 'ChatList', 'My'].includes($route.name) }"
  >
    <van-sticky>
      <van-nav-bar
        v-if="$route.meta.name"
        :title="$route.meta.name"
        left-text="返回"
        left-arrow
        @click-left="() => $router.back()"
      />
    </van-sticky>
    <router-view />
  </div>
  <TabBar v-if="['Home', 'ChatList', 'My'].includes($route.name)"></TabBar>
</template>
<script lang="ts">
import { getCurrentInstance } from 'vue'
import { NavBar } from 'vant'

import TabBar from './components/tabBar.vue'
export default {
  name: 'Contanier',
  components: { TabBar, [NavBar.name]: NavBar },
  setup() {
    const { proxy } = getCurrentInstance() as any
    const isTabRoute = ['Home', 'ChatList', 'My'].includes(proxy.$route.name)
    return {
      isTabRoute
    }
  }
}
</script>
<style lang="scss" scoped>
.pps-content {
  width: 100%;
  height: 100%;
  background: #fff;
  overflow-y: auto;
  &.pd {
    padding-bottom: calc(
      var(--van-tabbar-height) + env(safe-area-inset-bottom)
    );
  }
}
</style>
