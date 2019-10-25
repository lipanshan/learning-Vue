import axios from 'axios'
import qs from 'qs'
import createSign from '../assets/createsign.js'
axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export function getNetworkInfo () {
  const time = new Date().getTime()
  const str = {
    service: 'App.NetworkSetting.NetCardInfoList',
    tips: time
  }
  return axios.post('/', qs.stringify({
    service: 'App.NetworkSetting.NetCardInfoList',
    sign: createSign(str),
    tips: time
  })).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function submitForm (data) {
  const time = new Date().getTime()
  const str = Object.assign({}, {
    service: 'App.NetworkSetting.NetCardEdit',
    tips: time
  },data)
  const params = Object.assign({}, {
    service: 'App.NetworkSetting.NetCardEdit',
    sign: createSign(str),
    tips: time
  }, data)
  return axios.post('/', qs.stringify(params)).then((res) => {
    return Promise.resolve(res.data)
  })
}
