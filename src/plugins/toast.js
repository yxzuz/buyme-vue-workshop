import Vue from 'vue';

export const toastBus = new Vue();

const toast = {
  show(message, color = 'info') {
    toastBus.$emit('show', { message, color });
  },
  success(message) {
    this.show(message, 'success');
  },
  error(message) {
    this.show(message, 'error');
  },
};

export default {
  install(VueCtor) {
    VueCtor.prototype.$toast = toast;
  },
};
