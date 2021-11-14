<template>
  <div class="student-courses pps-page">
    <van-sticky :offset-top="0">
      <van-tabs v-model:active="active" @click-tab="onClickTab">
        <van-tab
          :name="item.value"
          :title="item.label"
          v-for="item in tabs"
          :key="item.value"
        ></van-tab>
      </van-tabs>
    </van-sticky>
    <base-pull-down
      :api="PpsStudentCoursesApi.list"
      :params="params"
      ref="pullDown"
    >
      <template #default="slotProps">
        <div
          v-for="(item, index) in slotProps.list"
          :key="index"
          class="list-order"
        >
          <van-cell :title="item.lsMc" label-class="time">
            <template #label v-if="item.startTime">
              <p>
                <van-icon name="clock" class="pps-warning" />
                {{
                  `${item.startTime ? item.startTime + ' ~ ' : ''}${
                    item.endTime || ''
                  }`
                }}
              </p>
            </template>
          </van-cell>
          <van-row justify="space-between" class="head">
            <van-col span="6">阶段</van-col>
            <van-col span="6">科目</van-col>
            <van-col span="6">服务状态</van-col>
          </van-row>
          <van-row justify="space-between" class="list-sub">
            <van-col span="6">{{ item.jd }}</van-col>
            <van-col span="6">{{ item.km }}</van-col>
            <van-col
              span="6"
              :class="`pps-${COURSES_ORDER_STATUS[item.state]?.color}`"
              >{{ COURSES_ORDER_STATUS[item.state]?.label }}</van-col
            >
          </van-row>
          <!-- // 订单状态(1 待服务 2服务中 3已完成 ) -->
          <div class="handle">
            <van-button
              type="default"
              size="small"
              @click="
                () =>
                  $router.push({
                    name: 'AppointedTime',
                    query: { id: item.id }
                  })
              "
              v-if="item.state == 1"
            >
              约定时间
            </van-button>
            <van-button
              type="primary"
              @click="goChat(item.lsId, item.lsMc)"
              size="small"
              v-if="item.state == 1"
            >
              立即沟通
            </van-button>
            <van-button
              type="primary"
              @click="confirm(item.id)"
              size="small"
              v-if="item.state == 3 && item.userQrState != 2"
            >
              确认完成
            </van-button>
            <van-button
              type="default"
              @click="
                () =>
                  $router.push({ name: 'Evaluation', query: { id: item.id } })
              "
              size="small"
              v-if="item.userQrState == 2 && item.pjstate != 2"
            >
              去&ensp;评&ensp;价
            </van-button>
          </div>
        </div>
      </template>
    </base-pull-down>
  </div>
</template>

<script lang="ts">
import { PpsStudentCoursesConfig, tabs } from './StudentCourses.config'
import { COURSES_ORDER_STATUS } from '@/config/config'
import { PpsStudentCoursesApi } from './StudentCourses.api'
export default {
  components: {},
  setup() {
    return {
      COURSES_ORDER_STATUS,
      PpsStudentCoursesApi,
      tabs,
      ...PpsStudentCoursesConfig()
    }
  }
}
</script>
<style lang="scss" scoped>
.list-order {
  background: #fff;
  border-bottom: 8px solid var(--van-gray-1);
  :deep .time {
    font-size: 13px;
    color: var(--van-gray-6);
  }
  .handle {
    padding: 16px;
    text-align: right;
    .van-button:not(:last-child) {
      margin-right: 20px;
    }
  }
  .van-row {
    padding: 6px 0;
  }
  .van-row.head {
    padding: 10px 0;
    background: var(--van-gray-1);
  }
  .van-col {
    text-align: center;
  }
  .list-sub {
    border-bottom: 1px solid var(--van-gray-1);
  }
}
.van-cell::after {
  right: 0;
  left: 0;
}

:deep {
  .van-cell__label {
    margin-top: 0;
  }
  .van-sticky {
    margin-bottom: 8px;
  }
}
</style>
