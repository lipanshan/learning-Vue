export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}
export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: singers(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: musicData.strMediaMid
  })
}
export function searchCreateSong (musicData) {
  return new Song({
    id: musicData.id,
    mid: musicData.mid,
    singer: singers(musicData.singer),
    name: musicData.name,
    album: musicData.album.name,
    duration: musicData.interval,
    image: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`,
    url: musicData.file.strMediaMid
  })
}
function singers (arr) {
  if (!arr.length) {
    return ''
  }
  let str = ''
  arr.forEach((value) => {
    str += `| ${value.name} `
  })
  return str.substring(1)
}
