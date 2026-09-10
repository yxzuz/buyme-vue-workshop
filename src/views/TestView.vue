<template>
  <div>
    <h1>Hello World</h1>
    <h2>{{ name }}</h2>
    <TestProps :name="name" />
    <v-btn color="primary" @click="callAlert()">Show Alert</v-btn>
    <v-btn color="success" @click="show = !show">Click me</v-btn>
    <div v-if="show"><CardImg /></div>
    <v-row>
      <v-col v-for="(item, idx) in items" :key="idx" cols="3">
        <v-card width="350">
          <v-img :src="item.img" />
          <v-card-title>{{ item.message }}</v-card-title>
          <v-card-actions>
            <v-btn color="primary" @click="callAlertParam(item.message)"
              >Show Alert</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <h1>{{ value1 }}</h1>
      <v-col cols="12">
        <v-text-field
          name="name"
          v-model="value1"
          id="id"
          label="Enter your text here"
        ></v-text-field>
        <v-btn @click="setLocalStorage">set local storage</v-btn>
        <v-btn color="Red" @click="removeLocalStorage"
          >remove local storage</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CardImg from '@/components/CardImg.vue';
import TestProps from '@/components/TestProps.vue';
import { EventBus } from '@/EventBus';
export default {
  components: {
    CardImg,
    TestProps,
  },
  data() {
    return {
      value1: '',
      name: 'John Doe', // data binding example
      show: true, // conditional rendering example
      items: [
        {
          message: 'Hello',
          img: 'https://i.pinimg.com/736x/eb/70/dc/eb70dc34716af129b2ce4eb82fd0bdc3.jpg',
        },
        {
          message: 'World',
          img: 'https://i.pinimg.com/736x/3d/1d/d7/3d1dd746ed1a2212366c956f91eb6fe1.jpg',
        }, // list rendering example
        {
          message: 'World',
          img: 'https://i.pinimg.com/736x/3d/1d/d7/3d1dd746ed1a2212366c956f91eb6fe1.jpg',
        },
        {
          message: 'World',
          img: 'https://i.pinimg.com/736x/3d/1d/d7/3d1dd746ed1a2212366c956f91eb6fe1.jpg',
        },
        {
          message: 'World',
          img: 'https://i.pinimg.com/736x/3d/1d/d7/3d1dd746ed1a2212366c956f91eb6fe1.jpg',
        },
        {
          message: 'World',
          img: 'https://i.pinimg.com/736x/3d/1d/d7/3d1dd746ed1a2212366c956f91eb6fe1.jpg',
        },
        {
          message: 'World',
          img: 'https://i.pinimg.com/736x/3d/1d/d7/3d1dd746ed1a2212366c956f91eb6fe1.jpg',
        },
        {
          message: 'World',
          img: 'https://i.pinimg.com/736x/3d/1d/d7/3d1dd746ed1a2212366c956f91eb6fe1.jpg',
        },
        {
          message: 'World',
          img: 'https://i.pinimg.com/736x/3d/1d/d7/3d1dd746ed1a2212366c956f91eb6fe1.jpg',
        },
        {
          message: 'World',
          img: 'https://i.pinimg.com/736x/3d/1d/d7/3d1dd746ed1a2212366c956f91eb6fe1.jpg',
        },
        {
          message: 'World',
          img: 'https://i.pinimg.com/736x/3d/1d/d7/3d1dd746ed1a2212366c956f91eb6fe1.jpg',
        },
        {
          message: 'World',
          img: 'https://i.pinimg.com/736x/3d/1d/d7/3d1dd746ed1a2212366c956f91eb6fe1.jpg',
        },
      ],
    };
  },
  mounted() {
    // do when starting the page
    EventBus.$on('callAlertMain', this.callAlertParam); // listen to event from TestProps.vue
  },
  beforeDestroy() {
    EventBus.$off('callAlertMain', this.callAlertParam); // remove event listener
  },

  methods: {
    callAlert() {
      alert('Hello World');
    },
    callAlertParam(item) {
      alert(item);
    },
    setLocalStorage() {
      localStorage.setItem('User', this.value1);
      this.$cookies.set('User', this.value1, '1d');
    },
    removeLocalStorage() {
      localStorage.removeItem('User');
    },
  },
};
</script>

<style></style>
