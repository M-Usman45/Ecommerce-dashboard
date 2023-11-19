<!-- OrdersChart.vue -->
<template>
  <div>
    <h1 class="text-red">{{ chartTitle }}</h1>
    <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs"; // Import Bar from vue-chartjs
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale);

export default {
  name: "OrdersChart",
  extends: Bar, // Extend Bar chart type
  props: {
    chartTitle: String,
    chartData: Object,
    chartOptions: Object,
    loaded: Boolean,
  },
};
</script>
