export function randowArray (list) {
  let arr = list.slice(0)
  for (let i = 0; i < arr.length; i++) {
    let num = getRandomNum(0, arr.length - 1)
    let j = arr[i]
    arr[i] = arr[num]
    arr[num] = j
  }
  return arr
}
export function findIndex (list, item) {
  return list.findIndex((val) => {
    return val.id === item.id
  })
}

function getRandomNum (min, max) {
  return Math.floor(Math.random() * (max - min) + 1)
}
