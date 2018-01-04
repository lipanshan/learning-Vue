import axios from 'axios'
import jsonp from 'common/js/jsonp'
import {options} from 'common/js/options'
const SONG_NUM = 30

export function rankGroupList () {
  const url = '/getRankGroupList'
  let opt = {
    page: 'index',
    format: 'html',
    tpl: 'macv4',
    v8debug: 1
  }
  return axios.get(url, {
    params: opt
  }).then((res) => {
    let data = {code: 0, data: []}
    let result = res.data.match(/\[(.*)\]/g)
    let arr = JSON.parse(result[0])
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].List && arr[i].List.length) {
        data.data = data.data.concat(arr[i].List)
      }
    }
    return Promise.resolve(data)
  })
}
export function rankInfoList (selectRank) {
  var rankUrl = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  if (selectRank.topID === 201) {
    rankUrl = 'https://c.y.qq.com/mv/fcgi-bin/fcg_musicshow_mvtoplist.fcg'
  }
  const opt = {
    tpl: 3,
    page: 'detail',
    date: paddingEnd(selectRank.update_key),
    topid: selectRank.topID,
    type: formatType(selectRank.type),
    song_begin: 0,
    song_num: SONG_NUM,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    listtype: 'all',
    listid: 'all_musicshow_mvtoplist_current_new'
  }
  if (selectRank.topID === 52) {
    opt.date = opt.date.replace(/0$/, '1')
  }
  const data = Object.assign({}, options, opt)
  return jsonp(rankUrl, data)
}
function paddingEnd (str) {
  return /_0$/.test(str) ? str + '0' : str
}
function formatType (type) {
  return type === 0 ? 'top' : 'global'
}
