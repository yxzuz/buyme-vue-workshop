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

      <v-spacer></v-spacer>

      <span class="mr-2">Welcome {{ user }} !</span>
      <v-btn text color="white" to="/my-shopping-cart">
        <v-badge :content="cartCount" :value="cartCount" color="error" overlap>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
      <v-btn text color="white" @click="loginDialog = true"
        ><v-icon>mdi-account</v-icon></v-btn
      >

      <v-btn text color="white" @click="logout"
        ><v-icon>mdi-logout</v-icon> Logout</v-btn
      >
      <login-modal v-model="loginDialog" @logged-in="setUser" />
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';
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
    logout() {
      localStorage.removeItem('User');
      localStorage.removeItem('Role');
      localStorage.removeItem('isApproved');
      localStorage.removeItem('storeOwnerId');
      this.$cookies.remove('accessToken');
      this.$cookies.remove('User');
      this.$cookies.remove('Role');
      this.$cookies.remove('isApproved');
      delete axios.defaults.headers.common['Authorization'];
      this.$store.commit('SET_AUTH', { accessToken: null, username: null });
      this.user = '';
      this.user2 = '';
      this.$toast.success('You have been logged out.');

      if (this.$route.name !== 'products') {
        this.$router.push({ name: 'products' });
      }
    },
  },
  props: ['username'],
};
</script>

<style></style>
