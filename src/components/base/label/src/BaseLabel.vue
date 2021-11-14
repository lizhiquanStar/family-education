<template>
  <div class="base-label">
    <p
      class="base-label-key"
      :style="{ color: labelColor }"
      :class="`pps-font-${labelSize} pps-weight-${labelWeight} pps-align-${align} ${classLabel}`"
    >
      <slot name="label">{{ label }}</slot>
      <!-- 处理safari一个诡异问题 -->
      <span style="font-size: 0">占</span>
    </p>
    <p
      :style="{ color: color }"
      class="base-label-value"
      :class="`pps-font-${size}
        pps-weight-${weight}
        pps-align-${align} ${classValue}`"
    >
      <slot name="value">{{ value }}</slot>
    </p>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
type Size = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
type Weight = 'light' | 'normal' | 'bold'
type Align = 'left' | 'center' | 'right'
export default defineComponent({
  name: 'BaseLabel',
  props: {
    label: {
      type: [Number, String],
      default: ''
    },
    value: {
      type: [Number, String],
      default: ''
    },
    labelSize: {
      type: String as PropType<Size>,
      default: 'md'
    },
    labelColor: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    classValue: {
      type: String,
      default: ''
    },
    classLabel: {
      type: String,
      default: ''
    },
    labelWeight: {
      type: String as PropType<Weight>,
      default: 'bold'
    },
    labelAlign: {
      type: String as PropType<Align>,
      default: 'left'
    },
    size: {
      type: String as PropType<Size>,
      default: 'sm'
    },
    weight: {
      type: String as PropType<Weight>,
      default: 'light'
    },
    align: {
      type: String as PropType<Align>,
      default: 'left'
    }
  }
})
</script>
<style lang="scss" scoped>
.base-label {
  &-key {
    margin-bottom: 3px;
  }
}
</style>
