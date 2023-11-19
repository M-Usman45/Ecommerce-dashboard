<template>
  <div class="container mx-auto p-6">
    <h2 class="text-xl font-semibold mb-4 w-full text-center">Add New Product</h2>
    <form
      @submit.prevent="addProduct"
      class="max-w-lg mx-auto bg-white p-8 rounded shadow"
    >
      <div class="mb-4">
        <label for="title" class="block text-gray-700 text-sm font-bold mb-2"
          >Title:</label
        >
        <input
          id="title"
          v-model="product.title"
          required
          class="shadow border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>
      <div class="mb-4">
        <label
          for="description"
          class="block text-gray-700 text-sm font-bold mb-2"
          >Description:</label
        >
        <textarea
          id="description"
          v-model="product.description"
          required
          class="shadow border rounded w-full py-2 px-3 text-gray-700"
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="stock" class="block text-gray-700 text-sm font-bold mb-2"
          >Stock:</label
        >
        <input
          type="number"
          id="stock"
          v-model.number="product.stock"
          required
          class="shadow border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>
      <div class="mb-4">
        <label for="price" class="block text-gray-700 text-sm font-bold mb-2"
          >Price:</label
        >
        <input
          type="number"
          id="price"
          v-model.number="product.price"
          required
          class="shadow border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>
      <div class="mb-4">
        <label for="image" class="block text-gray-700 text-sm font-bold mb-2"
          >Image:</label
        >
        <input
          type="file"
          id="image"
          @change="handleFileUpload"
          required
          class="shadow border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Product
      </button>
    </form>
  </div>
</template>

<script>
import config from "../../config.js"; 

export default {
  data() {
    return {
      product: {
        title: "",
        description: "",
        stock: 0,
        price: 0.0,
        image: "",
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      this.product.image = event.target.files[0];
    },
    async addProduct() {
      try {
        const formData = new FormData();
        formData.append('title', this.product.title);
        formData.append('description', this.product.description);
        formData.append('stock', this.product.stock);
        formData.append('price', this.product.price);
        formData.append('image', this.product.image);

        const response = await fetch(`${config.apiUrl}/products`, {
          method: 'POST',
          body: formData, 
        });
        if (response) { 
                  this.product = { title: '', description: '', stock: 0, price: 0.0, image: '' };
        alert('Product added successfully');
        }
      } catch (error) {
         console.error('Error adding product:', error);
        alert('Failed to add product');
      }
    }
  },
};
</script>
