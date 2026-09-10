<template>
  <div>
    <v-container fluid class="#F5EBDD">
      <h1 class="my-4">All My Products</h1>
      <v-btn light color="#F2765E" class="white--text mb-3" @click="newItem"
        >Add New Product</v-btn
      >
      <v-row>
        <v-col v-for="(item, idx) in apiData" :key="idx" cols="3">
          <v-card width="500px" height="600px">
            <v-img height="300px" :src="item.imageUrl || placeholder" />

            <v-card-title
              >{{ item.name }}
              <v-spacer></v-spacer>
              <span
                ><v-btn white depressed @click="editItem(item)"
                  ><v-icon>mdi-square-edit-outline</v-icon></v-btn
                ></span
              >
              <span
                ><v-btn white depressed @click="deleteItem(item)"
                  ><v-icon>mdi-delete</v-icon></v-btn
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
    <v-dialog v-model="editDialog" width="500px">
      <v-card>
        <v-card-title>{{ saveMode }}</v-card-title>

        <v-card-text>
          <v-text-field
            v-model="postData.name"
            label="Name"
            outlined
            clearable
            class="px-4"
          />

          <v-text-field
            v-model="postData.description"
            label="Description"
            outlined
            clearable
            class="px-4"
          />

          <v-text-field
            v-model="postData.price"
            label="Price"
            outlined
            clearable
            class="px-4"
          />

          <v-text-field
            v-model="postData.currentStock"
            label="Current Stock"
            outlined
            clearable
            class="px-4"
          />

          <v-text-field
            v-model="postData.imageUrl"
            label="Image URL"
            outlined
            clearable
            class="px-4"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" @click="closeDialog"> Cancel </v-btn>

          <v-btn color="primary" @click="saveSelect"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import placeholder from '@/assets/placeholder.jpeg';
export default {
  data() {
    return {
      apiData: [],
      id: '',
      postData: {
        name: '',
        description: '',
        price: '',
        currentStock: '',
        imageUrl: '',
      },
      editDialog: false,
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
  computed: {
    // Computed property real-time to determine the save mode based on the presence of an ID. If the ID is empty, it indicates a new item; otherwise, it indicates editing an existing item.
    saveMode() {
      return this.id === '' ? 'newItem' : 'editItem';
    },
  },
  methods: {
    newItem() {
      this.id = '';
      this.postData = { ...this.postDataDefault };
      this.editDialog = true;
    },
    editItem(item) {
      this.id = item._id;
      this.postData = { ...item };
      this.editDialog = true;
    },
    closeDialog() {
      this.id = '';
      this.postData = { ...this.postDataDefault };
      this.editDialog = false;
    },
    saveSelect() {
      if (this.id !== '') {
        this.saveEditData();
      } else {
        this.savePostData();
      }
    },
    getData() {
      this.axios
        .get('http://localhost:3000/api/v1/products/owner')
        .then((response) => {
          this.apiData = response.data.data.map((item) => ({
            ...item,
            imageUrl: this.getImageAbsoluteUrl(item.imageUrl),
          }));
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          const message =
            error.response?.status === 401
              ? 'Your session has expired. Please log in again.'
              : 'Failed to load products. Please try again.';
          this.$toast.error(message);
        });
    },
    getImageAbsoluteUrl(imagePath) {
      return imagePath
        ? `http://localhost:3000/${imagePath.replace(/^public\//, '')}`
        : ''; // Replace the first occurrence of "public/" with an empty string
    },
    async savePostData() {
      try {
        const { data: responseBody } = await axios.post(
          'http://localhost:3000/api/v1/products',
          this.postData
        );
        console.log('Response from API:', responseBody);
        // Your save logic here
        this.$toast.success('Product saved successfully!');
        this.getData(); // Refresh the product list after saving
        this.closeDialog(); // Close the dialog after saving
      } catch (error) {
        const message =
          error.response?.data?.message ||
          'Failed to save product. Please try again.';
        console.error('Error saving post data:', message);
        this.$toast.error(message);
      }
    },
    async saveEditData() {
      try {
        const { data: responseBody } = await axios.put(
          `http://localhost:3000/api/v1/products/${this.id}`,
          this.postData
        );
        console.log('Response from API:', responseBody);
        this.$toast.success('Product updated successfully!');
        this.getData(); // Refresh the product list after updating
        this.closeDialog(); // Close the dialog after updating
      } catch (error) {
        const message =
          error.response?.data?.message ||
          'Failed to update product. Please try again.';
        console.error('Error updating post data:', message);
        this.$toast.error(message);
      }
    },
    async deleteItem(item) {
      if (!confirm('Are you sure you want to delete $ {item.name} product?')) {
        return; // Exit if the user cancels the deletion
      }
      try {
        const { data: responseBody } = await axios.delete(
          `http://localhost:3000/api/v1/products/${item._id}`
        );
        console.log('Response from API:', responseBody);
        this.$toast.success('Product deleted successfully!');
        this.getData(); // Refresh the product list after deleting
      } catch (error) {
        const message =
          error.response?.data?.message ||
          'Failed to delete product. Please try again.';
        console.error('Error deleting product:', message);
        this.$toast.error(message);
      }
    },
    callAlertParam(message) {
      alert(message);
    },
  },
};
</script>
<style></style>
