import Vue from "vue";
import Vuex from "vuex";

import favorites from "./favorites";
import users from "./users";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    users,
    favorites,
  },
});

export default store;
