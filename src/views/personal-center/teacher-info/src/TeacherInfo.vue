<template>
  <div class="teacher-info">
    <h2 class="teacher-info-edit" @click="go">新增</h2>
    <van-swipe-cell v-for="item in jszgzList" :key="item.id">
      <div class="teacher-card">
        <div class="card-title">
          <div class="card-title-label">阶段</div>
          <!-- <div class="card-title-label">年纪</div> -->
          <div class="card-title-label">科目</div>
        </div>
        <div class="card-info">
          <div class="card-info-label">{{ item.jdCn }}</div>
          <!-- <div class="card-info-label">一至六年级</div> -->
          <div class="card-info-label">{{ item.kmCn }}</div>
        </div>
        <div class="card-img" @click="handlePreview(item)">
          <van-image width="100%" height="100%" :src="item.jszgzZ" />
        </div>
        <div v-if="item.state == 1" class="card-state">审核中</div>
        <div v-else-if="item.state == 2" class="card-state">审核未通过</div>
        <div v-else-if="item.state == 3" class="card-state">审核通过</div>
      </div>
      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          class="delete-button"
          @click="handleDel(item)"
        />
        <van-button
          v-if="item.state !== 3"
          square
          type="success"
          size="small"
          text="编辑"
          class="delete-button"
          @click="go(item)"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script lang="ts">
import { PpsTeacherInfoConfig } from './TeacherInfo.config'
import { GetUser } from '@/core/utils/vue/get-user'
import {
  Image as VanImage,
  SwipeCell,
  Button,
  Card,
  ImagePreview,
  Toast
} from 'vant'
import { PpsTeacherInfoApi } from './TeacherInfo.api'
import { ref, onMounted } from 'vue'

export default {
  components: {
    [VanImage.name]: VanImage,
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Card.name]: Card
  },
  emits: [],
  setup() {
    const { proxy } = GetUser()
    const params = ref({
      pageNum: 1,
      pageSize: 50
    })
    const jszgzList = ref([])
    const getList = async () => {
      const [res] = await PpsTeacherInfoApi.jszgList({ ...params.value })
      console.log('res', res)
      jszgzList.value = res.rows.map(item => {
        return {
          ...item
        }
      })
    }
    const handlePreview = item => {
      ImagePreview([item.jszgzZ, item.jszgzF])
    }
    const handleDel = async item => {
      const [res] = await PpsTeacherInfoApi.delJszgz({ id: item.id })
      if (res.code === 0) {
        Toast('删除成功')
        getList()
      }
    }
    const go = item => {
      proxy.$router.push({
        name: 'EditTeacher',
        query: {
          id: item.id || ''
        }
      })
    }
    onMounted(() => {
      getList()
    })
    return {
      ...PpsTeacherInfoConfig(),
      handlePreview,
      go,
      getList,
      jszgzList,
      params,
      handleDel
    }
  }
}
</script>

<style lang="scss" scoped>
.teacher-info {
  padding-bottom: 20px;
}
.teacher-info-edit {
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  font-size: 14px;
  color: rgba(69, 90, 100, 0.6);
  text-align: right;
}
.teacher-card {
  width: 360px;
  box-sizing: border-box;
  margin: 6px auto;
  padding: 10px 16px;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 0 10px var(--van-cell-border-color);
  .card-title,
  .card-info {
    display: flex;
  }
  .card-title {
    padding-bottom: 5px;
    border-bottom: 0.5px solid var(--van-cell-border-color);
  }
  .card-info {
    padding: 10px 0;
  }
  .card-title-label {
    flex: 1;
    flex-shrink: 0;
    font-size: 16px;
    color: rgba(69, 90, 100, 0.6);
    text-align: center;
  }
  .card-info-label {
    flex: 1;
    flex-shrink: 0;
    font-size: 14px;
    color: #333;
    text-align: center;
  }
  .card-img {
    width: 100%;
    height: 140px;
    box-sizing: border-box;
    margin: 0 auto;
    border-radius: 5px;
    overflow: hidden;
  }
  .card-state {
    padding: 10px 0 0 0;
    font-size: 14px;
    color: rgba(69, 90, 100, 0.6);
    text-align: center;
  }
}
.delete-button {
  height: 100%;
}
</style>
