<template>
  <div class="base-pull-down">
    <base-empty
      v-if="finished && !list.length"
      :data="list"
      :description="errText"
    ></base-empty>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :finished-text="finishedText"
        @load="onLoad"
      >
        <slot :list="list"></slot>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { List, PullRefresh } from 'vant'
export default defineComponent({
  name: 'BasePullDown',
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh
  },
  props: {
    api: {
      type: Function,
      default: () => {}
    },
    params: {
      type: Object as PropType<{ [key: string]: any }>,
      default: () => {}
    }
  },
  setup(props) {
    const errText = ref('暂无数据')
    const list = ref([])
    const loading = ref(false)
    const finished = ref(false)
    const refreshing = ref(false)
    const finishedText = ref('')
    const params = ref({
      pageNum: 1,
      pageSize: 10
    })

    const onLoad = async () => {
      if (refreshing.value) {
        list.value = []
        refreshing.value = false
      }
      const [res] = await props.api({ ...params.value, ...props.params })
      loading.value = false
      if (res.data.code !== 0) {
        finished.value = true
        finishedText.value = list.value.length ? '加载失败' : ''
        errText.value = '加载失败'
        return
      }
      errText.value = '暂无数据'
      list.value = list.value.concat(res.data.rows)
      if (list.value.length >= res.data.total || !res.data.total) {
        finished.value = true
        finishedText.value = list.value.length > 0 ? '没有更多了～' : ''
      } else {
        params.value.pageNum += 1
      }
    }

    const onRefresh = () => {
      params.value.pageNum = 1
      params.value.pageSize = 10
      finished.value = false
      loading.value = true
      list.value = []
      onLoad()
    }
    return {
      list,
      loading,
      finishedText,
      errText,
      finished,
      refreshing,
      onLoad,
      onRefresh
    }
  }
})
</script>

<style lang="scss"></style>
