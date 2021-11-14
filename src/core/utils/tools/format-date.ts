/**
 * 获取时间对应的文案
 * @param morning 早上开始时间
 * @param afternoon 下午结束时间
 * @returns 返回文本
 */
export const GetTimeText = (morning = 6, afternoon = 18) => {
  morning = Math.floor(Math.abs(morning))
  afternoon = Math.floor(Math.abs(afternoon))
  // 获取当前时间
  const timeNow = new Date()
  // 获取当前小时
  const hours = timeNow.getHours()
  // 设置默认文字
  let text = ''
  // 判断当前时间段
  if (hours > morning && hours <= 12) {
    text = '上午好'
  } else if (hours > 12 && hours <= afternoon) {
    text = '下午好'
  } else if (hours > afternoon || hours <= morning) {
    text = '晚上好'
  }
  return text
}
/**
 * DateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss') // 2019-1-1 00:00:00
 * DateFormat(new Date(), 'yyyy-MM-dd') // 2019-1-1
 * DateFormat(new Date(), 'hh:mm:ss') // 00:00:00
 * @param format 格式化方式
 * @returns 格式化后的数据
 */
export const FormatDate = (target: any, format = 'yyyy-MM-dd') => {
  if (!target) return '--'
  const date = new Date(target)
  let formatDate = ''
  const o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(format))
    formatDate = format.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      formatDate = formatDate.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? (o as any)[k]
          : ('00' + (o as any)[k]).substr(('' + (o as any)[k]).length)
      )
    }
  }
  return formatDate
}
// 计算相差天数
export const differDate = (end, start) => {
  const e = FormatDate(end)
  const s = FormatDate(start)
  const endTime =
    new Date(e).getTime() / 1000 -
    parseInt((new Date(s).getTime() / 1000).toString())
  const timeDay = parseInt((endTime / 60 / 60 / 24).toString())
  return timeDay ? timeDay : '0'
}
