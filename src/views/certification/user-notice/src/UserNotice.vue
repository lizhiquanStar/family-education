<template>
  <div class="user-notice" v-html="notice" v-if="notice"></div>
  <base-empty :data="notice" v-else></base-empty>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { PpsUserNoticeApi } from './UserNotice.api'
export default {
  setup() {
    const notice: any = ref(null)

    const getNotice = async () => {
      const [res] = await PpsUserNoticeApi.userNotice({ type: 1 })
      if (!res) return (notice.value = '')
      notice.value = res
    }

    onMounted(() => {
      getNotice()
    })

    return {
      notice
    }
  }
}
</script>
<style lang="scss" scoped>
.user-notice {
  padding: 24px;
  line-height: 20px;
}
</style>
