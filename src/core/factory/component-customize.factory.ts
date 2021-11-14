import { watch, computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { FactoryService } from './../service/factory.service'
import { mergeEventsAndDasherizeKeys } from './core.factory'

export default function CustomizeComponentFactory(props: any, states: any) {
  /**
   * 随机生成20位数字的组件id,作为该组件的唯一标识,用于注销组件
   */
  const cid = ref(Math.floor(Math.random() * Math.pow(10, 20)).toString())
  /**
   * 组件名称，用于区分同一页面中多个相同组件
   */
  const id = computed(() => {
    return states.Config.value.name || ''
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
  watch(
    () => states.output.value,
    () => {
      register()
    },
    { immediate: true }
  )

  onMounted(() => {
    // register()
  })
  onBeforeUnmount(() => {
    logout()
  })
  return {
    id,
    mergeEventsAndDasherizeKeys
  }
}
