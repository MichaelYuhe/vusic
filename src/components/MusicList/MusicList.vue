<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <i class="fas fa-angle-left"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <div class="filter" :style="filterStyle"></div>
    </div>
    <Scroll
      class="list"
      :probe-type="3"
      @scroll="onScroll"
      :style="scrollStyle"
      v-loading="loading"
      v-no-result="noResult"
    >
      <div class="song-list-wrapper">
        <SongList :songs="songs" @select-song="selectSong"></SongList>
      </div>
    </Scroll>
  </div>
</template>

<script>
import SongList from "@/components/Base/SongList/SongList";
import Scroll from "@/components/Base/Scroll/Scroll";
import { mapActions, mapState } from "vuex";
const HEADER_HEIGHT = 40;

export default {
  name: "MusicList",
  components: {
    SongList,
    Scroll,
  },
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
    title: String,
    pic: String,
    loading: Boolean,
  },
  data() {
    return {
      imageHeight: 0,
      scrollY: 0,
      maxTranslateY: 0,
    };
  },
  computed: {
    noResult() {
      !this.loading && !this.songs.length;
    },
    playBtnStyle() {
      let display = "";
      // 拖动隐藏
      if (this.scrollY >= this.maxTranslateY) {
        display = "none";
      }
      return {
        display,
      };
    },
    bgImageStyle() {
      const scrollY = this.scrollY;
      let zIndex = 0;
      let paddingTop = "70%";
      let height = 0;
      let translateZ = 0;

      // 限定向上最大值
      if (scrollY > this.maxTranslateY) {
        zIndex = 10;
        paddingTop = 0;
        height = `${HEADER_HEIGHT}px`;
        translateZ = 1;
      }

      // 向下拖动缩放
      let scale = 1;
      if (scrollY < 0) {
        scale = 1 + Math.abs(scrollY / this.imageHeight);
      }

      return {
        zIndex,
        paddingTop,
        height,
        backgroundImage: `url(${this.pic})`,
        transform: `scale(${scale})translateZ(${translateZ}px)`,
      };
    },

    scrollStyle() {
      return {
        top: `${this.imageHeight}px`,
      };
    },

    filterStyle() {
      let blur = 0;
      const scrollY = this.scrollY;
      const imageHeight = this.imageHeight;
      if (scrollY >= 0) {
        blur =
          Math.min(this.maxTranslateY / imageHeight, scrollY / imageHeight) *
          20;
      }
      return {
        backdropFilter: `blur(${blur}px)`,
      };
    },
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    onScroll(pos) {
      this.scrollY = -pos.y;
    },
    selectSong({ song, index }) {
      // console.log(song)
      // console.log(this.songs)
      // console.log(index)
      this.selectPlay({
        list: this.songs,
        index,
      });
    },
    random() {
      this.randomPlay(this.songs);
    },
    ...mapActions(["selectPlay", "randomPlay"]),
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
    this.maxTranslateY = this.imageHeight - HEADER_HEIGHT;
  },
};
</script>

<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    top: 0;
    left: 3px;
    z-index: 20;
    transform: translateZ(2px);
    .fa-angle-left {
      display: block;
      padding: 8px;
      font-size: 30px;
      color: black;
      font-weight: bold;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: black;
  }
  .bg-image {
    position: relative;
    // top: 30px;
    width: 87%;
    margin: 0 auto;
    // margin-top: 10px;
    border-radius: 30px;
    transform-origin: top;
    background-size: cover;
    height: 0;
    padding-top: 70%;

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      // background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>