import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "./store/productStore";
import router from "./router/router";

createApp(App).use(store).mount("#app");


const app = createApp(App);

app.use(router);

app.mount('#app');