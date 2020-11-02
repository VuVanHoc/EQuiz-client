import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import language from "../utils/languages.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: language,
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
