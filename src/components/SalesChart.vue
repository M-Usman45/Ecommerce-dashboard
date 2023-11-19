<template>
  <div>
    <h1 class="text-red">{{ chartTitle }}</h1>
    <Bar v-if="loaded" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


export default {
  name: "SalesChart",
  components: [ Bar ] ,
  props: {
    chartTitle: String,
    chartData: Object,
    chartOptions: Object,
    loaded: Boolean,
  },
};
</script>
