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
