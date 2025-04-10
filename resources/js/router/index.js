import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../components/MainLayout.vue';
import Home from '../components/Home.vue';

// Tymczasowo używamy Home.vue jako placeholder dla innych podstron
const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'oferty',
        component: Home // możesz później podmienić na Oferty.vue
      },
      {
        path: 'dodaj',
        component: Home // możesz później podmienić na Dodaj.vue
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
