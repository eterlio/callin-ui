<template>
  <apexchart
    :type="type"
    :options="testData.options"
    :series="testData.series"
  ></apexchart>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";

interface IChartProps {
  type: "bar" | "line" | "area" |"doughnut";
  title: string;
  data: {
    [key: string]: number[];
  };
}
const props = defineProps<IChartProps>();

interface IChartColors {
  [key: string]: {
    strokeColors: string[];
    fillColors: string[];
  };
}
const chartColors = reactive<IChartColors>({
  bar: {
    strokeColors: ["none"],
    fillColors: ["#2E2787"],
  },
  line: { strokeColors: ["#0a3977"], fillColors: [] },
  area: { strokeColors: ["#0a3977"], fillColors: ["#e2edfb"] },
});
const chartType = ref<string>(props.type);
const testData = reactive({
  options: {
    chart: {
      id: props.title,
      width: "100%",
      zoom: true,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      labels: {
        formatter: (val: any) => {
          return ["bar", "area"].includes(props.type) ? val.toFixed(2) : val;
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      show: true,
      lineCap: "butt",
      colors: chartColors[chartType.value].strokeColors,
    },
    theme: {
      mode: "light",
      //   More options on https://apexcharts.com/docs/options/theme/
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      colors: chartColors[chartType.value].fillColors,
      opacity: 0.9,
      type: props.type === "bar" ? "solid" : "gradient",
    },
  },
  series: [
    {
      name: props.title,
      data: props.data[props.title],
    },
  ],
});
</script>
<style scoped></style>
