import { createI18n } from "vue-i18n";

import uz from "@/locales/uz.json";
import ru from "@/locales/ru.json";
import en from "@/locales/en.json";
import tr from "@/locales/tr.json";


const messages = {
    uz: uz,
    ru: ru,
    en: en,
    tr: tr,
};

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: localStorage.getItem("locale") || "ru",
    messages,
});
if (!localStorage.getItem("locale")) localStorage.setItem("locale", "ru");
export default i18n;
