<template>
  <div class="my-courses">
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
    <base-pull-down :api="PpsMyCoursesApi.list" :params="params" ref="pullDown">
      <template #default="slotProps">
        <div
          class="list-order"
          v-for="(sub, index) in slotProps.list"
          :key="sub.id"
          :class="{ 'list-sub': index != slotProps.list.length }"
        >
          <van-cell
            :title="sub.userMc"
            label-class="time"
            :value="COURSES_ORDER_STATUS[sub.state]?.label"
            :value-class="`pps-${COURSES_ORDER_STATUS[sub.state]?.color}`"
          >
            <template #label v-if="sub.startTime">
              <p>
                <van-icon name="clock" class="pps-warning" />
                {{
                  `${sub.startTime ? sub.startTime + ' ~ ' : ''}${
                    sub.endTime || ''
                  }`
                }}
              </p>
            </template>
          </van-cell>
          <van-row justify="space-between" class="head">
            <van-col span="6">阶段</van-col>
            <van-col span="6">科目</van-col>
            <van-col span="6">结算状态</van-col>
          </van-row>
          <van-row justify="space-between">
            <van-col class="bottomLine" span="6">{{ sub.jd }}</van-col>
            <van-col span="6">{{ sub.km }}</van-col>
            <van-col
              span="6"
              :class="sub.sfJs == 1 ? 'pps-danger' : 'pps-info'"
              >{{ sub.sfJs == 1 ? '未结算' : '已结算' }}</van-col
            >
          </van-row>
          <van-divider :style="{ margin: '0', padding: '0' }"> </van-divider>
          <div class="addressService flex">
            <div class="addressTile">服务地址:</div>
            <div class="mainContent">{{ sub.address }}</div>
          </div>
          <div class="handle">
            <van-button
              type="primary"
              size="small"
              v-if="sub.state == 3"
              @click="dailogShowClick(sub.id)"
            >
              服务内容
            </van-button>
            <van-button
              type="default"
              size="small"
              v-if="sub.state == 1 || sub.state == 2"
              @click="updateCourse(sub.id, sub.state)"
            >
              {{ sub.state == 1 ? '开始服务' : '结束服务' }}
            </van-button>
            <van-button
              type="success"
              size="small"
              @click="goChat(sub.userId, sub.userMc)"
            >
              去&ensp;沟&ensp;通
            </van-button>
          </div>
        </div>
      </template>
    </base-pull-down>
    <van-dialog
      v-model:show="show"
      title="今日服务内容"
      show-cancel-button
      @confirm="onSubmitTxt"
    >
      <van-cell-group inset>
        <van-field
          border
          v-model="message"
          rows="3"
          autosize
          type="textarea"
          maxlength="200"
          placeholder="请输入今日服务内容"
          show-word-limit
        ></van-field>
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script lang="ts">
import { Divider, Dialog, Field, CellGroup } from 'vant'
import { PpsMyCoursesConfig, tabs } from './MyCourses.config'
import { PpsMyCoursesApi } from './MyCourses.api'
export default {
  components: {
    [Divider.name]: Divider,
    [Dialog.Component.name]: Dialog.Component,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup
  },
  emits: [],
  setup() {
    return {
      tabs,
      PpsMyCoursesApi,
      ...PpsMyCoursesConfig()
    }
  }
}
</script>
<style lang="scss" scoped>
.my-courses {
  background: var(--van-gray-1);
  height: 100%;
}
:deep {
  .van-dialog__content {
    padding: 10px;
  }
  .van-field {
    border: 1px solid var(--van-gray-1);
  }
}
.addressService {
  text-align: center;
  font-size: 14px;
  border-bottom: 1px solid var(--van-gray-1);
  .flex {
    align-items: flex-start;
  }
  .addressTile {
    width: 30%;
    padding: 10px;
  }
  .mainContent {
    flex: 1;
    padding: 10px;
    text-align: left;
  }
}
.list-order {
  background: #fff;
  border-bottom: 8px solid var(--van-gray-1);
  .topSize {
    margin-top: 10px;
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
    font-size: 14px;
    background: var(--van-gray-1);
  }
  .van-col {
    text-align: center;
  }
  .list-sub {
    border-bottom: 1px solid var(--van-gray-1);
  }
}
.handle {
  padding: 16px;
  text-align: right;
  .van-button:not(:last-child) {
    margin-right: 20px;
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
  .van-cell__value {
    flex: inherit;
    flex-shrink: 0;
  }
  .time {
    font-size: 13px;
    color: var(--van-gray-6);
  }
  .van-sticky {
    margin-bottom: 8px;
  }
}
</style>
