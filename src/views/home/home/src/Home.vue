<template>
  <div class="home">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img
          src="https://bpic.588ku.com/back_origin_min_pic/21/03/15/db50488f7fbe4813dde9a2c64bbd5530.jpg!/fw/750/quality/99/unsharp/true/compress/true"
        />
      </van-swipe-item>
    </van-swipe>
    <van-sticky :offset-top="0">
      <van-cell
        icon="location-o"
        title="当前位置"
        is-link
        :value="areaInfo"
        @click="show = true"
      />
      <van-popup v-model:show="show" round position="bottom">
        <van-cascader
          v-model="areaValue"
          title="请选择所在地区"
          :options="areaList"
          active-color="#0065FF"
          @change="areaChange"
          @close="show = false"
          @finish="onFinish"
        />
      </van-popup>
      <van-dropdown-menu class="search-list" active-color="#0065FF">
        <template v-for="(item, index) in filterOptions" :key="index">
          <van-dropdown-item
            v-if="!item.hidden"
            v-model="params[item.key]"
            :options="item.options"
            @change="handleChange"
          />
        </template>
      </van-dropdown-menu>
    </van-sticky>
    <base-pull-down
      ref="pullDown"
      :api="PpsHomeApi[USERINFO.type == 1 ? 'list' : 'lslist']"
      :params="params"
    >
      <template #default="slotProps">
        <div
          class="list"
          v-for="(item, index) in slotProps.list"
          :key="index"
          @click="goDetail(item)"
        >
          <base-cell
            :imgUrl="item.tx || $defaultAvatar"
            :title="item.xm"
            :sub="true"
            :badgeIcon="
              item.sex == 1 ? 'icon-xingbienan' : 'icon-xingbienv-xiao'
            "
          >
            <template #sub v-if="USERINFO.type == 1">
              <span>
                <van-icon name="todo-list-o" />
                {{ item.zjnx }}年</span
              >
              <span><van-icon name="medal-o" />{{ item.xl }}</span>
              <span>
                <van-icon
                  name="shield-o"
                  :class="item.isSfRz == 1 ? 'pps-info' : 'pps-success'"
                />
                {{ item.isSfRz == 1 ? '身份未认证' : '身份已认证' }}
              </span>
              <span>
                <van-icon
                  name="shield-o"
                  :class="item.isJsZgRz == 1 ? 'pps-info' : 'pps-success'"
                />
                {{ item.isJsZgRz == 1 ? '教师资格未认证' : '教师资格已认证' }}
              </span>
            </template>
            <template #sub v-else>
              <span>{{ item.jdCn }}</span>
              <span v-if="USERINFO.type == 1">{{ item.kmCn }}</span>
            </template>
          </base-cell>
          <div class="subject-list mt16" v-if="USERINFO.type == 1">
            <div
              class="subject-item mb10"
              v-for="(sc, index) in item.scList"
              :key="index"
            >
              <div class="pps-flex flex-start">
                <p class="mb5">
                  <van-icon name="award" class="mr5" />{{ sc.jdCn }}：
                </p>
                <p class="subject-item-tag">
                  <span>{{ sc.kmCn }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="user-infomation mt16">
            <p class="mb10">
              <van-icon name="like" class="mr5" />
              {{ USERINFO.type == 2 ? '需求描述' : '自我介绍' }}
            </p>
            <p class="van-ellipsis">
              {{ item.fbContent || item.introduce }}
            </p>
          </div>
        </div>
      </template>
    </base-pull-down>
  </div>
</template>

<script lang="ts">
import { Swipe, SwipeItem } from 'vant'
import { PpsHomeConfig } from './Home.config'
import { PpsHomeApi } from './Home.api'

export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  setup() {
    return {
      ...PpsHomeConfig(),
      PpsHomeApi
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  background: #f5f5f5;
  min-height: 100%;
}
.van-cell {
  font-size: var(--van-font-size-normal);
  color: var(--van-blue);
  :deep .van-cell__title {
    flex-shrink: 0;
    flex: inherit;
  }
}
.van-swipe {
  padding-top: 10px;
  background: #fff;
}
.van-swipe-item {
  height: 140px;
  padding: 0 10px;
  img {
    max-width: 100%;
    height: 140px;
    object-fit: cover;
    width: 100%;
    border-radius: 10px;
  }
}
:deep .van-dropdown-menu__bar {
  box-shadow: none;
  border-bottom: 1px solid#f5f5f5;
}
.list {
  padding: 24px 16px;
  background: #fff;
  border-bottom: 8px solid #f5f5f5;
  .subject-list,
  .user-infomation {
    font-size: 13px;
    padding-left: 8px;
    color: var(--van-gray-9);
  }
}
</style>
