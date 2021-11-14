<template>
  <div class="my">
    <base-cell
      :imgUrl="USERINFO.tx || $defaultAvatar"
      :title="USERINFO.userNc"
      :sub="true"
      :badgeIcon="USERINFO.sex == 1 ? 'icon-xingbienv-xiao' : 'icon-xingbienan'"
    >
      <template #sub>
        <span>{{ USERINFO.isSfRz == 2 ? '身份已认证' : '身份未认证' }}</span>
        <span v-if="USERINFO.type == 2">{{
          USERINFO.isJsZgRz == 2 ? '教师资格证已认证' : '教师资格证未认证'
        }}</span>
      </template>
    </base-cell>
    <div class="cell-list">
      <van-cell
        :title="item.title"
        v-for="(item, index) in userItem[
          USERINFO.type == 1 ? 'student' : 'teacher'
        ]"
        :key="index"
        is-link
        :icon="item.icon"
        :class="item.class"
        :to="{ name: item.url }"
        @click="go(item)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { GetUser } from '@/core/utils/vue/get-user'
import { PpsMyConfig, userItem } from './My.config'
export default {
  setup() {
    const { USERINFO, proxy } = GetUser()
    const go = item => {
      proxy.$router.push({ name: item.url })
    }
    return {
      USERINFO,
      userItem,
      go,
      ...PpsMyConfig()
    }
  }
}
</script>
<style lang="scss" scoped>
.my {
  background: var(--van-gray-1);
  height: 100%;
}
.base-cell {
  padding: 24px 16px;
  background: var(--van-blue);
  color: #fff;
  :deep .pps-sub {
    color: #fff;
    opacity: 0.8;
  }
}
.van-cell {
  padding: 16px;
  :deep .van-cell__left-icon {
    font-size: 20px;
    margin-right: 16px;
  }
}

.border-non {
  border-bottom: 8px solid var(--van-gray-1);
  &::after {
    border-bottom: none;
  }
}
</style>
