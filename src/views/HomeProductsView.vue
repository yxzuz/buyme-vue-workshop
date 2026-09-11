<template>
  <div>
    <v-container fluid class="#F5EBDD">
      <h1 class="my-4">Explore Products</h1>
      <v-row>
        <v-col v-for="(item, idx) in apiData" :key="idx" cols="3">
          <v-card width="500px" height="600px">
            <v-img height="300px" :src="item.imageUrl || placeholder" />
            <v-card-title style="flex-wrap: nowrap">
              <span
                class="text-truncate"
                style="min-width: 0"
                :title="item.name"
                >{{ item.name }}</span
              >
              <v-spacer></v-spacer>
              <div class="flex-shrink-0">
                <v-btn dark @click="addToCart(item)"
                  ><v-icon>mdi-cart-variant</v-icon></v-btn
                >
              </div>
            </v-card-title>
            <v-card-text>
              <v-divider class="my-2"></v-divider>
              <p class="description-clamp" :title="item.description">
                {{ item.description }}
              </p>
              <v-divider class="my-2"></v-divider>
              <p>
                <span style="font-weight: bold">Price: </span>{{ item.price }}
              </p>
              <v-divider class="my-2"></v-divider>
              <p>
                <span style="font-weight: bold">Stock: </span
                >{{ item.currentStock }}
              </p>
              <v-divider class="my-2"></v-divider>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import placeholder from '@/assets/placeholder.jpeg';
export default {
  data() {
    return {
      apiData: [],
      id: '',
      editDialog: true,
      placeholder,
    };
  },
  created() {
    // Use the created lifecycle hook to fetch data when the component is created but DOM is not yet mounted. This is useful for initializing data before the component is rendered.
    this.getData();
  },
  watch: {
    '$store.state.accessToken'() {
      this.getData();
    },
  },
  methods: {
    getData() {
      this.axios
        .get('http://localhost:3000/api/v1/products')
        .then((response) => {
          console.log(response.data);
          this.apiData = response.data.data.map((item) => ({
            ...item,
            imageUrl: this.getImageAbsoluteUrl(item.imageUrl),
          }));
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          const message =
            error.response?.data?.message || 'Failed to fetch products.';
          this.$toast.error(message);
        });
    },
    getImageAbsoluteUrl(imagePath) {
      return imagePath
        ? `http://localhost:3000/${imagePath.replace(/^public\//, '')}`
        : ''; // Replace the first occurrence of "public/" with an empty string
    },
    addToCart(item) {
      this.$store.commit('ADD_TO_CART', { product: item, quantity: 1 });
      this.$toast.success(`${item.name} added to cart!`);
    },
  },
};
</script>
<style scoped>
.description-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
