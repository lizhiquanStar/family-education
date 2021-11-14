<template>
  <div class="user-detail">
    <div class="detail-header">
      <div class="detail-avatar">
        <van-badge>
          <van-image
            round
            width="60px"
            height="60px"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <template #content>
            <i class="iconfont icon-xingbienan" />
          </template>
        </van-badge>
      </div>
      <div class="detail-header-info">
        <div class="header-info-name">大佬哈哈哈</div>
        <div class="header-info-tips">
          <span><van-icon name="award-o" />10年</span>
          <!-- <span><van-icon name="award-o" />2</span> -->
          <span><van-icon name="award-o" />身份已认证</span>
          <span><van-icon name="award-o" />教师资格已认证</span>
        </div>
      </div>
    </div>
    <div class="detail-info">
      <div class="detail-info-cell">
        <van-icon name="location-o" />浙江省杭州市
      </div>
      <div class="detail-info-cell"><van-icon name="like-o" />自我介绍</div>
      <div class="detail-info-cell">
        自我介绍自我介绍自我介绍自我介绍自我介绍
      </div>
    </div>
    <div class="detail-title">他的课程</div>
    <div class="detail-list-header">
      <van-row>
        <van-col span="8">阶段</van-col>
        <van-col span="8">科目</van-col>
        <van-col span="8">费用</van-col>
      </van-row>
    </div>
    <div class="detail-list">
      <div class="detail-item">
        <van-row>
          <van-col span="8">初中</van-col>
          <van-col span="8">语文</van-col>
          <van-col span="8">100</van-col>
        </van-row>
        <div class="detail-item-btn">
          <van-stepper v-model="value" button-size="24px" />
          <!-- <van-button type="primary" size="mini">立即购买</van-button> -->
        </div>
      </div>
      <div class="detail-item">
        <van-row>
          <van-col span="8">初中</van-col>
          <van-col span="8">语文</van-col>
          <van-col span="8">100</van-col>
        </van-row>
        <div class="detail-item-btn">
          <van-stepper v-model="value" button-size="24px" />
          <!-- <van-button type="primary" size="mini">立即购买</van-button> -->
        </div>
      </div>
      <div class="detail-item">
        <van-row>
          <van-col span="8">初中</van-col>
          <van-col span="8">语文</van-col>
          <van-col span="8">100</van-col>
        </van-row>
        <div class="detail-item-btn">
          <van-stepper v-model="value" button-size="24px" />
          <!-- <van-button type="primary" size="mini">立即购买</van-button> -->
        </div>
      </div>
      <div class="item-count">总计：2000</div>
      <!-- <div class="no-data">没有更多了</div> -->
    </div>
    <div class="detail-title">他的评价 (1)</div>
    <div class="comment-list">
      <div class="comment-item">
        <div class="item-header">
          <div class="item-header-left">
            <div class="item-header-avater">
              <van-image
                round
                width="40px"
                height="40px"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
              />
            </div>
            <div class="item-header-info">
              <div class="item-header-name">张三</div>
              <div class="item-header-tips">购买课程：数学</div>
            </div>
          </div>
          <div class="item-header-time">3天前</div>
        </div>
        <div class="item-content">哈哈哈哈哈</div>
      </div>
      <div class="no-data">没有更多了</div>
    </div>
    <div class="detail-footer">
      <van-button type="primary">立即沟通</van-button>
      <van-button type="primary">立即购买</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Image as VanImage,
  SwipeCell,
  Button,
  Card,
  Badge,
  Icon,
  Stepper
} from 'vant'
import { PpsUserDetailConfig } from './UserDetail.config'
export default {
  components: {
    [VanImage.name]: VanImage,
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Card.name]: Card,
    [Badge.name]: Badge,
    [Icon.name]: Icon,
    [Stepper.name]: Stepper
  },
  emits: [],
  setup() {
    return {
      ...PpsUserDetailConfig()
    }
  }
}
</script>

<style lang="scss" scoped>
.user-detail {
  box-sizing: border-box;
  // padding: 20px;
  padding-bottom: 50px;
}
.detail-header {
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 20px 0 20px;
  .detail-avatar {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    box-sizing: border-box;
    margin-right: 20px;
    ::v-deep .van-badge.van-badge--fixed {
      top: 10px;
      right: 5px;
    }
    ::v-deep .van-badge {
      background: none;
      border: 0;
    }
  }
  .header-info-name {
    margin-bottom: 6px;
    font-size: var(--van-font-size-md);
    font-weight: var(--van-font-weight-bold);
  }
  .header-info-tips {
    font-size: var(--van-font-size-sm);
    color: var(--van-gray-9);
    span {
      position: relative;
      padding-right: 10px;
    }
    span:not(:last-child)::after {
      content: '';
      height: 10px;
      width: 0.5px;
      position: absolute;
      top: 3px;
      right: 5px;
      background: var(--van-gray-5);
    }
  }
}
.detail-info {
  // margin-top: 20px;
  padding: 20px;
  .detail-info-cell {
    // display: flex;
    margin-bottom: 10px;
    font-size: 14px;
    color: var(--van-gray-9);
    i {
      margin-right: 6px;
    }
  }
  border-bottom: 6px solid var(--van-gray-1);
}
.detail-title {
  padding: 10px 20px;
  border-bottom: 0.5px solid var(--van-gray-1);
}
.detail-list-header {
  .van-row {
    padding: 10px 0;
    text-align: center;
    background: var(--van-gray-1);
  }
}
// .detail-list {
//   // padding: 0 20px;
// }
.detail-item {
  border-bottom: 6px solid var(--van-gray-1);
  .van-row {
    padding: 10px 0;
    text-align: center;
    border-bottom: 0.5px solid var(--van-gray-1);
  }
  .detail-item-btn {
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    padding: 0 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: right;
  }
}
.item-count {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  font-weight: var(--van-font-weight-bold);
  color: var(--van-button-primary-background-color);
  text-align: right;
  border-bottom: 6px solid var(--van-gray-1);
}

.comment-list {
  padding: 0 20px;
  .comment-item {
    padding: 20px 0;
    border-bottom: 0.5px solid var(--van-gray-1);
    .item-header,
    .item-header-left {
      display: flex;
      align-items: center;
    }
    .item-header {
      justify-content: space-between;
      .item-header-avater {
        flex-shrink: 0;
        margin-right: 10px;
      }
      .item-header-name {
        // margin-bottom: 6px;
        font-size: 14px;
      }
    }
    .item-header-time,
    .item-header-tips {
      font-size: var(--van-font-size-sm);
      color: var(--van-gray-9);
    }
    .item-content {
      margin-top: 10px;
      padding-left: 40px;
      box-sizing: border-box;
    }
  }
}

.no-data {
  padding: 20px 0;
  color: var(--van-gray-9);
  text-align: center;
}
.detail-footer {
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  // padding: 0 20px;
  .van-button {
    flex: 1;
  }
  .van-button:last-child {
    margin-left: 10px;
  }
}
</style>
