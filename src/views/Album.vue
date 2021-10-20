<template>
  <div class="album">
    <music-list
      :songs="songs"
      :title="title"
      :pic="pic"
      :loading="loading"
    ></music-list>
  </div>
</template>

<script>
import createComponentDetail from "@/assets/js/createComponentDetail";
import { ALBUM_KEY } from "@/assets/js/constant";
import { getAlbum } from "@/service/recommend";

export default createComponentDetail("Album", getAlbum, ALBUM_KEY);
</script>

<style lang="scss" scoped>
.album {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>