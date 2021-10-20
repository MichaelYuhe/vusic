<template>
  <div class="top-detail">
    <MusicList :songs="songs" :title="title" :pic="pic" :loading="loading">
    </MusicList>
  </div>
</template>

<script>
import { getTopDetail } from "@/service/toplist";
import createComponentDetail from "@/assets/js/createComponentDetail";
import { TOP_KEY } from "@/assets/js/constant";


export default createComponentDetail("TopDetail", getTopDetail, TOP_KEY);
</script>

<style lang="scss" scoped>
.top-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>