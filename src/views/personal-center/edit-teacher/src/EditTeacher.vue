<template>
  <div class="identity-info">
    <div class="cell-list">
      <van-field
        v-model="teacherInfo.jdCn"
        label="阶段"
        input-align="right"
        placeholder="请输入阶段"
        @click="jdShow = true"
      />
      <van-field
        v-model="teacherInfo.kmCn"
        label="科目"
        input-align="right"
        placeholder="请输入科目"
        @click="kmShow = true"
      />
      <!-- <van-field
        v-model="userInfo.state"
        label="审核状态"
        input-align="right"
        placeholder="请选择审核状态"
        @click="showPicker = true"
      /> -->
    </div>
    <p class="identity-title">教师资格证正面</p>
    <div class="iden-card">
      <van-uploader
        v-if="teacherInfo.jszgzZ"
        :before-read="beforeRead"
        :after-read="afterReadZ"
      >
        <van-image width="100%" height="100%" :src="teacherInfo.jszgzZ" />
      </van-uploader>
      <van-uploader v-else :before-read="beforeRead" :after-read="afterReadZ" />
    </div>
    <p class="identity-title">教师资格证反面</p>
    <div class="iden-card">
      <van-uploader
        v-if="teacherInfo.jszgzF"
        :before-read="beforeRead"
        :after-read="afterReadF"
      >
        <van-image width="100%" height="100%" :src="teacherInfo.jszgzF" />
      </van-uploader>
      <van-uploader v-else :before-read="beforeRead" :after-read="afterReadF" />
    </div>

    <div class="edit-btn">
      <van-button round block type="primary" @click="handleSubmit">
        保存
      </van-button>
    </div>
    <van-popup v-model:show="jdShow" round position="bottom">
      <van-picker
        title="选择阶段"
        :columns="jdList"
        @cancel="jdShow = false"
        @confirm="onConfirmJd"
      />
    </van-popup>
    <van-popup v-model:show="kmShow" round position="bottom">
      <van-picker
        title="选择科目"
        :columns="kmList"
        @cancel="kmShow = false"
        @confirm="onConfirmKm"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import {
  Image as VanImage,
  Icon,
  Button,
  ImagePreview,
  Field,
  Uploader,
  Popup,
  Picker,
  Toast
} from 'vant'
import { PpsEditTeacherConfig } from './EditTeacher.config'
import { PpsEditTeacherApi } from './EditTeacher.api'
import { PpsGlobalApi } from '@/config/global.api'
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
export default {
  components: {
    [VanImage.name]: VanImage,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Uploader.name]: Uploader
  },
  emits: [],
  setup() {
    const { proxy } = getCurrentInstance() as any
    const jdShow = ref(false)
    const kmShow = ref(false)
    const jdList = ref([])
    const kmList = ref([])
    const teacherInfo = reactive({
      jdId: '',
      jdCn: '',
      kmCn: '',
      kmId: '',
      jszgzZ: '',
      jszgzF: ''
    })

    const handlePreview = () => {
      ImagePreview(['https://img.yzcdn.cn/vant/cat.jpeg'])
    }
    const getZdList = async () => {
      const [res] = await PpsEditTeacherApi.getZd()
      console.log('reszzzz', res)
      jdList.value = res.jdList.map(item => {
        return {
          text: item.name,
          value: item.id
        }
      })
      kmList.value = res.kmList.map(item => {
        return {
          text: item.name,
          value: item.id
        }
      })
    }
    const route = useRoute()
    const id: any = ref('')
    const getId = () => {
      id.value = (route.query && route.query.id) || ''
    }
    const getInfo = async () => {
      const [res] = await PpsEditTeacherApi.jszgzDetail({ id: id.value })
      console.log('res', res)
      for (const n in teacherInfo) {
        teacherInfo[n] = res[n]
      }
    }
    const beforeRead = file => {
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        Toast('请上传 jpg 或 png 格式图片')
        return false
      }
      return true
    }
    const afterReadZ = async file => {
      const [res] = await PpsGlobalApi.uploadFile({ file: file.file })
      teacherInfo.jszgzZ = res
    }
    const afterReadF = async file => {
      const [res] = await PpsGlobalApi.uploadFile({ file: file.file })
      teacherInfo.jszgzF = res
    }
    const onConfirmKm = ({ text, value }) => {
      teacherInfo.kmId = value
      teacherInfo.kmCn = text
      kmShow.value = false
    }
    const onConfirmJd = ({ text, value }) => {
      teacherInfo.jdId = value
      teacherInfo.jdCn = text
      jdShow.value = false
    }
    const handleSubmit = async () => {
      let info = {}
      if (id.value) info = { ...teacherInfo, id: id.value }
      else info = { ...teacherInfo }
      const [res] = await PpsEditTeacherApi.updateTeacher(info)
      console.log('res', res)
      if (res.code === 0) {
        Toast(res.msg)
        proxy.$router.go(-1)
      }
    }
    onMounted(async () => {
      await getId()
      if (id.value) getInfo()
      getZdList()
    })
    return {
      ...PpsEditTeacherConfig(),
      teacherInfo,
      jdList,
      kmList,
      jdShow,
      kmShow,
      getInfo,
      handlePreview,
      beforeRead,
      afterReadZ,
      afterReadF,
      onConfirmJd,
      onConfirmKm,
      getZdList,
      handleSubmit
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
    // font-size: 16px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 345px;
    height: 200px;
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
