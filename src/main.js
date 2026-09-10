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

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.use(VueMarquee);
Vue.use(VueSplide);
Vue.use(require('vue-cookies'));
Vue.use(VueConfetti);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
