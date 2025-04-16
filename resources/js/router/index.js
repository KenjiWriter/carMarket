import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../components/MainLayout.vue';
import HomePage from '../pages/HomePage.vue';

// Tymczasowo używamy HomePage jako placeholder dla innych podstron
const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        component: HomePage
      },
      {
        path: 'oferty',
        component: HomePage // możesz później podmienić na Oferty.vue
      },
      {
        path: 'dodaj',
        component: HomePage // możesz później podmienić na Dodaj.vue
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
