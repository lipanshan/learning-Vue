import md5 from 'js-md5'
import qs from 'qs'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use(function <T extends AxiosConfigStick>(config: T): T {
  if (config.data && !config.data.sign) {
    const params = JSON.parse(JSON.stringify(config.data))
    const param = Object.assign({}, params, {
      sign: createSign(params)
    })
    config.data = qs.stringify(param)
  } else if (config.params && !config.params.sign) {
    const params = JSON.parse(JSON.stringify(config.params))
    const param = Object.assign({}, params, {
      sign: createSign(params)
    })
    config.params = param
  }
  return config
},
function (err: any): any {
  return Promise.reject(err)
})
axios.interceptors.response.use(function <T>(response: T): T {
  console.log(response)
  return response
},
function (err: any): any {
  return Promise.reject(err)
})

export default axios

export function createSign(data: any): any {
  const arr = []
  const keyArr = Object.keys(data)
  keyArr.sort()
  for (let v of keyArr) {
    arr.push(data[v])
  }
  return md5('' + arr.join('') + '')
}
