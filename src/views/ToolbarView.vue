<template>
  <div>
    <v-app-bar app color="#413333" dark d-flex justify-space-between>
      <div class="d-flex align-center mr-6">
        <v-icon class="display-1 px-1">mdi-shopping</v-icon>
        <span class="display-1">BuyMe</span>
      </div>

      <v-btn text color="white" to="/products">Products</v-btn>
      <v-btn text color="white" to="/">Home</v-btn>
      <v-spacer></v-spacer>

      <span class="mr-2">Welcome {{ User2 }} !</span>
      <v-btn text color="white" @click="loginDialog = true"
        ><v-icon>mdi-account</v-icon></v-btn
      >
      <login-modal v-model="loginDialog" />
      <!-- <span>User1: {{ User }} User2: {{ User2 }}</span> -->
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue';
export default {
  components: { LoginModal },
  data() {
    return {
      User: '',
      User2: '',
      loginDialog: false,
    };
  },
  mounted() {
    // do when starting the page
    this.User = localStorage.getItem('User');
    this.User2 = this.$cookies.get('User');
  },
  methods: {
    setUser(username) {
      this.User = username;
      this.User2 = username;
    },
  },
};
</script>

<style></style>
