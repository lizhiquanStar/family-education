<template>
  <div class="edit-base-info">
    <van-cell-group>
      <van-cell title="头像" class="header-cell">
        <template #value>
          <van-uploader :before-read="beforeRead" :after-read="afterRead">
            <van-image
              round
              width="60px"
              height="60px"
              :src="userInfo.userTx"
            />
          </van-uploader>
        </template>
      </van-cell>
      <!-- <van-field
        v-model="userInfo.userNc"
        label="昵称"
        input-align="right"
        placeholder="请输入昵称"
      /> -->
      <van-field
        v-if="USERINFO.type === 1"
        v-model="genderName"
        type="text"
        label="性别"
        input-align="right"
        placeholder="请选择性别"
        @click="showInfo.genderShow = true"
      />
      <!-- <van-field
        v-model="userInfo."
        type="number"
        label="出生日期"
        input-align="right"
      /> -->
      <van-field
        v-if="USERINFO.type === 2"
        v-model="eduName"
        type="text"
        label="学历"
        input-align="right"
        placeholder="请选择学历"
        @click="showInfo.eduShow = true"
      />
      <van-field
        v-if="USERINFO.type === 2"
        v-model="userInfo.zjnx"
        type="text"
        label="执教年限"
        input-align="right"
        placeholder="请输入年限"
      />
      <van-field
        v-model="userInfo.areaCn"
        type="text"
        label="所在地"
        input-align="right"
        placeholder="请选择所在地"
        @click="showInfo.areaShow = true"
      />
      <van-field
        v-model="userInfo.xaddress"
        type="textarea"
        rows="3"
        label="详细地址"
        input-align="right"
        placeholder="请选择地址"
      />
      <van-field
        v-model="userInfo.introduce"
        type="textarea"
        label="自我介绍"
        placeholder="请输入介绍"
        input-align="right"
        rows="3"
        maxlength="200"
        autosize
      />
    </van-cell-group>

    <div class="edit-btn">
      <van-button round block type="primary" @click="handleSubmit">
        保存
      </van-button>
    </div>

    <!-- <van-popup v-model:show="showInfo.areaShow" round position="bottom">
      <van-area
        title="选择城市"
        :area-list="areaList"
        @cancel="showInfo.areaShow = false"
        @confirm="onConfirmArea"
      />
    </van-popup> -->
    <van-popup v-model:show="showInfo.areaShow" round position="bottom">
      <van-cascader
        v-model="areaValue"
        title="请选择所在地区"
        :options="areaList"
        active-color="#0065FF"
        @change="areaChange"
        @close="showInfo.areaShow = false"
        @finish="onConfirmArea"
      />
    </van-popup>
    <van-popup v-model:show="showInfo.birthdayShow" round position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择日期"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showInfo.birthdayShow = false"
        @confirm="onConfirmDate"
      />
    </van-popup>
    <van-popup v-model:show="showInfo.genderShow" round position="bottom">
      <van-picker
        title="选择性别"
        :columns="gender"
        @cancel="showInfo.genderShow = false"
        @confirm="onConfirmGender"
      />
    </van-popup>
    <van-popup v-model:show="showInfo.eduShow" round position="bottom">
      <van-picker
        title="选择学历"
        :columns="eduList"
        @cancel="showInfo.eduShow = false"
        @confirm="onConfirmEdu"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { PpsEditBaseInfoConfig, gender, eduList } from './EditBaseInfo.config'
import {
  Image as VanImage,
  Icon,
  Picker,
  Popup,
  Area,
  DatetimePicker,
  CellGroup,
  Field,
  Uploader
} from 'vant'
export default {
  components: {
    [VanImage.name]: VanImage,
    [Icon.name]: Icon,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Area.name]: Area,
    [DatetimePicker.name]: DatetimePicker,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Uploader.name]: Uploader
  },
  emits: [],
  setup() {
    const { proxy } = getCurrentInstance() as any
    const currentDate = ref(new Date())
    // const openEdu = () => {
    //   showInfo.eduShow = true
    // }
    // const openGender = () => {
    //   showInfo.genderShow = true
    // }
    // const openJIguan = () => {
    //   showInfo.areaShow = true
    // }
    // const openAddress = () => {
    //   showInfo.areaShow = true
    // }

    return {
      ...PpsEditBaseInfoConfig(),
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate,
      proxy,
      gender,
      eduList
      // openEdu,
      // openGender,
      // openJIguan,
      // openAddress,
      // handleSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-base-info {
  width: 100%;
  height: calc(100vh - 50px);
  box-sizing: border-box;
  background: #f7f8fa;
  overflow: scroll;
  .edit-btn {
    width: 100%;
    box-sizing: border-box;
    margin-top: 30px;
    padding: 20px;
  }
}
.header-cell {
  align-items: center;
}
.van-cell {
  padding: 16px;
}
</style>
