export const LINK_TEXT = data => {
  data.customerName = data.customerName || '客户'
  const inviteInfo =
    data.inviteCodeStatus == 'unregister'
      ? `\n注册邀请码：【${data.inviteCode}】`
      : ''
  if (data.type == 'customerShare') {
    return `尊敬的${data.customerName}，你的顾问${data.plannerName}正在邀请你查看资产信息。${inviteInfo}\n查看链接：${data.url}`
  } else if (data.type == 'positionShare') {
    return `尊敬的${data.customerName}，你的顾问${data.plannerName}正在邀请你查看${data.productName}的资产详情。${inviteInfo} \n查看链接：${data.url}`
  }
}
