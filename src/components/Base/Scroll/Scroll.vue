<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import { ref } from "vue";
import useScroll from "./useScroll";

export default {
  name: "Scroll",
  props: {
    click: {
      type: Boolean,
      default: true,
    },
    probeType: {
      tyepe: Number,
      default: 0,
    },
  },
  emits: ['scroll'],
  setup(props, { emit }) {
    const rootRef = ref(null);
    useScroll(rootRef, props, emit);

    return {
      rootRef,
    };
  },
};
</script>