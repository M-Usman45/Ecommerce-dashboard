<template>
  <div class="container">
    <h1 class="text-red">{{ chartTitle }}</h1>

    <!-- Determine the chart type based on the prop -->
    <component :is="chartType" v-if="loaded" :data="chartData" :options="chartOptions" />

  </div>
</template>

<script>
import { Bar, Line } from "vue-chartjs";
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
  name: "ChartComponent",
  props: {
    chartType: {
      type: String,
      required: true,
    },
    chartTitle: {
      type: String,
      required: true,
    },
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      required: true,
    },
    loaded: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    Bar,
    Line,
  },
};
</script>
