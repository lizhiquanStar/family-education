<template>
  <van-dialog v-model:show="showDialog" class="base-dialog" teleport="body">
    <template #title>
      <slot name="title">
        <div class="base-dialog-title pps-flex" v-if="showHead">
          <p class="flex1 tl">{{ title }}</p>
          <p class="flex-shrink" @click="cancel" v-if="showClose">
            <van-icon name="cross" />
          </p>
        </div>
      </slot>
    </template>
    <div class="base-dialog-content">
      <slot></slot>
    </div>
    <template #footer>
      <slot name="footer">
        <div class="base-dialog-footer">
          <van-button
            type="default"
            @click="cancel"
            v-if="showCancel"
            size="small"
          >
            {{ cancelText }}
          </van-button>
          <van-button
            type="primary"
            size="small"
            @click="confirm"
            v-if="showConfirm"
            >{{ confirmText }}</van-button
          >
        </div>
      </slot>
    </template>
  </van-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { Button, Dialog } from 'vant'
export default defineComponent({
  name: 'BaseDialog',
  components: {
    [Dialog.name]: Dialog,
    [Button.name]: Button
  },
  props: {
    show: Boolean,
    title: {
      type: String,
      default: '温馨提示'
    },
    showHead: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    confirmText: {
      type: [String, Number],
      default: '确认'
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: [String, Number],
      default: '取消'
    }
  },
  emits: ['confirm', 'cancel'],
  setup(props, ctx) {
    const showDialog = ref(false)
    watch(
      () => props.show,
      val => {
        showDialog.value = val
      }
    )
    const cancel = () => {
      showDialog.value = false
      ctx.emit('cancel')
    }

    const confirm = () => {
      ctx.emit('confirm')
    }
    return {
      showDialog,
      confirm,
      cancel
    }
  }
})
</script>
<style lang="scss">
.base-dialog {
  border-radius: 4px;
  .van-dialog__header {
    padding: 16px 24px;
  }
}
@media screen and (min-width: 750px) {
  .van-dialog {
    width: 440px;
  }
}
</style>
<style lang="scss" scoped>
.base-dialog {
  &-content {
    padding: 31px 24px 44px 24px;
    border-top: 1px solid var(--van-gray-3);
    border-bottom: 1px solid var(--van-gray-3);
  }
  &-footer {
    text-align: right;
    padding: 16px 24px;
  }
  .van-icon-cross {
    cursor: pointer;
  }
  .van-button {
    margin-left: 12px;
    min-width: 72px;
    &.van-button--small {
      font-size: var(--van-font-size-md);
    }
  }
}
</style>
