import md5 from 'js-md5'
export default function createSign (data) {
  const arr = []
  const keyArr = Object.keys(data)
  keyArr.sort()
  for (let v of keyArr) {
    arr.push(data[v])
  }
  return md5("" + arr.join('') +"")
}
