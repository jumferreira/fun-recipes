import Vue from 'vue';
import axios from 'axios';
import lodash from 'lodash';
// import './plugins/axios';
import App from './App.vue';
import './assets/sass/index.scss';

Vue.use(axios);
Vue.use(lodash);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
