import { createApp } from 'vue'
import "./index.css";
import "./style/dashboard.css";
import "./style/custom.css";
import App from "./App.vue";
import VueFeather from "vue-feather";
import router from "./routes/index";
import { createPinia } from "pinia";
const app = createApp(App);
const pinia = createPinia();
app.component(VueFeather.name, VueFeather);
app.use(router);
app.use(pinia);
app.mount("#app");
