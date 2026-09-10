<template>
  <div>
    <h1 class="red--text">{{ name }}</h1>
    <v-btn class="mb-4" @click="callMain">Call alert emit</v-btn>
  </div>
</template>

<script>
import { EventBus } from '@/EventBus';
export default {
  props: ['name'],
  methods: {
    callMain() {
      // publish event to
      EventBus.$emit('callAlertMain', 'Hello from TestProps.vue');
    },
  },
};
</script>

<style></style>
