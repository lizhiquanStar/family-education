<template>
  <div class="identity-info">
    <div class="cell-list">
      <van-field
        v-model="cardInfo.xm"
        label="姓名"
        input-align="right"
        placeholder="请输入姓名"
      />
      <van-field
        v-model="sexName"
        label="性别"
        input-align="right"
        placeholder="请选择性别"
        @click="showPicker = true"
      />
      <van-field
        v-model="cardInfo.birthday"
        label="出生日期"
        input-align="right"
        placeholder="请选择日期"
        @click="birthdayShow = true"
      />
      <van-field
        v-model="cardInfo.card"
        label="身份证号"
        input-align="right"
        placeholder="请输入身份证号"
      />
      <!-- <van-field
        v-model="userInfo.state"
        label="审核状态"
        input-align="right"
        placeholder="请选择审核状态"
        @click="showPicker = true"
      /> -->
    </div>
    <p class="identity-title">身份证正面</p>
    <div class="iden-card">
      <van-uploader :before-read="beforeRead" :after-read="afterReadZ">
        <van-image width="100%" height="100%" :src="cardInfo.cardZ" />
      </van-uploader>
    </div>
    <p class="identity-title">身份证反面</p>
    <div class="iden-card">
      <van-uploader :before-read="beforeRead" :after-read="afterReadF">
        <van-image width="100%" height="100%" :src="cardInfo.cardF" />
      </van-uploader>
    </div>

    <div class="edit-btn">
      <van-button round block type="primary" @click="handleSubmit">
        保存
      </van-button>
    </div>

    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
        title="选择性别"
        :columns="gender"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-popup v-model:show="birthdayShow" round position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择日期"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="birthdayShow = false"
        @confirm="onConfirmDate"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import {
  Image as VanImage,
  Icon,
  Button,
  Field,
  Uploader,
  DatetimePicker,
  Popup,
  Picker
} from 'vant'
import { PpsEditIdentityConfig } from './EditIdentity.config'
export default {
  components: {
    [VanImage.name]: VanImage,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Uploader.name]: Uploader,
    [DatetimePicker.name]: DatetimePicker
  },
  emits: [],
  setup() {
    return {
      ...PpsEditIdentityConfig()
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
    height: 160px;
    box-sizing: border-box;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 10px;
  }
}
.edit-btn {
  width: 100%;
  box-sizing: border-box;
  margin-top: 100px;
  padding: 20px;
}
.van-cell {
  padding: 16px;
}
</style>
