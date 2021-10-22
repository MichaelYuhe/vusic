<template>
  <Header />
  <Tab />

  <router-view v-slot="{ Component }"> 
    <keep-alive>
      <component :is="Component"/>
    </keep-alive>
  </router-view>
  <Player />
</template>

<script>
import Header from "@/components/Header/Header";
import Tab from "@/components/Tab/Tab";
import Player from "@/components/Player/Player";
export default {
  name: "App",
  components: {
    Header,
    Tab,
    Player,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
