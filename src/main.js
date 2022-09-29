import Vue from 'vue';
import axios from 'axios';
import VModal from 'vue-js-modal';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark, faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Search from "@/components/Search";
import App from './App.vue';
import './assets/sass/index.scss';
// import './plugins/axios';

library.add({ faXmark, faPrint });
Vue.use(axios);
Vue.use(VModal);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('search-bar', Search);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
