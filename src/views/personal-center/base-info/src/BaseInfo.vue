<template>
  <div class="base-info">
    <h2 class="base-info-edit" @click="go">编辑</h2>
    <div class="cell-list">
      <van-cell
        :title="item.title"
        v-for="(item, index) in userItem[USERINFO.type]"
        :key="index"
        :class="item.class"
        :value="filterLabel(item.type, USERINFO[item.value])"
      >
        <template v-if="index === 0" #value>
          <van-image
            round
            width="60px"
            height="60px"
            :src="USERINFO[item.value]"
          />
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script lang="ts">
import { Image as VanImage, Icon } from 'vant'
import { GetUser } from '@/core/utils/vue/get-user'
import { PpsBaseInfoConfig, userItem, eduList, gender } from './BaseInfo.config'
export default {
  components: {
    [VanImage.name]: VanImage,
    [Icon.name]: Icon
  },
  emits: [],
  setup() {
    const { USERINFO, proxy } = GetUser()
    let filterType = {
      gender: gender,
      eduList: eduList
    }
    const go = () => {
      proxy.$router.push({ name: 'EditBaseInfo' })
    }
    const filterLabel = (type, value) => {
      let val = ''
      let arr = (type && filterType[type]) || []
      arr.forEach(item => {
        if (item.value === value) val = item.text
      })
      return val || value
    }
    console.log('USERINFO', USERINFO)
    return {
      ...PpsBaseInfoConfig(),
      userItem,
      eduList,
      gender,
      USERINFO,
      filterLabel,
      filterType,
      go
    }
  }
}
</script>
<style lang="scss" scoped>
.base-info {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background: #f7f8fa;
  .base-info-edit {
    width: 100%;
    box-sizing: border-box;
    padding: 16px 16px;
    font-size: 16px;
    color: rgba(69, 90, 100, 0.6);
    text-align: right;
  }
}
.header-cell {
  align-items: center;
}
.van-cell {
  padding: 16px;
}
</style>
