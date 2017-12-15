import jsonp from 'common/js/jsonp'
import {options} from 'common/js/options'

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
