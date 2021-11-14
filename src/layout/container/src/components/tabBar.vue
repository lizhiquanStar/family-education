<template>
  <van-tabbar v-model="active" safe-area-inset-bottom>
    <template v-for="item in tabs" :key="item.title">
      <van-tabbar-item
        :icon="item.icon"
        @click="go(item)"
        :dot="item.url == 'ChatList'"
        >{{ item.title }}</van-tabbar-item
      >
    </template>
  </van-tabbar>
</template>
<script lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { Tabbar, TabbarItem } from 'vant'
import { tabs, tabsObj } from './tarBar.config'
export default {
  name: 'TabBar',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  setup() {
    const { proxy } = getCurrentInstance() as any
    const active = ref(tabsObj[proxy.$route.name])

    const go = item => {
      proxy.$router.replace({ name: item.url })
    }

    return {
      active,
      tabs,
      go
    }
  }
}
</script>
