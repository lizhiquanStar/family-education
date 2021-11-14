// 用户验证码状态
export enum CAPTCHA_STATUS {
  register = 1, // 注册
  identity, // 身份验证
  loginConfirm, // 登录确认
  loginAbnormal, // 登录异常
  changePass, // 修改密码
  infoChange // 信息变更
}
// 用户类型
export enum USER_TYPE {
  student = 1,
  teacher
}

// 用户订单状态
export const USER_ORDER_STATUS = {
  1: {
    color: 'warning',
    label: '待支付'
  },
  2: {
    color: 'success',
    label: '已支付'
  },
  3: {
    color: 'info',
    label: '已取消'
  },
  4: {
    color: 'warning',
    label: '审核中'
  },
  5: {
    color: 'warning',
    label: '退款中'
  },
  6: {
    color: 'warning',
    label: '服务中'
  },
  7: {
    color: 'info',
    label: '已完成'
  }
}

// 用户订单状态
export const COURSES_ORDER_STATUS = {
  1: {
    color: 'warning',
    label: '待服务'
  },
  2: {
    color: 'warning',
    label: '服务中'
  },
  3: {
    color: 'success',
    label: '已完成'
  }
}

// 用户订单状态枚举
export enum USER_STATUS_ENUM {
  waitingPay = 1, // 待支付
  paid, // 已支付
  cancelled, // 已取消
  underReview, // 审核中
  refunding, // 退款中
  serving, // 服务中
  completed // 已完成
}

// 用户课程状态枚举
export enum COURSES_STATUS_ENUM {
  toBeServe = 1, // 待服务
  serving, // 服务中
  completed
}
