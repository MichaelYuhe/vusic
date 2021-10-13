<template>
  <div class="player">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img :src="currentSong.pic" />
      </div>
      <div class="top">
        <div class="back" @click="goBack">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">{{ currentSong.name }}</h1>
        <h2 class="subtitle">{{ currentSong.singer }}</h2>
      </div>
      <div class="medium"></div>
      <div class="bottom">
        <div class="progress-wrapper">
          <span class="time time-l">{{ formatTime(currentTime) }}</span>
          <div class="progress-bar-wrapper">
            <ProgressBar
              ref="barRef"
              :progress="progress"
              @progress-changing="progressChanging"
              @progress-changed="progressChanged"
            ></ProgressBar>
          </div>
          <span class="time time-r">{{
            formatTime(currentSong.duration)
          }}</span>
        </div>
        <div class="operators">
          <div class="icon i-left">
            <i :class="modeIcon" @click="changeMode"></i>
          </div>
          <div class="icon i-left" :class="disableClass">
            <i class="icon-prev" @click="prev"></i>
          </div>
          <div class="icon i-center" :class="disableClass">
            <i :class="playIcon" @click="togglePlay"></i>
          </div>
          <div class="icon i-right" :class="disableClass">
            <i class="icon-next" @click="next"></i>
          </div>
          <div class="icon i-right">
            <i
              :class="getFavoriteIcon(currentSong)"
              @click="toggleFavorite(currentSong)"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <audio
      ref="audioRef"
      @pause="pause"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="songEnd"
    ></audio>
  </div>
</template>

<script>
import { computed, watch, ref } from "vue";
import { useStore } from "vuex";
import useMode from "./useMode";
import useFavorite from "./useFavorite";
import ProgressBar from "./ProgressBar";
import { formatTime } from "@/assets/js/util";
import { PLAY_MODE } from "@/assets/js/constant";

export default {
  name: "Player",
  components: {
    ProgressBar,
  },
  setup() {
    // data
    const audioRef = ref(null);
    const songReady = ref(false);
    const currentTime = ref(0);
    let progressChangingFlag = false;

    // hooks
    const { modeIcon, changeMode } = useMode();
    const { getFavoriteIcon, toggleFavorite } = useFavorite();

    //vuex
    const store = useStore();
    const fullScreen = computed(() => store.state.fullScreen);
    const playList = computed(() => store.state.playList);
    const currentIndex = computed(() => store.state.currentIndex);
    const currentSong = computed(() => store.getters.currentSong);
    const playing = computed(() => store.state.playing);
    const playMode = computed(() => store.state.playMode);

    // computed
    const playIcon = computed(() => {
      return playing.value ? "icon-pause" : "icon-play";
    });
    const disableClass = computed(() => {
      return songReady.value ? "" : "disable";
    });
    const progress = computed(() => {
      return currentTime.value / currentSong.value.duration;
    });

    // watch
    watch(currentSong, (newSong) => {
      // 如果歌曲无法播放
      if (!newSong.id || !newSong.url) {
        return;
      }
      songReady.value = false;
      const audioElement = audioRef.value;
      audioElement.src = newSong.url;
      currentTime.value = 0;
      // 播放
      audioElement.play();
    });

    watch(playing, (newPlaying) => {
      if (!songReady.value) {
        return;
      }
      const audioElement = audioRef.value;
      newPlaying ? audioElement.play() : audioElement.pause();
    });

    // functions
    function goBack() {
      store.commit("setFullScreen", false);
    }

    function togglePlay() {
      if (!songReady.value) {
        return;
      }
      store.commit("setPlayingState", !playing.value);
    }

    function pause() {
      store.commit("setPlayingState", false);
    }

    function prev() {
      const list = playList.value;
      if (!list.length || !songReady.value) {
        return;
      }
      if (list.length === 1) {
        loop();
      } else {
        let index = currentIndex.value - 1;
        if (index === -1) {
          index = list.length - 1;
        }
        store.commit("setCurrentIndex", index);
        if (!playing.value) {
          store.commit("setPlayingState", true);
        }
      }
    }

    function next() {
      const list = playList.value;
      if (!list.length || !songReady.value) {
        return;
      }
      if (list.length === 1) {
        loop();
      } else {
        let index = currentIndex.value + 1;
        if (index === list.length) {
          index = 0;
        }
        store.commit("setCurrentIndex", index);
        if (!playing.value) {
          store.commit("setPlayingState", true);
        }
      }
    }

    function loop() {
      const audioElement = audioRef.value;
      audioElement.currentTime = 0;
      audioElement.play()
      store.commit('setPlayingState', true)
    }

    function ready() {
      if (songReady.value) {
        return;
      }
      songReady.value = true;
    }

    function error() {
      songReady.value = true;
    }

    function updateTime(e) {
      if (!progressChangingFlag) { // 如果正在改变进度，禁用updateTime方法
        currentTime.value = e.target.currentTime; 
      }
    }

    function progressChanging(progress) {
      progressChangingFlag = true; // 正在改变进度
      currentTime.value = currentSong.value.duration * progress;
    }

    function progressChanged(progress) {
      progressChangingFlag = false; // 进度改变结束
      audioRef.value.currentTime = currentTime.value =
        currentSong.value.duration * progress;
      if (!playing.value) {
        store.commit("setPlayingState", true);
      }
    }

    function songEnd() {
      currentTime.value = 0;
      if (playMode.value === PLAY_MODE.loop) {
        loop();
      } else {
        next();
      }
    }

    return {
      // main
      audioRef,
      currentTime,
      fullScreen,
      currentSong,
      playIcon,
      disableClass,
      progress,
      goBack,
      togglePlay,
      pause,
      prev,
      next,
      ready,
      error,
      updateTime,
      formatTime,
      progressChanging,
      progressChanged,
      songEnd,
      // useMode
      modeIcon,
      changeMode,
      // useFavorite
      getFavoriteIcon,
      toggleFavorite,
    };
  },
};
</script>

<style lang="scss" scoped>
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);

      img {
        width: 100%;
        height: 100%;
      }
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
      }
      .icon-back {
        display: block;
        padding: 9px;
        font-size: $font-size-large-x;
        color: $color-theme;
        transform: rotate(-90deg);
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          box-sizing: border-box;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 10px solid rgba(255, 255, 255, 0.1);
            }
            .playing {
              animation: rotate 20s linear infinite;
            }
          }
        }
        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;
          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }
      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
            &.current {
              color: $color-text;
            }
          }
          .pure-music {
            padding-top: 50%;
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;
          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 40px;
          line-height: 30px;
          width: 40px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-theme;
          &.disable {
            color: $color-theme-d;
          }
          i {
            font-size: 30px;
          }
        }
        .i-left {
          text-align: right;
        }
        .i-center {
          padding: 0 20px;
          text-align: center;
          i {
            font-size: 40px;
          }
        }
        .i-right {
          text-align: left;
        }
        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.6s;
      .top,
      .bottom {
        transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
      }
    }
    &.normal-enter-from,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
}
</style>
