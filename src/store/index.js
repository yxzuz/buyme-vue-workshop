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

function getStoredCart() {
  try {
    return JSON.parse(localStorage.getItem('cart')) || [];
  } catch (e) {
    return [];
  }
}

export default new Vuex.Store({
  state: {
    accessToken: getCookie('accessToken'),
    user: localStorage.getItem('User') || null,
    cart: getStoredCart(),
  },
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
    cartCount: (state) =>
      state.cart.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: (state) =>
      state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },
  mutations: {
    SET_AUTH(state, { accessToken, username }) {
      state.accessToken = accessToken;
      state.user = username;
    },
    ADD_TO_CART(state, { product, quantity }) {
      const existing = state.cart.find((i) => i.productId === product._id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.cart.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          currentStock: product.currentStock,
          quantity,
        });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    UPDATE_CART_QUANTITY(state, { productId, quantity }) {
      const item = state.cart.find((i) => i.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter((i) => i.productId !== productId);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    CLEAR_CART(state) {
      state.cart = [];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
  actions: {},
  modules: {},
});
