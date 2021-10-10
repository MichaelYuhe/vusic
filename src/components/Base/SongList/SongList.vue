<template>
  <ul class="song-list">
    <li
      class="item"
      v-for="(song, index) in songs"
      :key="song.id"
      @click="selectSong(song, index)"
    >
      <img v-lazy="song.pic" class="song-image" />
      <h2 class="name">{{ song.name }}</h2>
    </li>
  </ul>
</template>

<script>
export default {
  name: "SongList",
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  emits: ['select-song'],
  methods: {
    // getDesc(song) {
    //     return `${song.singer}·${song.album}`
    // }
    selectSong(song, index) {
      this.$emit("select-song", {song, index});
    },
  },
};
</script>

<style lang="scss" scoped>
.song-list {
  .item {
    padding: 5px 20px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;
    margin: 10px 0;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    //   .rank {
    //     flex: 0 0 25px;
    //     width: 25px;
    //     margin-right: 20px;
    //     text-align: center;
    //     .icon {
    //       display: inline-block;
    //       width: 25px;
    //       height: 24px;
    //       background-size: 25px 24px;
    //     //   &.icon0 {
    //     //     @include bg-image('first');
    //     //   }
    //     //   &.icon1 {
    //     //     @include bg-image('second');
    //     //   }
    //     //   &.icon2 {
    //     //     @include bg-image('third');
    //     //   }
    //     }
    //     .text {
    //       color: $color-theme;
    //       font-size: $font-size-large;
    //     }
    //   }
    .name {
      // @include no-wrap();
      color: $color-text;
    }
    .song-image {
      // @include no-wrap();
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 40px;
    }
    // .content {
    //   flex: 1;
    //   line-height: 20px;
    //   // overflow: hidden;
    // }
  }
  :first-child {
    margin-top: -5px;
  }
}
</style>