import { PLAY_MODE, FAVORITE_KEY } from "../assets/js/constant"
import { load } from "../assets/js/array_store"

const state = {
    sequenceList: [],
    playList: [], // 当前播放列表
    playing: false,
    playMode: PLAY_MODE.sequence, // 播放模式，默认顺序播放
    currentIndex: 0,
    fullScreen: false, //  是否全屏展开
    favoriteList: load(FAVORITE_KEY), 
    myLists: [],
}

export default state