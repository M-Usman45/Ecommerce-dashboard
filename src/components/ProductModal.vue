<template>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4"
  >
    <div class="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-semibold mb-4">Edit Product Stock</h2>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Title</label>
          <p class="mt-1 text-gray-900">{{ editingProduct.title }}</p>
        </div>
        <p><strong>Description:</strong> {{ editingProduct.description }}</p>
        <p><strong>Price:</strong> {{ editingProduct.price }}</p>
        <p><strong>Category:</strong> {{ editingProduct.category }}</p>
        <div>
          <label for="stock" class="block text-sm font-medium text-gray-700"
            >Stock</label
          >
          <input
            type="number"
            id="stock"
            v-model="editingStock"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end mt-6 space-x-4">
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring"
          @click="saveStock"
        >
          Save
        </button>
        <button
          class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring"
          @click="closeModal"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product-modal",
  data() {
    return {
      showModal: false,
      editingProduct: null,
      editingStock: null,
    };
  },
  methods: {
    openModal(product) {
      this.editingProduct = product;
      this.editingStock = product.stock;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.editingProduct = null;
      this.editingStock = null;
    },
    saveStock() {
      this.$emit("save", this.editingStock);
      this.closeModal();
    },
  },
};
</script>
