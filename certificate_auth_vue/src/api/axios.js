import axios from 'axios'
import qs from 'qs'
import md5 from 'js-md5'
import router from '@/router'

axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  //使用FormData 已经序列化，无法签名 直接返回
  if (Object.prototype.toString.call(config.data) === '[object FormData]') {
    return config
  }
  //upload file not need sign field, use FormData object upload
  if (config.data && config.data.file) {
    config.data.sign = createSign({
      service: config.data.service,
      tips: config.data.tips
    })
    const forData = new FormData()
    forData.append('service', config.data.service)
    forData.append('file', config.data.file)
    forData.append('tips', config.data.tips)
    forData.append('sign', config.data.sign)
    config.data = forData
    return config
  }
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
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  errorStatus(response.data.ret)
  return response
})

export default axios

export function createSign (data) {
  const arr = []
  const keyArr = Object.keys(data)
  keyArr.sort()
  for (let v of keyArr) {
    arr.push(data[v])
  }
  return md5("" + arr.join('') +"")
}

function errorStatus (statusCode) {
  switch (statusCode) {
    case 400:
      console.log('错误请求')
      break;
    case 401:
      console.log('数据验证未通过')
      break;
    case 403:
      console.log('拒绝访问')
      break;
    case 404:
      console.log('请求错误,未找到该资源')
      // router.push('/about')
      break;
    case 405:
      console.log('请求方法未允许')
      break;
    case 408:
      console.log('请求超时')
      break;
    case 499:
      // console.log('未登录') //查询页面未登录也可访问
      router.push('/login')
      window.localStorage.removeItem('AuthenticationUsername')
      window.localStorage.removeItem('AuthenticationaAvatar')
      break;
    case 500:
      console.log('服务器端出错')
      break;
    case 501:
      console.log('网络未实现')
      break;
    case 502:
      console.log('网络错误')
      break;
    case 503:
      console.log('服务不可用')
      break;
    case 504:
      console.log('网络超时')
      break;
    case 505:
      console.log('http版本不支持该请求')
      break;
    default:
      // console.log(`连接错误${statusCode}`)
  }
}