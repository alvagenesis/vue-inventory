import Vuex from "vuex";
import Vue from "vue";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "../firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: []
  },

  mutations: vuexfireMutations,

  actions: {
    setProductRef: firestoreAction(context => {
      // context contains all original properties like commit, state, etc
      // and adds `bindFirestoreRef` and `unbindFirestoreRef`
      // we return the promise returned by `bindFirestoreRef` that will
      // resolve once data is ready
      return context.bindFirestoreRef("products", db.collection("product"));
    })
  }
});
