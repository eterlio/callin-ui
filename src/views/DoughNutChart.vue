<template>
  <apexchart type="donut" :options="options" :series="series"></apexchart>
</template>
<script setup lang="ts">
import { ref } from "vue";

const options = ref({
  chartOptions: {
    labels: ["Apple", "Mango", "Orange", "Watermelon"],
        colors: ["#ff4963", "#ffbc00"],
    chart: {
      height: 300
    },
    dataLabels:{
        enabled: true,
     formatter: function(val: any, opts: any) {
            return opts.w.config.series[opts.seriesIndex]

        },
    },
    plotOptions: {
      pie:{
        donut:{
          size:"50%"
        }
      }
    }
    
  },
});
const series = ref([44, 55, 41, 17, 15]);
</script>
<style scoped></style>
