<template>
  <div class="loading">
    <div class="loading-content">
      <img width="24" height="24" src="@/assets/images/loading.gif" />
      <p class="desc">{{ title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data() {
      return {
          title: 'Loading'
      }
  },
};
</script>

<style lang="scss" scoped>
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    .loading-content {
      text-align: center;
      .desc {
        line-height: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
      }
    }
  }
</style>
