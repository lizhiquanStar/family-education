<template>
  <div class="evaluation">
    <p class="info">您的每一次评价和建议，都会帮助我们为您提供更好的服务</p>
    <p class="title">服务评价：</p>
    <van-cell-group>
      <van-field
        v-model="pj"
        type="textarea"
        placeholder="请输入"
        rows="3"
        maxlength="200"
        show-word-limit
        autosize
      />
    </van-cell-group>
    <p class="title">老师评星：</p>
    <van-rate v-model="px" icon="like" void-icon="like-o" />
  </div>
  <van-submit-bar>
    <template #button>
      <van-button type="primary" block @click="onSubmit">提交</van-button>
    </template>
  </van-submit-bar>
</template>

<script lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { Rate, SubmitBar } from 'vant'
import { PpsEvaluationApi } from './Evaluation.api'
export default {
  components: {
    [Rate.name]: Rate,
    [SubmitBar.name]: SubmitBar
  },
  emits: [],
  setup() {
    const pj = ref('')
    const px = ref(5)
    const { proxy } = getCurrentInstance() as any

    const onSubmit = async () => {
      if (!pj.value) return proxy.$toast('请输入服务评价')
      const params = {
        pj: pj.value,
        px: px.value,
        id: proxy.$route.query.id
      }
      proxy.$toast.loading()
      const [res] = await PpsEvaluationApi.submit(params)
      proxy.$toast.clear()
      if (!res) return
      proxy.$toast('评价成功')
      proxy.$router.back()
    }
    return {
      pj,
      px,
      onSubmit
    }
  }
}
</script>
<style lang="scss" scoped>
.evaluation {
  padding: 16px;
  .info {
    color: var(--van-gray-6);
  }
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-width: 1px;
  }
  .title {
    font-size: var(--van-font-size-md);
    padding-bottom: 10px;
    margin-top: 20px;
  }
}
</style>
