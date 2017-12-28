import jsonp from 'common/js/jsonp'
import {options} from 'common/js/options'
import axios from 'axios'
const songNumber = 10
export function getSingerList (pageNum) {
  const urls = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  pageNum = pageNum | 1
  const opt = {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 1000,
    pagenum: pageNum,
    loginUin: 0,
    hostUin: 0,
    notice: 0,
    needNewCode: 0
  }
  const data = Object.assign({}, options, opt)
  return jsonp(urls, data)
}
export function getSingerInfo (id) {
  const urls = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const opt = {
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: id,
    order: 'listen',
    begin: 0,
    num: songNumber,
    songstatus: 1
  }
  const data = Object.assign({}, options, opt)
  return jsonp(urls, data)
}
export function getSongPlayUrl (singMid, songUrl) {
  let urls = '/getVkey'
  const opt = {
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    songmid: singMid,
    filename: `C400${songUrl}.m4a`,
    guid: '541193902'
  }
  const data = Object.assign({}, options, opt)
  return axios.get(urls, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}
