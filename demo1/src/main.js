import Vue from 'vue';
import vueRouter from "vue-router";
import ElementUI from "element-ui";
import router from "./routes"
import App from './App.vue';

Vue.use(vueRouter);
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
