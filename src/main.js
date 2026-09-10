import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueMarquee from 'vue-marquee-component';
import VueSplide from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import VueConfetti from 'vue-confetti';
import VueAxios from 'vue-axios';
import axios from 'axios';
import toast from './plugins/toast';

Vue.use(VueAxios, axios);
Vue.use(toast);
Vue.config.productionTip = false;
Vue.use(VueMarquee);
Vue.use(VueSplide);
Vue.use(require('vue-cookies'));
Vue.use(VueConfetti);

const savedAccessToken = Vue.$cookies.get('accessToken');
if (savedAccessToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${savedAccessToken}`;
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
