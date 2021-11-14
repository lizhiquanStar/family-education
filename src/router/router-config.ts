import router from './router'
import { store } from '../store'
/**
 * 对于非必须进行 token 校验的则放行，token 失效则跳转登录页面
 */
router.beforeEach(async (to, from, next) => {
  if (to.path == '/login') {
    store.commit('clearUser')
  }
  if (!to.meta.unauthorized && !store.state.token) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

export { router }
