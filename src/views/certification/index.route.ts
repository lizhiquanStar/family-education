export default [
  {
    name: 'UserNotice',
    path: '/user-notice',
    meta: {
      unauthorized: true
    },
    component: () =>
      import(/* webpackChunkName: "user-notice" */ './user-notice')
  },
  {
    name: 'Error',
    path: '/error',
    meta: {
      unauthorized: true
    },
    component: () => import(/* webpackChunkName: "error" */ './error')
  },
  {
    name: 'Login',
    path: '/login',
    meta: {
      unauthorized: true
    },
    component: () => import(/* webpackChunkName: "login" */ './login')
  }
]
