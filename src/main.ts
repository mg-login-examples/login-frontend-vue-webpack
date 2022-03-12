import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "./styles/app.css";
import { createPinia } from "pinia";

createApp(App).use(createPinia()).use(router).mount("#app");
