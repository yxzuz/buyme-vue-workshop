<template>
  <v-snackbar
    v-model="show"
    :color="color"
    top
    right
    elevation="4"
    rounded="pill"
    timeout="4000"
  >
    <div class="d-flex align-center">
      <v-icon left>{{
        color === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'
      }}</v-icon>
      {{ message }}
    </div>
    <template #action="{ attrs }">
      <v-btn icon text v-bind="attrs" @click="show = false">
        <v-icon small>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { toastBus } from '@/plugins/toast';

export default {
  name: 'AppSnackbar',
  data() {
    return {
      show: false,
      message: '',
      color: 'info',
    };
  },
  created() {
    toastBus.$on('show', this.handleShow);
  },
  beforeDestroy() {
    toastBus.$off('show', this.handleShow);
  },
  methods: {
    handleShow({ message, color }) {
      this.message = message;
      this.color = color;
      this.show = true;
    },
  },
};
</script>
