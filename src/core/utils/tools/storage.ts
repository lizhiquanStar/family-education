export function getStorageItem(key: string) {
  let data: any = localStorage.getItem(key)
  try {
    data = JSON.parse(data)
  } catch (error) {
    return data
  }
  return data
}

export function setStorageItem(key: string, data: any) {
  if (typeof data !== 'string') {
    try {
      data = JSON.stringify(data)
    } catch (error) {
      console.error(error, data)
    }
  }
  localStorage.setItem(key, data)
}
export function removeStorageItem(key: string) {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.warn(error)
  }
}
