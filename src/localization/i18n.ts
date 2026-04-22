import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import de from "./de.json";
import ar from "./ar.json";
import es from "./es.json";
import it from "./it.json";
import hi from "./hi.json";
import fr from "./fr.json";

const LANGUAGES = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
  de: {
    translation: de,
  },
  it: {
    translation: it,
  },
  es: {
    translation: es,
  },
  hi: {
    translation: hi,
  },
  fr: {
    translation: fr,
  },
};

i18n.use(initReactI18next).init({
  resources: LANGUAGES,
  fallbackLng: "de",
  defaultNS: "translation",
  ns: ["translation"],
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
