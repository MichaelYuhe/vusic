  <template>
  <Scroll class="index-list" :probeType="3" @scroll="onScroll" ref="scrollRef">
    <ul ref="groupRef">
      <li v-for="group in data" :key="group.title" class="group">
        <h2 class="title">{{ group.title }}</h2>
        <ul>
          <li
            v-for="item in group.list"
            :key="item.id"
            class="item"
            @click="onItemClick(item)"
          >
            <img v-lazy="item.pic" class="avatar" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="fixed">
      <div class="fixed-title" v-show="fixedTitle" :style="fixedStyle">
        {{ fixedTitle }}
      </div>
    </div>
    <div
      class="shortcut"
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
      @touchend.stop.prevent
    >
      <ul>
        <li
          class="item"
          v-for="(item, index) in shortcutList"
          :key="item"
          :data-index="index"
          :class="{ current: currentIndex === index }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </Scroll>
</template>

  <script>
import Scroll from "@/components/Base/Scroll/Scroll";
import useFix from "./useFix";
import useShortcut from "./useShortcut";

export default {
  name: "IndexList",
  components: {
    Scroll,
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  emits: ["select"],
  setup(props, { emit }) {
    const { groupRef, onScroll, fixedTitle, fixedStyle, currentIndex } =
      useFix(props);
    const {
      scrollRef,
      shortcutList,
      onShortcutTouchStart,
      onShortcutTouchMove,
    } = useShortcut(props, groupRef);

    function onItemClick(item) {
      emit("select", item);
    }
    return {
      onItemClick,
      // fix
      groupRef,
      onScroll,
      fixedTitle,
      fixedStyle,
      currentIndex,
      // shortcut
      scrollRef,
      shortcutList,
      onShortcutTouchStart,
      onShortcutTouchMove,
    };
  },
};
</script>

  <style lang="scss" scoped>
.index-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .group {
    padding-bottom: 30px;
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .item {
      width: 70%;
      display: flex;
      align-items: center;
      padding: 10px 10px 10px 30px;
      margin: 10px auto;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
      // border-radius: 5px;
      // background-color: #fff;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
    // :first-child {
    //   margin-top: 0px;
    // }
  }
  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
  .shortcut {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    width: 23px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;
    .item {
      // transition: .3s;
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current {
        color: $color-theme;
        font-size: $font-size-medium;
      }
    }
  }
}
</style>