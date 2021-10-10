import { get } from "./base"

export function processSongs(songs) {
    if (!songs.length) {
      return Promise.resolve(songs) // 没有歌曲
    }
  
    return get('/api/getSongsUrl', {
      mid: songs.map((song) => {
        return song.mid // 映射到mid
      })
    }).then((result) => {
      const map = result.map
      return songs.map((song) => {
        song.url = map[song.mid] // url获取
        return song
      }).filter((song) => {
        return song.url && song.url.indexOf('vkey') > -1 // 只留下能播放的
      })
    })
  }