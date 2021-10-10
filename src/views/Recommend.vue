<template>
  <div class="recommend" v-loading="loading">
    <Scroll class="recommend-content">
      <div>
        <!-- 轮播图 -->
        <div class="slider-wrapper">
          <div class="slider-content">
            <Slider v-if="sliders.length" :sliders="sliders" />
          </div>
        </div>
        <!-- 推荐列表 -->
        <div class="recommend-list">
          <h1 class="list-title" v-show="!loading">热门歌单</h1>
          <ul>
            <li v-for="item in albums" class="item" :key="item.id">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.pic" />
              </div>
              <div class="text">
                <h2 class="name">
                  {{ item.username }}
                </h2>
                <p class="title">
                  {{ item.title }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import { getRecommend } from "@/service/recommend";
import Slider from "@/components/Base/Slider/Slider";
import Scroll from "@/components/Base/Scroll/Scroll";

export default {
  name: "Recommend",
  data() {
    return {
      sliders: [],
      albums: [],
    };
  },
  async created() {
    const res = await getRecommend();
    this.sliders = res.sliders;
    this.albums = res.albums;
  },
  components: {
    Slider,
    Scroll,
  },
  computed: {
    loading() {
      // 没获取到全部数据时始终为loading
      return !this.sliders.length && !this.albums.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  // overflow: scroll;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;
      .slider-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
      .item {
        display: flex;
        width: 90%;
        box-sizing: border-box;
        align-items: center;
        padding: 5px 20px;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4);
        border-radius: 8px;
        margin: 10px auto;
        transition: all 0.3s ease-in-out;
        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
        }
        .name {
          margin-bottom: 10px;
          font-size: $font-size-medium;
          color: $color-text;
          font-weight: bold;
        }
        .title {
          color: $color-text-d;
          font-size: $font-size-small;
        }
        :focus {
          transform: scale(1.03);
        }
      }
      :first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
