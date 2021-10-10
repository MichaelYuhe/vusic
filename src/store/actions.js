import { PLAY_MODE } from '@/assets/js/constant'

export function selectPlay({ commit }, { list, index }) {
    commit('setPlayingState', true)
    commit('setSequenceList', list)
    commit('setPlaylist', list)
    commit('setPlayMode', PLAY_MODE.sequence)
    commit('setCurrentIndex', index)
    commit('setFullScreen', true)
}