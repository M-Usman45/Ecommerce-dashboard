<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-semibold mb-6 text-gray-800">Product List</h1>
    <div class="mb-6">
      <input
        v-model="searchQuery"
        class="w-1/4 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search by title"
      />
    </div>
    <table class="min-w-full bg-white shadow-md rounded-lg">
      <thead class="bg-gray-100">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Image
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-blue-600"
            @click="sortBy('title')"
          >
            Title
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-blue-600"
            @click="sortBy('description')"
          >
            Description
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-blue-600"
            @click="sortBy('price')"
          >
            Price
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-blue-600"
            @click="sortBy('stock')"
          >
            Stock
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Category
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Inventory Status
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="product in paginatedProducts"
          :key="product._id"
          class="hover:bg-gray-50"
          :class="{ 'bg-red-100': product.stock === 0 }"
        >
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <img
              :src="getImageFullPath(product.image)"
              :alt="product.title"
              class="h-10 w-10 object-cover rounded"
            />
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          >
            {{ product.title }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ product.description }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ product.price }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ product.stock }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ product.category }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ product.stock > 0 ? "In Stock" : "Out of Stock" }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <span
              class="cursor-pointer text-blue-600 hover:text-blue-800"
              @click="editProduct(product)"
            >
              <svg
                class="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                />
              </svg>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between items-center mt-6">
      <button
        :disabled="currentPage <= 1"
        @click="currentPage--"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        :disabled="currentPage >= totalPages"
        @click="currentPage++"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        Next
      </button>
    </div>
  </div>
  <product-modal ref="productModal" @save="saveStock"></product-modal>
</template>

<script>
/* eslint-disable */
import config from "../../config.js";
import ProductModal from "../components/ProductModal.vue";

export default {
  data() {
    return {
      products: [],
      searchQuery: "",
      sortByField: "",
      sortOrder: 1,
      currentPage: 1,
      recordsPerPage: 10,
      editingProduct: undefined,
    };
  },
  components: { "product-modal": ProductModal },
  computed: {
    filteredProducts() {
      return this.products.filter((product) =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    sortedAndFilteredProducts() {
      return [...this.filteredProducts].sort((a, b) => {
        if (this.sortByField) {
          if (a[this.sortByField] < b[this.sortByField]) {
            return -1 * this.sortOrder;
          }
          if (a[this.sortByField] > b[this.sortByField]) {
            return 1 * this.sortOrder;
          }
        }
        return 0;
      });
    },
    totalPages() {
      return Math.ceil(
        this.sortedAndFilteredProducts.length / this.recordsPerPage
      );
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.recordsPerPage;
      const end = start + this.recordsPerPage;
      return this.sortedAndFilteredProducts.slice(start, end);
    },
  },
  methods: {
    async fetchProducts() {
      try {
        const baseUrl = config.apiUrl;
        const response = await fetch(`${baseUrl}/products`);
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    sortBy(field) {
      if (this.sortByField === field) {
        this.sortOrder *= -1;
      } else {
        this.sortByField = field;
        this.sortOrder = 1;
      }
    },
    getImageFullPath(relativePath) {
      if (relativePath?.includes('public')) {
        const path = relativePath.split('public')?.length > 0 ? relativePath.split('public')[1] : ""
        return `${process.env.VUE_APP_BACKEND_ASSETS_URL}/${path}`
      } else {
        return `${process.env.VUE_APP_BACKEND_ASSETS_URL}/${relativePath}`;
      }
    },

    editProduct(product) {
      if (this.$refs.productModal && product) {
        this.$refs.productModal.openModal(product);
        this.$data.editingProduct = product;
      } else {
        console.error("Modal reference or product is undefined");
      }
    },

    async saveStock(stock) {
      try {
        let { _id, __v, ...updatedProduct } = this.editingProduct;
        updatedProduct = { ...updatedProduct, stock };
        fetch(`${config.apiUrl}/products/${this.editingProduct._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify(updatedProduct),
        }).then((res) => {
          if (res) {
            this.fetchProducts(); // Refetch products
          }
        });
      } catch (error) {
        console.error("Error updating product:", error);
      } finally {
        this.editingProductId = null;
        this.editingStock = null;
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
