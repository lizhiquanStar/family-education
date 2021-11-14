export default [
  {
    name: 'AppointedTime',
    path: '/appointed-time',
    meta: {
      name: '约定时间'
    },
    component: () =>
      import(/* webpackChunkName: "appointed-time" */ './appointed-time')
  },
  {
    name: 'Evaluation',
    path: '/evaluation',
    meta: {
      name: '评价'
    },
    component: () => import(/* webpackChunkName: "evaluation" */ './evaluation')
  },
  {
    name: 'StudentCourses',
    path: '/student-courses',
    meta: {
      name: '课程详情'
    },
    component: () =>
      import(/* webpackChunkName: "student-courses" */ './student-courses')
  },
  {
    name: 'EditPublish',
    path: '/edit-publish',
    meta: {
      name: '编辑发布'
    },
    component: () =>
      import(/* webpackChunkName: "edit-publish" */ './edit-publish')
  },
  {
    name: 'Publish',
    path: '/publish',
    meta: {
      name: '发布'
    },
    component: () => import(/* webpackChunkName: "publish" */ './publish')
  },
  {
    name: 'EditTeacher',
    path: '/edit-teacher',
    meta: {
      name: '编辑信息'
    },
    component: () =>
      import(/* webpackChunkName: "edit-teacher" */ './edit-teacher')
  },
  {
    name: 'MyCourses',
    path: '/my-courses',
    meta: {
      name: '我的课程'
    },
    component: () => import(/* webpackChunkName: "my-courses" */ './my-courses')
  },
  {
    name: 'MySettlement',
    path: '/my-settlement',
    meta: {
      name: '我的结算'
    },
    component: () =>
      import(/* webpackChunkName: "my-settlement" */ './my-settlement')
  },
  {
    name: 'MyDeposit',
    path: '/my-deposit',
    meta: {
      name: '我的押金'
    },
    component: () => import(/* webpackChunkName: "my-deposit" */ './my-deposit')
  },
  {
    name: 'TeacherInfo',
    path: '/teacher-info',
    meta: {
      name: '教师资格证'
    },
    component: () =>
      import(/* webpackChunkName: "teacher-info" */ './teacher-info')
  },
  {
    name: 'EditIdentity',
    path: '/edit-identity',
    meta: {
      name: '编辑身份信息'
    },
    component: () =>
      import(/* webpackChunkName: "edit-identity" */ './edit-identity')
  },
  {
    name: 'IdentityInfo',
    path: '/identity-info',
    meta: {
      name: '身份信息'
    },
    component: () =>
      import(/* webpackChunkName: "identity-info" */ './identity-info')
  },
  {
    name: 'EditBaseInfo',
    path: '/edit-base-info',
    meta: {
      name: '编辑资料'
    },
    component: () =>
      import(/* webpackChunkName: "edit-base-info" */ './edit-base-info')
  },
  {
    name: 'BaseInfo',
    path: '/base-info',
    meta: {
      name: '基本资料'
    },
    component: () => import(/* webpackChunkName: "base-info" */ './base-info')
  },
  {
    name: 'OrderList',
    path: '/order-list',
    meta: {
      name: '订单列表'
    },
    component: () => import(/* webpackChunkName: "order-list" */ './order-list')
  },
  {
    name: 'My',
    path: '/my',
    component: () => import(/* webpackChunkName: "my" */ './my')
  }
]
