<template>
  <v-app>
    <router-view />
    <app-snackbar />
  </v-app>
</template>

<script>
import AppSnackbar from './components/AppSnackbar.vue';

export default {
  name: 'App',
  components: { AppSnackbar },

  data: () => ({
    //
  }),
};
</script>
