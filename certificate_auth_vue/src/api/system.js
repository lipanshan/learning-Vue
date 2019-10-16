import axios from './axios'

export function GetExpireDays() {
  const time = new Date().getTime()
  const param = {
    service: 'App.SysSetting.GetExpireDays',
    tips: time
  }
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function submitData (data) {
  const time = new Date().getTime()
  const param = Object.assign({},{
    service: 'App.SysSetting.SetExpireDays',
    tips: time
  },data)
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}