<template>
  <div>
    <v-container fluid class="#F5EBDD">
      <h1 class="my-4">My Shopping Cart</h1>

      <p v-if="cart.length === 0">Your cart is empty.</p>

      <v-simple-table v-else>
        <thead>
          <tr>
            <th class="text-left">Product</th>
            <th class="text-left">Price</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Subtotal</th>
            <th class="text-left">Remove</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.productId">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>
              <v-text-field
                v-model.number="item.quantity"
                type="number"
                dense
                hide-details
                style="width: 80px"
                :min="1"
                :max="item.currentStock"
                @change="updateQuantity(item)"
              />
            </td>
            <td>{{ (item.price * item.quantity).toFixed(2) }}</td>
            <td>
              <v-btn icon @click="removeItem(item.productId)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-row v-if="cart.length" justify="end">
        <v-col cols="12" sm="4" md="3">
          <v-card outlined class="pa-4 mt-4 mr-6">
            <div class="d-flex justify-space-between align-center mb-4">
              <span class="text-h6">Total</span>
              <span class="text-h6">{{ cartTotal.toFixed(2) }}</span>
            </div>
            <v-btn
              block
              color="primary"
              :disabled="checkingOut"
              @click="checkout"
            >
              Checkout
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkingOut: false,
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    },
  },
  methods: {
    updateQuantity(item) {
      this.$store.commit('UPDATE_CART_QUANTITY', {
        productId: item.productId,
        quantity: item.quantity,
      });
    },
    removeItem(productId) {
      this.$store.commit('REMOVE_FROM_CART', productId);
    },
    async checkout() {
      this.checkingOut = true;
      try {
        await this.axios.post('http://localhost:3000/api/v1/orders', {
          products: this.cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        });
        this.$store.commit('CLEAR_CART');
        this.$toast.success('Order placed successfully!');
        this.$router.push({ name: 'products' });
      } catch (error) {
        const message =
          error.response?.data?.message ||
          'Failed to place order. Please try again.';
        this.$toast.error(message);
      } finally {
        this.checkingOut = false;
      }
    },
  },
};
</script>

<style></style>
