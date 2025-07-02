import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus, {ElNotification} from "element-plus";
import "element-plus/dist/index.css";
import "vue3-toastify/dist/index.css";



import App from "./App.vue";
import router from "./router";
import i18N from "@/plugins/i18-n";

const app = createApp(App);


app.use(i18N);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount("#app");

window.addEventListener('offline', function() {
    ElNotification({
        title: "Error",
        message: "Нет подключения к Интернету. Пожалуйста, переподключитесь.",
        type: "error",
    });
});

window.addEventListener('online', function() {
    ElNotification({
        title: "Success",
        message: "Подключение к Интернету восстановлено.",
        type: "success",
    });
});