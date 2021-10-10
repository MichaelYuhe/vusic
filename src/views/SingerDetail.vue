<template>
  <div class="singer-detail">
    <MusicList :songs="songs" :title="title" :pic="pic" :loading="loading">
    </MusicList>
  </div>
</template>

<script>
import { getSingerDetail } from "@/service/singer";
import { processSongs } from "@/service/song";
import MusicList from "@/components/MusicList/MusicList";
import storage from "good-storage";
import { SINGER_KEY } from "@/assets/js/constant";

export default {
  name: "SingerDetail",
  props: {
    singer: Object,
  },
  components: {
    MusicList,
  },
  data() {
    return {
      songs: [],
      loading: true,
    };
  },
  computed: {
    // 获取当前歌手
    computedSinger() {
      let res = null;
      const singer = this.singer;
      // 如果是从歌手列表页进入，则歌手有相应的值
      if (singer) {
        res = singer;
      }
      // 如果是歌手详情页刷新，则从session中拿取当前歌手的值
      else {
        const cachedSinger = storage.session.get(SINGER_KEY);
        // 如果路径正确
        if (cachedSinger && cachedSinger.mid === this.$route.params.id) {
          res = cachedSinger;
        }
      }
      return res;
    },
    title() {
      const computedSinger = this.computedSinger;
      return computedSinger && computedSinger.name;
    },
    pic() {
      const computedSinger = this.computedSinger;
      return computedSinger && computedSinger.pic;
    },
  },
  async created() {
    // 如果computedSinger返回一个null，也就是没有拿到歌手值，回退
    if (!this.computedSinger) {
      const path = this.$route.matched[0].path;
      this.$router.push(path);
      return;
    }
    const res = await getSingerDetail(this.computedSinger);
    this.songs = await processSongs(res.songs);
    this.loading = false;
    console.log(this.songs)
  },
};
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>