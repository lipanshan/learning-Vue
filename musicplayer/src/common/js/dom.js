export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let arr = el.className.split(' ')
  arr.push(className)
  el.className = arr.join(' ')
}
export function hasClass (el, className) {
  let reg = new RegExp(`(^|\\s)${className}(\\s|$)`)
  return reg.test(el.className)
}
export function removeClass (el, className) {
  if (!hasClass(el, className)) {
    return
  }
  let arr = el.className.split(className)
  arr[0] = arr[0].trim()
  arr[1] = arr[1].trim()
  el.className = arr.join('')
}
let elemStyle = document.createElement('div').style
let vender = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    ms: 'msTransform',
    o: 'oTransform',
    moz: 'mozTransform',
    stander: 'stander'
  }
  for (let key in transformNames) {
    if (elemStyle[transformNames[key]] !== undefined) {
      return key
    }
    return false
  }
})()
export function prefixStyle (str) {
  if (!vender) {
    return
  }
  if (vender === 'stander') {
    return str
  }
  return vender + str.charAt(0).toUpperCase() + str.substring(1)
}
