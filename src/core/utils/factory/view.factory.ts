import kebabCase from 'lodash/kebabCase'
/**
 * @param listeners
 * @param ignoreEventNames
 */
export const mergeEventsAndDasherizeKeys = (
  listeners: ({ [k: string]: any } | undefined)[],
  ignoreEventNames?: string[]
) => {
  const target: { [k: string]: any } = {}
  for (const key in listeners) {
    const argFun = listeners[key]
    if (target[key] && typeof target[key] === 'function') {
      target[key] = [target[key], argFun]
    } else if (
      target[key] &&
      Reflect.toString.call(target[key]) === '[object Array]'
    ) {
      target[key] = [...target[key], argFun]
    } else {
      target[key] = argFun
    }
  }
  if (ignoreEventNames) {
    ignoreEventNames
      .map(event => kebabCase(event))
      .forEach(event => {
        Reflect.deleteProperty(target, event)
      })
  }
  return target
}
