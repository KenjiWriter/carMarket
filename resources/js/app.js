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
      primary: '#1D3557',       
      secondary: '#26A69A',     
      accent: '#9C27B0',        
      positive: '#21BA45',
      negative: '#C10015',
      info: '#31CCEC',
      warning: '#F2C037'
    }
  }
});

app.use(router);
app.mount('#app');
