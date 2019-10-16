import md5 from 'js-md5'
export function getSign (data) {
  const arr = []
  const keyArr = Object.keys(data)
  keyArr.sort()
  for (let v of keyArr) {
    arr.push(data[v])
  }
  return md5("" + arr.join('') +"")
}

export function debounce(method, dely) {
  //防抖
  let timer = null
  return function () {
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      method.apply(this, args)
    }, dely * Math.pow(10, 3))
  }
}

export function throttle(method, dely) {
  //节流
  let start = new Date()
  let first = true
  return function fn() {
    const nowTime = new Date()
    if (nowTime - start > dely * Math.pow(10, 3) || first) {
      method.apply(this, arguments)
      start = new Date().getTime()
      first = false
    }
  }
}

export function counter(method, num) {
  let timer = null
  function fn(method) {
    if (num >= 0) {
      timer = setTimeout(() => {
        method()
        fn(method)
      }, 1000)
    } else {
      clearTimeout(timer)
    }
    num--
  }
  fn(method)
}
