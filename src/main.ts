// import { vue } from '@vitejs/plugin-vue';
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import "./assets/tailwind.css"


const app = createApp(App);
app.use(ElementPlus);
app.mount("#app");
