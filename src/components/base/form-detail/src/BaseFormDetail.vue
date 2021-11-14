<template>
  <van-form
    class="base-form-detail"
    v-bind="Config"
    v-if="Object.keys(Config.formModel).length"
  >
    <p class="pps-form-title pps-font-xl" v-if="Config.title">
      {{ Config.title }}
      <small>{{ Config.sub }}</small>
    </p>
    <div class="form-detail" :class="Config.direction">
      <slot>
        <van-cell-group
          :border="false"
          v-for="(form, i) in Config.form"
          :key="i"
          :class="[
            form.className,
            { small: Config.size == 'sm' },
            { 'form-detail-box': Config.form.length > 1 }
          ]"
        >
          <p class="cell-group-title" v-if="form.title">{{ form.title }}</p>
          <slot name="group-title" :formModel="Config.formModel"></slot>
          <template v-for="(field, fi) in form.fieldConfig" :key="fi">
            <van-field
              v-if="
                !field.formType &&
                (typeof field.hidden === 'function'
                  ? !field.hidden(field, Config.formModel)
                  : !field.hidden)
              "
              readonly
              rows="1"
              :border="false"
              v-model="Config.formModel[field.name]"
              v-bind="field"
              :type="field.type || 'textarea'"
              :autosize="true"
            >
              <template #input v-if="mode == 'view'">
                {{ handleValue(Config.formModel, field) }}
              </template>
              <template v-for="(name, slot) in field?.slots || {}" #[slot]>
                <slot :name="name" :formModel="Config.formModel"></slot>
              </template>
            </van-field>
            <div
              class="array-form"
              v-else-if="
                (typeof field.hidden === 'function'
                  ? !field.hidden(field, Config.formModel[field.name])
                  : !field.hidden) && Config.formModel[field.name]
              "
            >
              <van-cell-group
                :border="false"
                v-for="(item, idx) in Config.formModel[field.name]"
                :key="idx"
                :class="[{ small: Config.size == 'sm' }]"
              >
                <p class="cell-group-title" v-if="field.arrayformConfig.title">
                  {{ field.arrayformConfig.title }}
                </p>
                <slot
                  name="group-title"
                  :formModel="Config.formModel[field.name][idx]"
                ></slot>
                <template
                  v-for="(fieldChild, fi) in field.arrayformConfig.fieldConfig"
                  :key="fi"
                >
                  <van-field
                    v-if="
                      typeof fieldChild.hidden === 'function'
                        ? !fieldChild.hidden(
                            fieldChild,
                            Config.formModel[field.name][idx]
                          )
                        : !fieldChild.hidden
                    "
                    readonly
                    rows="1"
                    :border="false"
                    v-model="Config.formModel[field.name][idx][fieldChild.name]"
                    v-bind="fieldChild"
                    :type="fieldChild.type || 'textarea'"
                    :autosize="true"
                  >
                    <template #input v-if="mode == 'view'">
                      {{
                        handleValue(
                          Config.formModel[field.name][idx],
                          fieldChild
                        )
                      }}
                    </template>
                    <template
                      v-for="(name, slot) in fieldChild?.slots || {}"
                      #[slot]
                    >
                      <slot
                        :name="name"
                        :formModel="Config.formModel[field.name][idx]"
                      ></slot>
                    </template>
                  </van-field>
                </template>
              </van-cell-group>
            </div>
          </template>
        </van-cell-group>
      </slot>
    </div>
  </van-form>
</template>
<script lang="ts">
import { defineComponent, PropType, computed, getCurrentInstance } from 'vue'
import { Field, CellGroup, Form, Cell } from 'vant'
import { FormDetailAdapter } from './BaseFormDetail.adapter'
import { FORM_DETAIL_DEFAULT_CONFIG } from './BaseFormDetail.default'
import { get } from 'lodash'

export default defineComponent({
  name: 'BaseFormDetail',
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Form.name]: Form
  },
  props: {
    mode: {
      type: String as PropType<'view' | 'edit'>,
      default: 'view'
    },
    config: {
      type: Object as PropType<FormDetailAdapter>
    }
  },
  setup(props) {
    const { proxy } = getCurrentInstance() as any
    const Config = computed(() => {
      return { ...FORM_DETAIL_DEFAULT_CONFIG, ...props.config }
    })
    const handleValue = (model, field: any) => {
      const val = get(model, field.name)
      let busDic: any = {}
      let realVal: any
      switch (field.valType) {
        case 'money':
          realVal = proxy.$filters.Money(
            val,
            field.defaultFill,
            field.valTypeConfig?.min || 2,
            field.valTypeConfig?.max || 2,
            field.valTypeConfig?.pn
          )
          break
        case 'percent':
          realVal = proxy.$filters.Percent(
            val,
            field.defaultFill,
            field.valTypeConfig?.min || 2,
            field.valTypeConfig?.max || 2,
            field.valTypeConfig?.pn,
            field.valTypeConfig?.ratio
          )
          break
        case 'date':
          realVal = proxy.$filters.Date(val, field.format, field.defaultFill)
          break
        case 'select':
          realVal =
            field.valTypeConfig?.options &&
            field.valTypeConfig?.options.find(
              item => item.value == get(model, field.selectKey)
            )?.label
          break
        case 'dicSelect':
          busDic = proxy.$store.state.busDic
          busDic &&
            (realVal = busDic[field.dicKey].find(
              item => item.dictKey == get(model, field.selectKey)
            )?.dictValue)
          break
        default:
          realVal = get(model, field.name, field.defaultFill)
      }
      return realVal || field.defaultFill || '--'
    }
    return {
      Config,
      get,
      handleValue
    }
  }
})
</script>
<style lang="scss">
.cell-group-title {
  font-size: var(--van-font-size-md);
  line-height: var(--van-line-height-md);
  padding: 24px 0;
  font-weight: var(--van-font-weight-bold);
}
.array-form {
  .van-cell-group:not(:last-child) {
    padding-bottom: 24px;
  }
  .cell-group-title {
    //padding-bottom: 16px;
    font-weight: var(--van-font-weight-normal);
  }
}
@media screen and (max-width: 750px) {
  .cell-group-title {
    padding: 16px 0;
  }
}
</style>
<style lang="scss" scoped>
.base-form-detail {
  flex: 1;
}

.array-form {
  border: 1px solid var(--van-gray-3);
  padding: 0 24px 24px;
  width: 100%;
  .cell-group-title {
    padding-bottom: 16px;
  }
}
.form-detail {
  padding: 32px 32px 28px 32px;
  &.horizontal {
    .van-cell-group {
      @include layout(row, wrap);
    }
  }
  :deep img {
    width: 100px;
  }
}
.van-cell-group {
  @include layout(column, nowrap);
  width: 100%;
  padding-bottom: 10px;
  &:last-child {
    padding-bottom: 0;
  }
  flex-shrink: 0;
  &:not(.form-detail-box):not(:first-child) {
    border-top: 1px solid var(--van-gray-3);
  }
  &:first-child {
    .cell-group-title {
      padding-top: 0;
    }
  }
  :deep {
    .van-field__control--custom {
      min-height: auto;
    }
    .van-field__control--min-height {
      min-height: 20px;
    }
    .van-field__label {
      margin-right: 32px;
      // font-weight: var(--van-font-weight-light);
    }
  }
  .van-cell {
    padding: 0;
    margin-bottom: 10px;
    font-size: var(--van-font-size-md);
    line-height: var(--van-line-height-md);
    &:last-child {
      margin-bottom: 0;
    }
  }
  &.small {
    .van-cell {
      font-size: var(--van-font-size-sm);
      line-height: var(--van-line-height-sm);
    }
  }
}
@media screen and (max-width: 750px) {
  .form-detail {
    padding: 16px;
  }
  .array-form {
    padding: 0 16px 16px 16px;
  }
  .van-cell-group {
    :deep {
      .van-field__label {
        margin-right: 0;
      }
    }
  }
}
</style>
