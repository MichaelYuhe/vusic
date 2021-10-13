import { PLAY_MODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/util'

// 选择了要播放的歌曲列表，可能是歌单歌曲也可能是歌手歌曲
export function selectPlay({ commit }, { list, index }) {
    commit('setPlayMode', PLAY_MODE.sequence)
    commit('setSequenceList', list)
    commit('setPlayingState', true)
    commit('setFullScreen', true)
    commit('setPlayList', list)
    commit('setCurrentIndex', index)
}

// 选择了随机播放模式
export function randomPlay({ commit }, list) {
    commit('setPlayMode', PLAY_MODE.random)
    commit('setSequenceList', list)
    commit('setPlayingState', true)
    commit('setFullScreen', true)
    commit('setPlayList', shuffle(list))
    commit('setCurrentIndex', 0)
}

// 改变播放模式
export function changeMode({ commit, state, getters }, mode) {
    // 获取当前播放的歌曲
    const currentId = getters.currentSong.id
    if (mode === PLAY_MODE.random) {
        commit('setPlayList', shuffle(state.sequenceList))
    }
    else {
        commit('setPlayList', state.sequenceList)
    }
    // 播放列表改变，但不改变当前播放的歌曲，符合逻辑
    const index = state.playList.findIndex((song) => {
        return song.id === currentId
    })

    commit('setCurrentIndex', index)
    commit('setPlayMode', mode)
}

// 往某个list中添加歌曲
export function addSong() {

}

// 在某个list中删除歌曲
export function removeSong() {

}

// 清除某个list
export function clearList({ commit }) {
    commit('setPlayList', [])
    commit('setSequenceList', [])
    commit('setPlayingState', false)
    commit('setCurrentIndex', 0)
}

// 多次用到findIndex，将其封装方便使用
function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id
    })
}