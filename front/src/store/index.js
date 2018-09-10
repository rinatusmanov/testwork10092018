import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);



import worker from './modules/worker';

export const store = new Vuex.Store({
  modules: {
    worker,
  },
  strict: process.env.NODE_ENV !== 'production'
});
