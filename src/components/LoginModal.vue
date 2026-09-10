<template>
  <div>
    <v-dialog v-model="dialogEdit" width="500px" @click:outside="resetForm">
      <v-card class="d-flex flex-column align-center">
        <v-sheet class="pa-1 mt-4" rounded elevation="2">
          <v-btn-toggle v-model="tab" mandatory color="#F2765E">
            <v-btn value="signup" text>Sign Up</v-btn>
            <v-btn value="login" text>Login</v-btn>
          </v-btn-toggle>
        </v-sheet>
        <v-card-title>
          {{ tab === 'signup' ? 'Create an account' : 'Welcome back' }}
        </v-card-title>
        <template v-if="tab === 'signup'">
          <v-text-field
            v-model="RegisterPayload.name"
            label="Name"
            outlined
            clearable
            class="align-self-stretch px-4"
          />

          <v-text-field
            v-model="RegisterPayload.role"
            label="Role"
            outlined
            clearable
            class="align-self-stretch px-4"
          />

          <v-text-field
            v-model="RegisterPayload.username"
            label="Username"
            outlined
            clearable
            class="align-self-stretch px-4"
          />

          <v-text-field
            v-model="RegisterPayload.password"
            label="Password"
            type="password"
            outlined
            clearable
            class="align-self-stretch px-4"
          />
        </template>

        <template v-else>
          <v-text-field
            v-model="loginPayload.username"
            label="Username"
            outlined
            clearable
            class="align-self-stretch px-4"
          />

          <v-text-field
            v-model="loginPayload.password"
            label="Password"
            type="password"
            outlined
            clearable
            class="align-self-stretch px-4"
          />
        </template>
        <v-card-text v-if="tab === 'login'" class="text-center">
          <p>
            Don't have an account?
            <v-btn text class="pa-0" color="#F2765E" @click="tab = 'signup'"
              >Sign up</v-btn
            >
          </p>
        </v-card-text>
        <v-card-actions class="align-self-stretch px-4 pb-4">
          <v-btn block dark @click="submitForm">
            {{ tab === 'signup' ? 'Sign Up' : 'Login' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LoginModal',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      RegisterPayload: {
        name: '',
        username: '',
        password: '',
        role: '',
      },
      loginPayload: {
        username: '',
        password: '',
      },
      tab: 'signup',
    };
  },
  computed: {
    dialogEdit: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    cancelForm() {
      this.dialogEdit = false;
    },
    async submitForm() {
      try {
        if (this.tab === 'login') {
          await this.loginUser();
        } else {
          await this.registerUser();
        }
      } finally {
        this.resetForm();
        this.dialogEdit = false;
      }
    },
    async loginUser() {
      try {
        const { data: responseBody } = await axios.post(
          'http://localhost:3000/api/v1/login',
          this.loginPayload
        );
        console.log(responseBody);
        this.setAuth(responseBody);
        this.$toast.success('Login successful!');
        // Handle successful login, e.g., store token, redirect, etc.
      } catch (error) {
        console.error(error);
        this.$toast.error('Login failed. Please try again.');
        // Handle login error, e.g., show error message
      }
    },
    async registerUser() {
      try {
        const { data: responseBody } = await axios.post(
          'http://localhost:3000/api/v1/register',
          this.RegisterPayload
        );
        console.log(responseBody);
        this.setAuth(responseBody);
        this.$toast.success('Registration successful!');
      } catch (error) {
        console.error(error);
        this.$toast.error('Registration failed. Please try again.');
      }
    },
    setAuth(responseBody) {
      const accessToken = responseBody.data[0].accessToken;
      if (!accessToken) {
        throw new Error('Login response did not include an access token.');
      }
      console.log('Access Token:', accessToken);
      const userData = responseBody.data[0].user;
      console.log('User Data:', userData);
      localStorage.setItem('User', userData.username);
      localStorage.setItem('Role', userData.role);
      localStorage.setItem('isApproved', userData.isApproved);
      localStorage.setItem('storeOwnerId', userData._id);
      this.$cookies.set('accessToken', accessToken, '1d'); // Set cookie for 1 day
      this.$cookies.set('User', userData.username, '1d');
      this.$cookies.set('Role', userData.role, '1d');
      this.$cookies.set('isApproved', userData.isApproved, '1d');
      this.$emit('logged-in', userData.username);
      // set the access token in the axios default headers for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      this.$store.commit('SET_AUTH', {
        accessToken,
        username: userData.username,
      });
    },
    resetForm() {
      this.RegisterPayload = {
        name: '',
        username: '',
        password: '',
        role: '',
      };
      this.loginPayload = {
        username: '',
        password: '',
      };
      this.tab = 'signup';
    },
  },
};
</script>

<style></style>
