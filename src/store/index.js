import Vuex from "vuex";
import Vue from "vue";
import inventory from "./modules/inventory";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    inventory
  }
});
