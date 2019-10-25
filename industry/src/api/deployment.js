import axios from 'axios'
import qs from 'qs'
import createSign from '../assets/createsign.js'
axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export function getInfo () {
  const time = new Date().getTime()
  const str = {
    service: 'App.DeploymentSetting.DeployList',
    tips: time
  }
  return axios.post("/",qs.stringify(Object.assign({}, str, {
    sign: createSign(str)
  }))).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function submitForm (params = {}) {
  const time = new Date().getTime()
  const str = Object.assign({}, params, {
    service: 'App.DeploymentSetting.DeployChiose',
    tips: time
  })
  return axios.post("/",qs.stringify(Object.assign({}, str, {
    sign: createSign(str)
  }))).then((res) => {
    return Promise.resolve(res.data)
  })
}
