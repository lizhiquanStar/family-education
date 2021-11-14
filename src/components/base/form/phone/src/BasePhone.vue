<template>
  <van-field
    :border="false"
    class="base-phone"
    autocomplete="off"
    type="tel"
    :label="label"
    name="mobileNo"
    :placeholder="placeholder"
    :error-message="errMessage"
    :rules="[{ validator: mobileRule }]"
  >
    <template #input>
      <div class="flex">
        <van-popover
          v-model:show="showArecode"
          theme="dark"
          :actions="actions"
          @select="select"
          v-if="showCode"
        >
          <template #reference>
            <i class="text">
              +86
              <i class="iconfont" v-if="icon" :class="icon"></i>
            </i>
          </template>
        </van-popover>
        <input
          type="tel"
          v-model="phone.phone"
          name="mobileNo"
          class="van-field__control"
          :placeholder="$t(placeholder)"
          @blur="blur"
          autocomplete="off"
        />
      </div>
    </template>
  </van-field>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  getCurrentInstance,
  reactive
} from 'vue'
import { Field, Popover } from 'vant'
import { phoneRule } from '@/core/utils/vue/vee-validate'
type FormVal = {
  phone: string
  areaCode: string
}
export default defineComponent({
  name: 'BasePhone',
  components: {
    [Field.name]: Field,
    [Popover.name]: Popover
  },
  props: {
    icon: {
      type: String,
      default: 'icon-drop-down'
    },
    showCode: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '手机号'
    },
    modelValue: {
      type: Object as PropType<FormVal>,
      default: () => {
        return {
          phone: '',
          areaCode: '0086'
        }
      }
    }
  },
  emits: ['input'],
  setup(props) {
    const { proxy } = getCurrentInstance() as any
    const showArecode = ref(false)
    const errMessage = ref('')
    const phone = reactive(props.modelValue)
    const actions = ref([{ text: '+86', value: '86' }])
    const mobileRule = val => {
      if (phoneRule[phone.areaCode] && !phoneRule[phone.areaCode].test(val)) {
        return proxy.$t('请输入正确的手机号')
      }
    }
    const validate = val => {
      errMessage.value = mobileRule(val)
      return errMessage.value
    }
    const select = action => {
      phone.areaCode = action.value
    }
    const blur = $event => {
      validate($event.target.value)
    }
    return {
      showArecode,
      select,
      blur,
      mobileRule,
      phone,
      errMessage,
      validate,
      actions
    }
  }
})
</script>

<style lang="scss">
.base-phone {
  .van-field__control {
    flex: 1;
  }
  .van-popover__wrapper {
    padding-right: 12px;
    .text {
      padding-right: 11px;
      .iconfont {
        font-size: 10px;
      }
      border-right: 1px solid #e0e0e0;
    }
  }
}
</style>
