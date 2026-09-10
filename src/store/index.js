import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Read directly from document.cookie: the vue-cookies plugin isn't
// registered yet when this module runs (main.js installs it after
// importing the store).
function getCookie(name) {
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + name + '=([^;]*)')
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export default new Vuex.Store({
  state: {
    accessToken: getCookie('accessToken'),
    user: localStorage.getItem('User') || null,
  },
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
  },
  mutations: {
    SET_AUTH(state, { accessToken, username }) {
      state.accessToken = accessToken;
      state.user = username;
    },
  },
  actions: {},
  modules: {},
});
