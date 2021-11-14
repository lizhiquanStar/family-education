import { watch, computed, onMounted, onBeforeUnmount } from 'vue'
import { mergeEventsAndDasherizeKeys } from './core.factory'
import { FactoryService } from '@/core/service/factory.service'
import { BASE_ADAPTER_KEYS } from '../dtos/component-base.dto'
import _ from 'lodash'
export default function BaseComponentFactory(
  props: any,
  states: any,
  ctx: any
) {
  /**
   * 随机生成20位数字的组件id,作为该组件的唯一标识,用于注销组件
   */
  const cid = computed(() => {
    return Math.floor(Math.random() * Math.pow(10, 20)).toString()
  })
  /**
   * 组件名称，用于区分同一页面中多个相同组件
   */
  const id = computed(() => {
    return props.compName || states.Config.value.name || ''
  })
  /**
   * v-bind的config需要过滤一些不会是组件prop的属性
   */
  const bindConfig = computed(() => {
    return _(states.Config.value).omit(BASE_ADAPTER_KEYS).value()
  })
  /**
   * 注册组件
   */
  const register = () => {
    FactoryService.register({
      cid: cid.value,
      name: id.value,
      type: states.$$type.value,
      output: states.output.value || {}
    })
  }

  /**
   * 注销组件
   */
  const logout = () => {
    FactoryService.logout(cid.value)
  }
  /**
   * 内部组件output改变时emit output-change 事件，
   * 用户使用组件output改变时更新注册的output信息
   * @param output 组件的对外输出
   */

  watch(
    () => states.output.value,
    () => {
      states.output.value &&
        (props.inner
          ? ctx.emit('output-change', states.output.value)
          : register())
    },
    { immediate: true }
  )

  onMounted(() => {
    !props.inner && register()
  })
  onBeforeUnmount(() => {
    !props.inner && logout()
  })

  return {
    bindConfig,
    id,
    mergeEventsAndDasherizeKeys
  }
}
