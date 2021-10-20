<template>
  <div class="singer-detail">
    <MusicList :songs="songs" :title="title" :pic="pic" :loading="loading">
    </MusicList>
  </div>
</template>

<script>
import { getSingerDetail } from "@/service/singer";
import createComponentDetail from '@/assets/js/createComponentDetail'
import { SINGER_KEY } from "@/assets/js/constant";

export default createComponentDetail('SingerDetail', getSingerDetail, SINGER_KEY)
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