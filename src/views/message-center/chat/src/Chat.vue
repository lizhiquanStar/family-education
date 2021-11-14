<template>
  <van-sticky>
    <van-nav-bar
      :title="$route.query.name"
      left-text="返回"
      left-arrow
      @click-left="() => $router.back()"
    />
  </van-sticky>
  <van-pull-refresh
    v-model="refreshing"
    @refresh="onRefresh"
    :loosing-text="loosingText"
    :pulling-text="loosingText"
    :loading-text="loosingText"
    class="chat-wrapper"
  >
    <template v-for="item in list" :key="item.id">
      <div class="time" v-if="item.sendTime">{{ item.sendTime }}</div>
      <div v-if="item.userType == USERINFO.type" class="msg msg-right">
        <div class="img-wrapper">
          <van-image
            :src="item.sendTx || $defaultAvatar"
            class="img"
          ></van-image>
        </div>
        <van-image
          :src="$defaultAvatar"
          class="content-img"
          v-if="item.type == 2"
        ></van-image>
        <div class="message-wrapper message-wrapper-right" v-else>
          <div class="message" v-html="item.content"></div>
        </div>
      </div>
      <div class="msg msg-left" v-else>
        <div class="img-wrapper">
          <van-image
            :src="item.sendTx || $defaultAvatar"
            class="img"
          ></van-image>
        </div>
        <van-image
          :src="$defaultAvatar"
          class="content-img"
          v-if="item.type == 2"
        ></van-image>
        <div class="message-wrapper message-wrapper-left" v-else>
          <div class="message" v-html="item.content"></div>
        </div>
      </div>
    </template>
  </van-pull-refresh>
  <van-submit-bar class="chat-btn">
    <van-cell-group inset>
      <van-field v-model="message" rows="1" autosize type="textarea" />
    </van-cell-group>
    <template #button>
      <div class="chat-btn-icon">
        <van-icon name="smile-o" />
        <van-icon name="add-o" />
      </div>
    </template>
  </van-submit-bar>
</template>

<script lang="ts">
import { SubmitBar, PullRefresh } from 'vant'
import { PpsChatConfig } from './Chat.config'
export default {
  components: {
    [SubmitBar.name]: SubmitBar,
    [PullRefresh.name]: PullRefresh
  },
  setup() {
    return {
      ...PpsChatConfig()
    }
  }
}
</script>
<style lang="scss" scoped>
.chat-wrapper {
  padding: 16px;
  background: var(--van-gray-1);
  height: calc(100vh - 52px - 50px);
  overflow: auto;
  :deep .van-pull-refresh__track {
    height: auto;
  }
}
.time {
  text-align: center;
  color: var(--van-gray-6);
  margin: 10px 0;
}
.msg {
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  .message-wrapper {
    max-width: 220px;
    margin: 0px 10px 0px 10px;
    .message {
      margin: 8px;
      word-wrap: break-word;
    }
  }
  .message-wrapper-left {
    background-color: #fff;
    border-radius: 0px 12px 12px 12px;
  }
  .message-wrapper-right {
    background-color: powderblue;
    border-radius: 12px 0px 12px 12px;
  }
  .van-image {
    &.img {
      flex: auto;
      height: 36px;
      width: 36px;
    }
    &.content-img {
      height: 100px;
      width: 100px;
      margin-left: 10px;
      margin-right: 10px;
    }
    :deep img {
      border-radius: 8px;
    }
  }
}
.msg-right {
  flex-direction: row-reverse;
}
.msg-left {
  flex-direction: row;
}
.chat-btn {
  background: var(--van-gray-3);
  :deep .van-submit-bar__bar {
    padding-left: 0;
  }
  .van-cell-group {
    width: 100%;
    .van-cell {
      padding: 8px 10px;
    }
  }
  .chat-btn-icon {
    font-size: 28px;
    flex-shrink: 0;
    .van-icon:first-child {
      margin-right: 10px;
    }
  }
}
</style>
