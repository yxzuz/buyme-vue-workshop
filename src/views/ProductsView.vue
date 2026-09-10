<template>
  <div>
    <v-container fluid class="#F5EBDD">
      <h1 class="my-4">Explore Products</h1>
      <v-row>
        <v-col v-for="(item, idx) in apiData" :key="idx" cols="3">
          <v-card width="500px" height="600px">
            <v-img height="300px" :src="item.imageUrl" />
            <v-card-title
              >{{ item.name }}
              <v-spacer></v-spacer>
              <span
                ><v-btn dark @click="callAlertParam(item.name)"
                  ><v-icon>mdi-cart-variant</v-icon></v-btn
                ></span
              >
            </v-card-title>
            <v-card-text>
              <v-divider class="my-2"></v-divider>
              <p>{{ item.description }}</p>
              <v-divider class="my-2"></v-divider>
              <p>{{ item.price }}</p>
              <v-divider class="my-2"></v-divider>
              <p>{{ item.currentStock }}</p>
              <v-divider class="my-2"></v-divider>
              <p>{{ item.imageUrl }}</p>
            </v-card-text>
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
      apiData: [],
      id: '',
    };
  },
  created() {
    // Use the created lifecycle hook to fetch data when the component is created but DOM is not yet mounted. This is useful for initializing data before the component is rendered.
    this.getData();
  },
  computed: {
    // Computed property real-time to determine the save mode based on the presence of an ID. If the ID is empty, it indicates a new item; otherwise, it indicates editing an existing item.
    saveMode() {
      return this.id === '' ? 'newItem' : 'editItem';
    },
  },
  methods: {
    getData() {
      this.axios
        .get('http://localhost:3000/api/v1/products')
        .then((response) => {
          console.log(response.data);
          this.apiData = response.data.data;
          this.apiData = this.apiData.map((item) => {
            return {
              ...item,
              imageUrl: this.getImageAbsoluteUrl(item.imageUrl),
            };
          });
        });
    },
    getImageAbsoluteUrl(imagePath) {
      return imagePath
        ? `http://localhost:3000/${imagePath.replace(/^public\//, '')}`
        : ''; // Replace the first occurrence of "public/" with an empty string
    },
    callAlertParam(message) {
      alert(message);
    },
  },
};
</script>
<style></style>
