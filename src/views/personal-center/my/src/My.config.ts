export const userItem = {
  student: [
    {
      title: '基本资料',
      icon: 'label-o',
      url: 'BaseInfo'
    },
    {
      title: '身份信息',
      icon: 'idcard',
      url: 'IdentityInfo',
      class: 'border-non'
    },
    {
      title: '我的发布',
      icon: 'font-o',
      url: 'Publish'
    },
    {
      title: '我的订单',
      icon: 'coupon-o',
      url: 'OrderList'
    }
  ],
  teacher: [
    {
      title: '基本资料',
      icon: 'label-o',
      url: 'BaseInfo'
    },
    {
      title: '身份信息',
      icon: 'idcard',
      url: 'IdentityInfo'
    },
    {
      title: '教师资格证',
      icon: 'certificate',
      class: 'border-non',
      url: 'TeacherInfo'
    },
    {
      title: '我的发布',
      icon: 'font-o',
      url: 'Publish'
    },
    {
      title: '我的课程',
      icon: 'records',
      url: 'MyCourses'
    },
    {
      title: '我的结算',
      icon: 'balance-list-o',
      url: 'MySettlement'
    },
    {
      title: '我的押金',
      icon: 'refund-o',
      url: 'MyDeposit'
    }
  ]
}
export function PpsMyConfig() {
  return {}
}
