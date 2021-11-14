<template>
  <div class="publish">
    <div class="publish-add" @click="go">新增</div>
    <div class="publish-cell publish-header">
      <van-row justify="space-between" class="head">
        <van-col
          v-for="(item, index) in userItem[USERINFO.type]"
          :key="index"
          span="6"
          >{{ item.title }}</van-col
        >
      </van-row>
      <!-- <div
        v-for="(item, index) in userItem[USERINFO.type]"
        :key="index"
        class="publish-cell-label"
      >
        {{ item.title }}
      </div> -->
    </div>
    <base-pull-down :api="initApi()" ref="pullDown">
      <template #default="slotProps">
        <van-swipe-cell v-for="(item, index) in slotProps.list" :key="index">
          <van-row justify="space-between" class="publish-cell">
            <van-col span="6">{{ item.jdCn }}</van-col>
            <van-col span="6">{{ item.kmCn }}</van-col>
            <van-col
              v-if="USERINFO.type === 1"
              span="6"
              class="publish-cell-content"
              >{{ item.fbContent }}</van-col
            >
            <van-col v-else span="6" class="publish-cell-content">{{
              item.fy
            }}</van-col>
          </van-row>
          <!-- <van-row v-else justify="space-between" class="publish-cell">
            <van-col span="6">{{ item.jdCn }}</van-col>
            <van-col span="6">{{ item.kmCn }}</van-col>
            <van-col span="6" class="publish-cell-content">{{
              item.fy
            }}</van-col>
          </van-row> -->
          <template #right>
            <van-button
              square
              text="删除"
              size="small"
              type="danger"
              class="delete-button"
              @click="handleDel(item, USERINFO.type)"
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
      </template>
    </base-pull-down>
  </div>
</template>

<script lang="ts">
import { GetUser } from '@/core/utils/vue/get-user'
import { PpsPublishApi } from './Publish.api'
import { PpsPublishConfig, userItem } from './Publish.config'
import { Image as VanImage, SwipeCell, Button, Card, Toast } from 'vant'
import { ref } from 'vue'
export default {
  components: {
    [VanImage.name]: VanImage,
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Card.name]: Card
  },
  emits: [],
  setup() {
    const { proxy, USERINFO } = GetUser()
    const pullDown = ref<null | HTMLElement>(null)
    const go = item => {
      proxy.$router.push({
        name: 'EditPublish',
        query: {
          id: item.id || ''
        }
      })
    }
    const initApi = () => {
      const usetType = {
        1: PpsPublishApi.list,
        2: PpsPublishApi.lsList
      }
      return usetType[USERINFO.type]
    }
    const handleDel = async (item, type) => {
      const usetType = {
        1: '/rest/user/delFb',
        2: '/rest/ls/delFb'
      }
      const [res] = await PpsPublishApi.delPublish(usetType[type], {
        id: item.id
      })
      if (res.code === 0) {
        Toast('删除成功')
        proxy.$refs.onRefresh()
      }
    }
    // onMounted(async () => {
    //   const [res] = await PpsPublishApi.list({ pageNum: 1, pageSize: 10 })
    //   console.log(res)
    //   console.log('pullDown', pullDown.value)
    // })
    return {
      ...PpsPublishConfig(),
      PpsPublishApi,
      userItem,
      USERINFO,
      pullDown,
      go,
      handleDel,
      initApi
    }
  }
}
</script>

<style lang="scss" scoped>
.publish-cell {
  width: 100%;
  // display: flex;
  // align-items: center;
  box-sizing: border-box;
  padding: 10px 0;
  // font-size: 14px;
  border-bottom: 1px solid #f7f7f7;
  .publish-cell-label {
    flex: 1;
    text-align: center;
  }
  .van-col {
    text-align: center;
  }
  .publish-cell-content {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
.publish-header {
  padding: 5px 0;
  // font-size: 16px;
  font-weight: 500;
  color: #666;
  background: #f7f7f7;
  border-bottom: 0;
}
.publish-add {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 10px;
  // font-size: 16px;
  color: #666;
  text-align: right;
}
.publish {
  .van-button--square {
    border-radius: 0;
  }
  .delete-button {
    height: 100%;
  }
}
</style>
