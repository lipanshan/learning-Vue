import axios from 'axios'
import qs from 'qs'
import createSign from '../assets/createsign.js'
axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export function getData () {
  const time = new Date().getTime()
  const str = {
    service: 'App.SystemIndex.DataList',
    tips: time
  }
  return axios.post("/",qs.stringify({
    service: 'App.SystemIndex.DataList',
    sign: createSign(str),
    tips: time
  })).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getNetWordData () {
  const time = new Date().getTime()
  const str = {
    service: 'App.SystemIndex.NetWorkCardInfoListNow',
    tips: time
  }
  return axios.post("/",qs.stringify({
    service: 'App.SystemIndex.NetWorkCardInfoListNow',
    sign: createSign(str),
    tips: time
  })).then((res) => {
    return Promise.resolve(res.data)
  })
}
