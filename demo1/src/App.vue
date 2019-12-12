<template>
  <div id="app">
    <transition name="el-fade-in">
      <router-view class="container">
        <!-- 这里是不被缓存的视图组件 -->
      </router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return{
      activeLink: "",
      isCollapse: false
    };
  },
  methods: {
    //侧边栏点击事件
    menuLink(link) {
      if (link) window.open(link);
    },
    toggleClick() {
      this.isCollapse = !this.isCollapse;
    },
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
</style>
