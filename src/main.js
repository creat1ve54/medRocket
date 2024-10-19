import Vue from "vue";
import App from "./App.vue";
import "./assets/styles/index.scss";
import store from "./vuex/store";
import router from "./router/index";
import globalDirectives from './derectives/index'

Vue.config.productionTip = false;

Vue.use(globalDirectives);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})