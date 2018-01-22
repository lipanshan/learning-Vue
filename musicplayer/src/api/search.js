import jsonp from 'common/js/jsonp'
import {options} from 'common/js/options'

export function getQueryInfo (song) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp'
  const opt = {
    ct: 24,
    qqmusic_ver: 1298,
    new_json: 1,
    remoteplace: 'txt.yqq.song',
    searchid: 62176948818373603,
    t: 0,
    aggr: 1,
    cr: 1,
    catZhida: 1,
    lossless: 0,
    flag_qc: 0,
    p: song.curPage,
    n: song.curNum,
    w: song.searchTxt,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  }
  const data = Object.assign({}, options, opt)
  return jsonp(url, data)
}
export function getHotSearchWords () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const opt = {
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  }
  const data = Object.assign({}, options, opt)
  return jsonp(url, data)
}
