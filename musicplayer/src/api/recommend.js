import jsonp from 'common/js/jsonp'
import {options} from 'common/js/options'
import axios from 'axios'

export function recommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  return jsonp(url, options)
}

export function hotRecommend () {
  const hotUrl = '/hotrecommendlist'
  const opt = {
    picmid: 1,
    rnd: Math.random(),
    loginUin: 0,
    inCharset: 'utf8',
    hostUin: 0,
    format: 'json',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29
  }
  const data = Object.assign({}, options, opt)
  return axios.get(hotUrl, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
