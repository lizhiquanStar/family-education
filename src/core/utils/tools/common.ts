// 截取路径中的参数
export const getUrlParam = name => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const url = window.location.href.split('#')[0]
  const search = url.split('?')[1]
  if (search) {
    const r = search.substr(0).match(reg)
    if (r !== null) return unescape(r[2])
    return null
  } else return null
}
