<template>
  <div class="progress-bar" @click="onClick">
    <div class="bar-inner">
      <div class="progress" ref="progress" :style="progressStyle"></div>
      <div
        class="progress-btn-wrapper"
        :style="btnStyle"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
const progressBtnWidth = 16;
export default {
  name: "progress-bar",
  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      offset: 0,
    };
  },
  emits: ["progress-changing", "progress-changed"],
  computed: {
    progressStyle() {
      return `width:${this.offset}px`;
    },
    btnStyle() {
      return `transform:translate3d(${this.offset}px,0,0)`;
    },
  },
  // 为什么用watch而不是computed？
  // 监听的数据progress一直在改变，需要实时监听，但并不需要复杂的计算
  watch: {
    progress(newProgress) {
      const barWidth = this.$el.clientWidth - progressBtnWidth;
      this.offset = barWidth * newProgress;
    },
  },
  created() {
    this.touch = {}; // touch对象用来保存多个方法中需要共享的坐标数据。因为只要使用而无需渲染，所以不放在data里
  },
  methods: {
    onTouchStart(e) {
      // 手指按下，获取当前按下的坐标
      this.touch.x1 = e.touches[0].pageX;
      this.touch.beginWidth = this.$refs.progress.clientWidth;
    },
    onTouchMove(e) {
      // 手指拖动，坐标改变
      const delta = e.touches[0].pageX - this.touch.x1;
      const tempWidth = this.touch.beginWidth + delta;
      const barWidth = this.$el.clientWidth - progressBtnWidth;
      const progress = Math.min(1, Math.max(tempWidth / barWidth, 0));
      this.offset = barWidth * progress;
      this.$emit("progress-changing", progress);
    },
    onTouchEnd() {
      // 手指松开
      const barWidth = this.$el.clientWidth - progressBtnWidth;
      const progress = this.$refs.progress.clientWidth / barWidth;
      this.$emit("progress-changed", progress);
    },
    onClick(e) {
      // 点击进度条某一位置直接跳转相应的进度
      const rect = this.$el.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      const barWidth = this.$el.clientWidth - progressBtnWidth;
      const progress = offsetWidth / barWidth;
      this.$emit("progress-changed", progress);
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: black;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 14px;
        height: 14px;
        border: 2px solid $color-text;
        border-radius: 50%;
        background: black;
      }
    }
  }
}
</style>
