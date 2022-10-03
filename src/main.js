import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VModal from 'vue-js-modal';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark, faPrint, faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Search from "@/components/Search";
import App from './App.vue';
import './assets/sass/index.scss';
import funRecipes from './store/index';

library.add({ faXmark, faPrint, faRotate });
Vue.use(Vuex);
Vue.use(axios);
Vue.use(VModal);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('search-bar', Search);
Vue.config.productionTip = false

const store = new Vuex.Store({
  modules: {
    funRecipes,
  }
});

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
