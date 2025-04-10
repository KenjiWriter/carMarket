import { createApp } from 'vue';
import { Quasar } from 'quasar';
import App from './components/App.vue';

import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';
import router from './router';

const app = createApp(App);

app.use(Quasar, {
  config: {
    brand: {
      primary: '#2196F3',
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
