<template>
  <div class="top-list" v-loading="loading">
    <Scroll class="top-list-content">
      <ul>
        <li
          class="item"
          v-for="item in topList"
          :key="item.id"
          @click="selectItem(item)"
        >
          <div class="icon">
            <img width="100" height="100" v-lazy="item.pic" />
          </div>
          <ul class="song-list">
            <li
              class="song"
              v-for="(song, index) in item.songList"
              :key="song.id"
            >
              <span> {{ index + 1 }}</span>
              <span>{{ song.songName }} --- {{ song.singerName }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </Scroll>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedTop" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getTopList } from "@/service/toplist";
import Scroll from "@/components/Base/Scroll/Scroll";
import storage from "good-storage";
import { TOP_KEY } from "@/assets/js/constant";

export default {
  name: "TopList",
  components: {
    Scroll,
  },
  data() {
    return {
      topList: [],
      loading: true,
      selectedTop: null,
    };
  },
  async created() {
    const res = await getTopList();
    this.topList = res.topList;
    this.loading = false;
  },
  methods: {
    selectItem(top) {
      this.selectedTop = top;
      this.cacheTop(top);
      this.$router.push({
        path: `/toplist/${top.id}`,
      });
    },
    cacheTop(top) {
      storage.session.set(TOP_KEY, top);
    },
  },
};
</script>

<style lang="scss" scoped>
.top-list {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .top-list-content {
    height: 100%;
    overflow: hidden;
    .item {
      display: flex;
      width: 90%;
      box-sizing: border-box;
      margin: 10px 20px;
      padding-top: 20px;
      height: 100px;
      border-radius: 80px;
      &:last-child {
        padding-bottom: 20px;
      }
      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }
      .song-list {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
        color: $color-text-d;
        font-size: $font-size-small;
        .song {
          @include no-wrap();
          line-height: 26px;
        }
      }
    }
  }
}
</style>
