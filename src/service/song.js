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

// 缓存已经获取到的歌词
const lyricMap = {}

export function getLyric(song) {
  if (song.lyric) {
    return Promise.resolve(song.lyric) // 歌词已经存在，不需要再发送请求
  }
  const mid = song.mid
  const lyric = lyricMap[mid]
  if (lyric) {
    return Promise.resolve(lyric) // 歌词已经存在，不需要再发送请求
  }

  return get('/api/getLyric', {
    mid
  }).then((result) => {
    const lyric = result ? result.lyric : '[00:00:00]该歌曲暂时无法获取歌词'
    lyricMap[mid] = lyric
    return lyric
  })
}
