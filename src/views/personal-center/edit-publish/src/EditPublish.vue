<template>
  <div class="identity-info">
    <div class="cell-list">
      <template v-for="item in userItem[USERINFO.type]" :key="item.value">
        <van-field
          v-if="item.itemType === 'select'"
          v-model="publishInfo[item.label]"
          :label="item.title"
          input-align="right"
          :type="item.type"
          :placeholder="'请输入' + item.title"
          @click="handleOpen(item)"
        />
        <van-field
          v-else
          v-model="publishInfo[item.value]"
          :label="item.title"
          input-align="right"
          :type="item.type"
          :placeholder="'请输入' + item.title"
          maxlength="200"
        />
      </template>
    </div>
    <!-- <template v-if="USERINFO.type === 2">
      <p class="identity-title">教师资格证</p>
      <div class="iden-card" @click="handlePreview">
        <van-uploader>
          <van-image
            width="100%"
            height="100%"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </van-uploader>
      </div>
    </template> -->

    <div class="edit-btn" :class="USERINFO.type === 2 && 'edit-btn-mt'">
      <van-button
        round
        block
        type="primary"
        @click="handleSubmit(USERINFO.type)"
      >
        提交
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
    <van-popup v-model:show="jszgShow" round position="bottom">
      <van-picker
        title="选择教师资格证"
        :columns="jszgList"
        @cancel="jszgShow = false"
        @confirm="onConfirmJszg"
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
  Toast,
  Picker
} from 'vant'
import { PpsEditPublishConfig, userItem } from './EditPublish.config'
import { PpsEditPublishApi } from './EditPublish.api'
import { reactive, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { GetUser } from '@/core/utils/vue/get-user'
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
    let id: any = ref('')
    let jdList = ref([])
    let kmList = ref([])
    let jszgList: any = ref([])
    const jdShow = ref(false)
    const kmShow = ref(false)
    const jszgShow = ref(false)
    const route = useRoute()
    const { USERINFO, proxy } = GetUser()
    const getId = () => {
      id.value = (route.query && route.query.id) || ''
    }
    let info: any = {}
    userItem[USERINFO.type].forEach(item => {
      if (item.itemType === 'select') info[item.label] = ''
      info[item.value] = ''
    })
    const publishInfo = reactive(info)
    const customFieldName = {
      text: 'name',
      value: 'id'
    }
    const handlePreview = () => {
      ImagePreview(['https://img.yzcdn.cn/vant/cat.jpeg'])
    }
    const getJszgzList = async () => {
      const [res] = await PpsEditPublishApi.jszgList()
      jszgList.value = res.map(item => {
        return {
          text: item.name,
          value: item.id
        }
      })
    }
    const getZdList = async () => {
      const [res] = await PpsEditPublishApi.getZd()
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
    const onConfirmJd = ({ text, value }) => {
      publishInfo.jdId = value
      publishInfo.jdCn = text
      jdShow.value = false
    }
    const onConfirmKm = ({ text, value }) => {
      publishInfo.kmId = value
      publishInfo.kmCn = text
      kmShow.value = false
    }
    const onConfirmJszg = ({ text, value }) => {
      publishInfo.zgzId = value
      publishInfo.jszgCn = text
      jszgShow.value = false
    }
    const getInfo = async (id, type) => {
      const _type = {
        2: '/rest/ls/getIdFb',
        1: '/rest/user/getFbId'
      }
      const [res] = await PpsEditPublishApi.getDetail(_type[type], { id })
      console.log('res', res)
      for (const n in publishInfo) {
        publishInfo[n] = res[n]
      }
      jszgList.value.forEach(item => {
        if (item.value === res.zgzId) publishInfo.jszgCn = item.text
      })
    }
    const handleOpen = item => {
      if (item.itemType !== 'select') return
      if (item.label === 'jdCn') jdShow.value = true
      else if (item.label === 'kmCn') kmShow.value = true
      else if (item.label === 'jszgCn') jszgShow.value = true
    }
    const handleSubmit = async type => {
      console.log('publishInfo', publishInfo)
      if (type === 2) {
        if (USERINFO.isYa !== 2) {
          Toast('您还未支付押金，暂不能发布')
          return false
        }
      }
      Toast.loading({
        message: '提交中...',
        forbidClick: true
      })
      let _info = {}
      const _type = {
        1: '/rest/user/fbAdd',
        2: '/rest/ls/fbAdd'
      }
      if (id.value) _info = { ...publishInfo, id: id.value }
      else {
        if (type === 1) {
          _info = {
            jdId: publishInfo.jdId,
            kmId: publishInfo.kmId,
            fbContent: publishInfo.fbContent
          }
        } else {
          _info = {
            fy: publishInfo.fy,
            zgzId: publishInfo.zgzId
          }
        }
      }
      const [res] = await PpsEditPublishApi.updatePublish(_type[type], _info)
      Toast.clear()
      if (res.code === 0) {
        await Toast(res.msg)
        proxy.$router.go(-1)
      }
    }
    onMounted(async () => {
      await getId()
      await getZdList()
      if (USERINFO.type === 2) await getJszgzList()
      if (id.value) getInfo(id.value, USERINFO.type)
    })
    return {
      ...PpsEditPublishConfig(),
      id,
      customFieldName,
      jszgShow,
      kmShow,
      jdShow,
      jdList,
      kmList,
      jszgList,
      publishInfo,
      userItem,
      USERINFO,
      handlePreview,
      handleOpen,
      handleSubmit,
      getInfo,
      getZdList,
      getJszgzList,
      onConfirmKm,
      onConfirmJd,
      onConfirmJszg
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
.edit-btn-mt {
  margin-top: 400px;
}
.van-cell {
  padding: 16px;
}
</style>
