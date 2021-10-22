<template>
  <div class="my-list">
    <Scroll class="my-list-content">
      <div class="lists">
        <ul>
          <li
            class="item"
            v-for="item in lists"
            :key="item.id"
            @click="selectedItem(item)"
          >
            <div class="text">test</div>
          </li>
        </ul>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "@/components/Base/Scroll/Scroll";

export default {
  name: "MyList",
  components: {
    Scroll,
  },
  data() {
      return {
        myList: [],
        selectedList: null      
      }
  },
};
</script>

<style lang="scss" scoped>
.my-list {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .my-list-content {
        height: 100%;
        overflow: hidden;
    }
}
</style>