import { InjectionKey, inject, watch, ref } from 'vue'
import _ from 'lodash'
interface FormContext {
  provider: any
}
export const formKey = 'PpsForm' as unknown as InjectionKey<FormContext>

export default function FromComponentFactory(
  props: any,
  states: any,
  ctx: any
) {
  const provider = inject(formKey) || {}
  const model = ref<any>(null)
  watch(
    () => props.modelValue,
    (val: any, oldVal: any) => {
      model.value = val
      _.isFunction(states.onModelChange) && states.onModelChange(val, oldVal)
      !states.overrideModelChange &&
        states.Config.value.on &&
        _.isFunction(states.Config.value.on.modelChange) &&
        states.Config.value.on.modelChange(val, oldVal)
    },
    { immediate: true }
  )
  /**
   * 对model使用immediate: true会导致input事件过早触发验证
   */
  watch(
    () => model.value,
    (val: any, oldVal: any) => {
      if (val !== oldVal) ctx.emit('input', val)
    }
  )
  return {
    model,
    provider
  }
}
