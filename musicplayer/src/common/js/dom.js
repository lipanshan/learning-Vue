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
  el.className = arr.join('')
}
