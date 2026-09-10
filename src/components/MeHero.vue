<template>
  <v-container fluid fill-height class="me-hero">
    <v-layout d-flex justify-center align-center column pa-5>
      <div
        class="display-4 font-weight-black white--text text-display-medium-center"
      >
        HELLO!
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'MeHero',
};
</script>

<style scoped>
.me-hero {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.85) 75%,
      #000000 100%
    ),
    url('@/assets/bg.png');
  background-size: cover, cover;
  background-position: center, center;
  width: 100%;
  height: 40%;
}
</style>
