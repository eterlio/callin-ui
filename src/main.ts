import { createApp } from 'vue'
import "./index.css";
import "./style/dashboard.css";
import "./style/custom.css";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import App from "./App.vue";
import VueFeather from "vue-feather";
import router from "./routes/index";
import { createPinia } from "pinia";
import { Row, Column, Hidden } from "vue-grid-responsive";
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);
const pinia = createPinia();
app.component(VueFeather.name, VueFeather);
app.component("EasyDataTable", Vue3EasyDataTable);
app.component("row", Row);
app.component("column", Column);
app.component("hidden", Hidden);
app.component("apexchart", VueApexCharts);
// app.use(VueApexCharts);
app.use(router);
app.use(pinia);
app.mount("#app");
