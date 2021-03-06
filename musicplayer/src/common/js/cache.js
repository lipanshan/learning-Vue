import storage from 'good-storage'
const FAVORITE_NUM = 200
const SEARCH_WORLD = 20
const favorite = '__favorite__'
const word = '__word__'
const song = '__song__'
export function saveSearchHistory (item) {
  if (!storage.has(word)) {
    let wordlList = [item]
    storage.set(word, JSON.stringify(wordlList))
    return wordlList
  }
  let wordlList = JSON.parse(storage.get(word))
  let len = wordlList.length
  for (let i = 0; i < len; i++) {
    if (wordlList[i] === item) {
      wordlList.splice(i, 1)
    }
  }
  wordlList.unshift(item)
  if (wordlList.length > SEARCH_WORLD) {
    wordlList.pop()
  }
  storage.set(word, JSON.stringify(wordlList))
  return wordlList
}
export function deleteSearchHistory (item) {
  if (!storage.has(word)) { return [] }
  let worldList = JSON.parse(storage.get(word))
  for (let i = 0; i < worldList.length; i++) {
    if (worldList[i] === item) {
      worldList.splice(i, 1)
      storage.set(word, JSON.stringify(worldList))
      return worldList
    }
  }
}
export function loadWorld () {
  if (!storage.has(word)) { return [] }
  return JSON.parse(storage.get(word))
}
export function saveFavorite (song) {
  if (!storage.has(favorite)) {
    let songList = [song]
    storage.set(favorite, JSON.stringify(songList))
    return songList
  }
  let songList = JSON.parse(storage.get(favorite))
  songList.push(song)
  if (songList.length > FAVORITE_NUM) {
    songList.shift()
  }
  storage.set(favorite, JSON.stringify(songList))
  return songList
}
export function deleteFavorite (song) {
  if (!storage.has(favorite)) { return [] }
  let songList = JSON.parse(storage.get(favorite))
  let len = songList.length
  for (let i = 0; i < len; i++) {
    if (songList[i].id === song.id) {
      songList.splice(i, 1)
      storage.set(favorite, JSON.stringify(songList))
      return songList
    }
  }
}
export function loadFavorite () {
  if (!storage.has(favorite)) { return [] }
  return JSON.parse(storage.get(favorite))
}
export function saveHistorySong (item) {
  if (!storage.has(song)) {
    let songlList = [item]
    storage.set(song, JSON.stringify(songlList))
    return songlList
  }
  let songlList = JSON.parse(storage.get(song))
  for (let i = 0; i < songlList.length; i++) {
    if (songlList[i].id === item.id) {
      songlList.splice(i, 1)
    }
  }
  songlList.unshift(item)
  if (songlList.length > SEARCH_WORLD) {
    songlList.pop()
  }
  storage.set(song, JSON.stringify(songlList))
  return songlList
}
export function deleteHistorySong (item) {
  if (!storage.has(song)) {
    storage.set(song, [])
    return []
  }
  let songList = JSON.parse(storage.get(song))
  for (let i = 0; i < songList.length; i++) {
    if (songList[i].id === item.id) {
      songList.splice(i, 1)
      storage.set(song, JSON.stringify(songList))
      return songList
    }
  }
}
export function loadHistorySong () {
  if (!storage.has(song)) { return [] }
  return JSON.parse(storage.get(song))
}
export function deleteAllSearchHistory () {
  storage.set(word, JSON.stringify([]))
  return []
}
