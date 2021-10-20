<template>
  <div class="singer" v-loading="!singers.length">
    <IndexList :data="singers" @select="selectSinger"></IndexList>
  </div>
  <router-view v-slot="{ Component }">
    <transition appear name="slide">
      <component :is="Component" :data="selectedSinger" />
    </transition>
  </router-view>
</template>

<script>
import { getSingerList } from "@/service/singer";
import IndexList from "@/components/Base/IndexList/IndexList";
import storage from "good-storage";
import { SINGER_KEY } from "@/assets/js/constant";

export default {
  name: "Singer",
  data() {
    return {
      singers: [],
      selectedSinger: null,
    };
  },
  components: {
    IndexList,
  },
  methods: {
    selectSinger(singer) {
      this.selectedSinger = singer;
      // 存储singer
      this.cacheSinger(singer);
      // 跳转到歌手路由
      this.$router.push(`/singer/${singer.mid}`);
    },
    cacheSinger(singer) {
      storage.session.set(SINGER_KEY, singer);
    },
  },
  async created() {
    const res = await getSingerList();
    this.singers = res.singers;
    console.log(res)
  },
};
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
