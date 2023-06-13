import { createApp } from "vue";
import "./index.css";
import "./style/dashboard.css";
import "./style/custom.css";
import "./style/authentication.css";
import "./style/plan.css";
import "./style/toast.css";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import App from "./App.vue";
import VueFeather from "vue-feather";
import router from "./routes/index";
import { createPinia } from "pinia";
import { Row, Column, Hidden } from "vue-grid-responsive";
import VueApexCharts from "vue3-apexcharts";
import Toast, { PluginOptions } from "vue-toastification";
import DashboardWrapper from "./components/DashboardWrapper.vue";
import Wrapper from "./components/Wrapper.vue";
import FormInput from "./formBuilder/FormInput.vue";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options: PluginOptions = {
  // You can set your default options here
  containerClassName: "toast",
  hideProgressBar: true,
  timeout: 5000,
};

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(Toast, options);
app.use(router);
app.component(VueFeather.name, VueFeather);
app.component("EasyDataTable", Vue3EasyDataTable);
app.component("row", Row);
app.component("column", Column);
app.component("hidden", Hidden);
app.component("apexchart", VueApexCharts);
app.component("PageWrapper", Wrapper);
app.component("DashboardWrapper", DashboardWrapper);
app.component("FormInput", FormInput);
// app.use(VueApexCharts);
app.mount("#app");
