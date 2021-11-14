export default [
  {
    name: 'UserDetail',
    path: '/user-detail',
    meta: {
      name: '详情'
    },
    component: () =>
      import(/* webpackChunkName: "user-detail" */ './user-detail')
  },
  {
    name: 'Home',
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ './home')
  }
]
