<template>
  <div>
    <v-app-bar app color="#413333" dark d-flex justify-space-between>
      <div class="d-flex align-center mr-6">
        <v-icon class="display-1 px-1">mdi-shopping</v-icon>
        <span class="display-1">BuyMe</span>
      </div>

      <v-btn text color="white" to="/products">Products</v-btn>
      <v-btn text color="white" to="/my-products">My Products</v-btn>
      <v-btn text color="white" to="/orders">My Orders</v-btn>
      <v-btn text color="white" to="/my-shopping-cart">
        <v-badge :content="cartCount" :value="cartCount" color="error" overlap>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
      <v-spacer></v-spacer>

      <span class="mr-2">Welcome {{ user }} !</span>
      <v-btn text color="white" @click="loginDialog = true"
        ><v-icon>mdi-account</v-icon></v-btn
      >
      <login-modal v-model="loginDialog" @logged-in="setUser" />
      <!-- <span>User1: {{ user }} User2: {{ user2 }}</span> -->
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
      user: '',
      user2: '',
      loginDialog: false,
    };
  },
  computed: {
    cartCount() {
      return this.$store.getters.cartCount;
    },
  },
  mounted() {
    // do when starting the page
    this.user = localStorage.getItem('User');
    this.user2 = this.$cookies.get('User');
  },
  methods: {
    setUser(username) {
      this.user = username;
      this.user2 = username;
    },
  },
  props: ['username'],
};
</script>

<style></style>
