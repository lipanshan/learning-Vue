import axios from 'axios'
import qs from 'qs'
import createSign from '../assets/createsign.js'
axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export function setReset () {
  const time = new Date().getTime()
  const str = {
    service: 'App.SystemSetting.Initialization',
    tips: time
  }
  return axios.post('/', qs.stringify({
    service: 'App.SystemSetting.Initialization',
    sign: createSign(str),
    tips: time
  })).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function setRestart () {
  const time = new Date().getTime()
  const str = {
    service: 'App.SystemSetting.Restart',
    tips: time
  }
  return axios.post('/', qs.stringify({
    service: 'App.SystemSetting.Restart',
    sign: createSign(str),
    tips: time
  })).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function setResttime (data) {
  const time = new Date().getTime()
  const str = Object.assign({}, {
    service: 'App.SystemSetting.RestTime',
    tips: time
  }, data)
  const params = Object.assign({}, {
    service: 'App.SystemSetting.RestTime',
    sign: createSign(str),
    tips: time
  }, data)
  return axios.post('/', qs.stringify(params)).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getTimeList () {
  const time = new Date().getTime()
  const str = {
    service: 'App.SystemSetting.TimeInfoList',
    tips: time
  }
  const str2 = {
    service: 'App.SystemSetting.OperationLog',
    tips: time
  }
  const p1 = axios.post('/', qs.stringify({
    service: 'App.SystemSetting.TimeInfoList',
    sign: createSign(str),
    tips: time
  }))
  const p2 = axios.post('/', qs.stringify({
    service: 'App.SystemSetting.OperationLog',
    sign: createSign(str2),
    tips: time
  }))
  return Promise.all([p1, p2]).then((res) => {
    const data = Object.assign({}, res[0].data, {
      initTime: res[1].data
    })
    return Promise.resolve(data)
  })
}

