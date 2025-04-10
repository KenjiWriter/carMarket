import { createApp } from 'vue';
import { Quasar } from 'quasar';
import App from './components/App.vue';
import axios from 'axios';

import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';
import router from './router';

// Konfiguracja axios
axios.defaults.baseURL = '/api';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;

const app = createApp(App);

app.use(Quasar, {
  config: {
    brand: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      accent: '#FFE66D',
      positive: '#2ECC71',
      negative: '#E74C3C',
      info: '#3498DB',
      warning: '#F1C40F'
    }
  }
});

app.use(router);
app.mount('#app');
