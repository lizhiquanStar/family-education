<template>
  <div class="identity-info">
    <h2 v-if="cardInfo.state !== 3" class="identity-info-edit" @click="go">
      编辑
    </h2>
    <div class="cell-list">
      <van-cell title="姓名" :value="cardInfo.xm" />
      <van-cell title="性别" :value="filterLabel(state, cardInfo.sex)" />
      <van-cell title="出生日期" :value="cardInfo.birthday" />
      <van-cell title="身份证号" :value="cardInfo.card" />
      <van-cell title="审核状态" :value="filterLabel(state, cardInfo.state)" />
    </div>
    <p class="identity-title">身份证正面</p>
    <div class="iden-card" @click="handlePreview">
      <van-image width="100%" height="100%" :src="cardInfo.cardZ" />
    </div>
    <p class="identity-title">身份证反面</p>
    <div class="iden-card" @click="handlePreview">
      <van-image width="100%" height="100%" :src="cardInfo.cardF" />
    </div>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue'
import { Image as VanImage, Icon, Button, ImagePreview } from 'vant'
import { PpsIdentityInfoConfig } from './IdentityInfo.config'
export default {
  components: {
    [VanImage.name]: VanImage,
    [Icon.name]: Icon,
    [Button.name]: Button
  },
  emits: [],
  setup() {
    const { proxy } = getCurrentInstance() as any
    const go = () => {
      proxy.$router.push({ name: 'EditIdentity' })
    }
    const handlePreview = () => {
      ImagePreview(['https://img.yzcdn.cn/vant/cat.jpeg'])
    }
    return {
      ...PpsIdentityInfoConfig(),
      handlePreview,
      go
    }
  }
}
</script>
<style lang="scss" scoped>
.identity-info {
  width: 100%;
  height: calc(100vh - 50px);
  box-sizing: border-box;
  padding-bottom: 20px;
  // background: #f7f8fa;
  overflow: scroll;
  .identity-info-edit,
  .identity-title {
    width: 100%;
    box-sizing: border-box;
    padding: 16px;
    font-size: 16px;
    color: rgba(69, 90, 100, 0.6);
  }
  .identity-info-edit {
    text-align: right;
    background: #f7f8fa;
  }
  .identity-title {
    font-size: 14px;
  }
  .cell-list {
    position: relative;
    width: 100%;
  }
  .cell-list::after {
    position: absolute;
    pointer-events: none;
    right: var(--van-padding-md);
    bottom: 0;
    left: var(--van-padding-md);
    content: '';
    border-bottom: 1px solid var(--van-cell-border-color);
    transform: scaleY(0.5);
  }
  .iden-card {
    width: 345px;
    height: 200px;
    box-sizing: border-box;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 10px;
  }
}

.van-cell {
  padding: 16px;
}
</style>
