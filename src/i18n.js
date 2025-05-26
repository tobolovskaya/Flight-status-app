import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: "Flight Status Checker",
      placeholderFlight: "Flight number (e.g. WF101)",
      date: "Date",
      button: "Find Flight",
      loading: "Loading...",
      noFlight: "Flight not found.",
      enterFlight: "Please enter flight number.",
      destination: "Destination",
      gate: "Gate",
      status: "Status",
      dateLabel: "Date",
      flightInfo: "Flight Info:"
    }
  },
  no: {
    translation: {
      title: "Flystatus-sjekker",
      placeholderFlight: "Flynummer (f.eks. WF101)",
      date: "Dato",
      button: "Finn fly",
      loading: "Laster...",
      noFlight: "Flyvning ikke funnet.",
      enterFlight: "Vennligst skriv inn flynummer.",
      destination: "Destinasjon",
      gate: "Gate",
      status: "Status",
      dateLabel: "Dato",
      flightInfo: "Flyinformasjon:"
    }
  },
  ua: {
    translation: {
      title: "Інформатор Статусу Рейсів",
      placeholderFlight: "Номер рейсу (напр. WF101)",
      date: "Дата",
      button: "Знайти Рейс",
      loading: "Завантаження...",
      noFlight: "Рейс не знайдено.",
      enterFlight: "Будь ласка, введіть номер рейсу.",
      destination: "Призначення",
      gate: "Вихід",
      status: "Статус",
      dateLabel: "Дата",
      flightInfo: "Інформація про рейс:"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ua',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
