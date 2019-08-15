import Vue from 'vue';
import Vuex from 'vuex';
import routes from './store/modules/routes';
import lang from './store/modules/lang';
import getters from './store/getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    routes,
    lang,
  },
  getters,
});

export default store;
