import originJsonp from 'jsonp'
import {opts} from 'common/js/options'

export default function jsonp (url, data, option) {
  return new Promise((resolve, reject) => {
    url += (url.indexOf('?') < 0 ? '?' : '&') + params(data)
    originJsonp(url, opts, (err, resp) => {
      if (!err) {
        resolve(resp)
      } else {
        reject(err)
      }
    })
  })
}
function params (data) {
  let url = ''
  for (let key in data) {
    data[key] = data[key] !== undefined ? data[key] : ''
    url += `&${key}=${encodeURIComponent(data[key])}`
  }
  return url ? url.substring(1) : ''
}
