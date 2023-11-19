<template>
  <div>
    <h1 class="text-2xl font-semibold mb-6 text-gray-800">Dashboard</h1>
    <div v-if="loaded">
      <div class="flex justify-between">
        <!-- Card for Total Orders -->
        <div class="w-1/4 bg-blue-200 p-4 rounded-lg shadow-md">
          <p class="text-lg font-semibold">Total Orders</p>
          <p class="text-3xl">{{ totalOrders }}</p>
        </div>

        <!-- Card for Total Sales -->
        <div class="w-1/4 bg-green-200 p-4 rounded-lg shadow-md">
          <p class="text-lg font-semibold">Total Sales</p>
          <p class="text-3xl">{{ totalSales }}</p>
        </div>

        <!-- Card for Total Revenue -->
        <div class="w-1/4 bg-yellow-200 p-4 rounded-lg shadow-md">
          <p class="text-lg font-semibold">Total Revenue</p>
          <p class="text-3xl">{{ totalRevenue }}</p>
        </div>
      </div>

      <!-- Sales Chart -->
      <div class="mt-20">
        <h2 class="text-lg font-semibold mb-4">Sales</h2>
        <Bar :data="salesChartData" />
      </div>

      <!-- Orders Chart -->
      <div class="mt-20">
        <h2 class="text-lg font-semibold mb-4">Orders</h2>
        <Bar :data="ordersChartData" />
      </div>
    </div>
  </div>
</template>

<script>
import config from "../../config.js";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  components: {
    Bar,
  },
  data() {
    return {
      salesChartData: {},
      ordersChartData: {}, 
      loaded: false,
    };
  },
  methods: {
    fetchData() {
      const baseUrl = config.apiUrl;
      fetch(`${baseUrl}/orders`)
        .then((response) => response.json())
        .then((data) => {
          // Calculate totalOrders, totalSales, and totalRevenue
          this.totalOrders = data.length;
          this.totalSales = data.reduce(
            (total, order) => total + order.quantity,
            0
          );
          this.totalRevenue = data.reduce(
            (total, order) => total + order.price,
            0
          );

          // Extract data for orders and sales trends
          this.ordersData = data.map((order) => order.quantity);
          this.salesData = data.map((order) => order.price);

          // Update the chart data
          this.updateChartData();

          // Set loaded to true
          this.loaded = true;
        })
        .catch((error) => {
          console.error("Data fetching error:", error);
        });
    },
    updateChartData() {
      // Update chart data for sales
      this.salesChartData = {
        labels: [...Array(this.salesData.length).keys()], // X-axis labels
        datasets: [
          {
            label: "Sales",
            data: this.salesData,
            borderColor: "green",
            backgroundColor: "#f87979",
            fill: false,
          },
        ],
      };

      // Update chart data for orders
      this.ordersChartData = {
        labels: [...Array(this.ordersData.length).keys()], // X-axis labels
        datasets: [
          {
            label: "Orders",
            data: this.ordersData,
            borderColor: "blue",
            backgroundColor: "yellow",
            fill: false,
          },
        ],
      };
    },
  },
  mounted() {
    this.fetchData();

    // Periodically fetch and update data (e.g., every 5 seconds)
    // setInterval(() => {
    // this.fetchData();
    // }, 5000);
  },
};
</script>
