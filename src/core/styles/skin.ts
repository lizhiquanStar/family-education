import { store } from '@/store'
export function GetSkin() {
  const themeVars = {
    sliderActiveBackgroundColor: store.state.color || '#1989fa',
    buttonPrimaryBorderColor: store.state.color || '#1989fa',
    buttonPrimaryBackgroundColor: store.state.color || '#1989fa'
  }
  return {
    themeVars
  }
}
