import axios from './axios'

export function queryCer (data = {}) {
  const time = new Date().getTime()
  const param = Object.assign({
    service: 'App.CerSearch.SearchCerInfo',
    tips: time
  }, data)
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}