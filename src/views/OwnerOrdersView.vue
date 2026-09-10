<template>
  <div>
    <v-container fluid class="#F5EBDD">
      <h1 class="my-4">My Orders</h1>
      <template>
        <v-simple-table fixed-header height="300px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Product</th>
                <th class="text-left">Total Amount</th>
                <th class="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in apiData" :key="item._id">
                <td>{{ item._id }}</td>
                <td>{{ formatProducts(item.products) }}</td>
                <td>{{ item.totalAmount }}</td>
                <td>{{ item.status }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      apiData: [],
      id: '',
    };
  },
  created() {
    this.getOrders();
  },
  watch: {
    '$store.state.accessToken'() {
      this.getOrders();
    },
  },
  methods: {
    formatProducts(products) {
      return products
        .map(
          (p) =>
            `${p.productId ? p.productId.name : '(product removed)'} x${
              p.quantity
            }`
        )
        .join(', ');
    },
    async getOrders() {
      try {
        const { data: responseBody } = await axios.get(
          'http://localhost:3000/api/v1/orders'
        );
        this.apiData = responseBody.data;
        console.log('Orders loaded successfully:', this.apiData);
        this.$toast.success('Orders loaded successfully!');
      } catch (error) {
        console.error('Error fetching orders:', error);
        const message =
          error.response?.data?.message ||
          'Failed to load orders. Please try again.';
        this.$toast.error(message);
      }
    },
  },
};
</script>

<style></style>
