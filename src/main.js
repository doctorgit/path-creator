import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import store from './store';
import App from './App';
import './assets/styles.scss';

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
