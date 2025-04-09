import { createApp } from 'vue';
import { Quasar } from 'quasar';
import App from './components/App.vue';

// Importy Quasar - zmieniona kolejność i podejście do importu stylów
import '@quasar/extras/material-icons/material-icons.css';
// Zamiast importu index.sass, użyjmy pliku CSS
import 'quasar/dist/quasar.css';

const app = createApp(App);

app.use(Quasar, {
  plugins: {},
  config: {
    brand: {
      primary: '#1976D2',
      secondary: '#26A69A',
      accent: '#9C27B0',
      dark: '#1d1d1d',
      'dark-page': '#121212',
      positive: '#21BA45',
      negative: '#C10015',
      info: '#31CCEC',
      warning: '#F2C037'
    }
  }
});

app.mount('#app');