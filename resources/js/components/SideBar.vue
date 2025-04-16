<template>
  <q-drawer
    show-if-above
    v-model="drawer"
    side="left"
    bordered
    class="modern-sidebar q-drawer--professional"
    :width="250"
  >
    <q-scroll-area class="fit">
      <div class="q-pa-md text-center">
        <div class="text-h6 text-weight-bold company-title">Car Market</div>
      </div>

      <q-list padding class="menu-list">
        <!-- Menu główne -->
        <q-item clickable v-ripple to="/" class="menu-item">
          <q-item-section avatar>
            <q-icon name="home" color="grey-7"/>
          </q-item-section>
          <q-item-section>Główna</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/oferty" class="menu-item search-item">
          <q-item-section avatar>
            <q-icon name="search" color="primary"/>
          </q-item-section>
          <q-item-section>
            <div class="search-text">Ogłoszenia</div>
          </q-item-section>
        </q-item>

        <template v-if="isAuthenticated">
          <q-item clickable v-ripple to="/dodaj" class="menu-item">
            <q-item-section avatar>
              <q-icon name="add_box" color="grey-7"/>
            </q-item-section>
            <q-item-section>Dodaj ogłoszenie</q-item-section>
          </q-item>
        </template>
        <template v-else>
           <q-item clickable v-ripple @click="openAuthModal" class="menu-item">
            <q-item-section avatar>
              <q-icon name="login" color="grey-7"/>
            </q-item-section>
            <q-item-section>Logowanie/Rejestracja</q-item-section>
          </q-item>
        </template>

        <q-separator class="q-my-md" />

        <!-- Uproszczone kategorie -->
        <q-item clickable v-ripple class="menu-item">
          <q-item-section avatar>
            <q-icon name="directions_car" color="grey-7"/>
          </q-item-section>
          <q-item-section>Osobowe</q-item-section>
        </q-item>

        <q-item clickable v-ripple class="menu-item">
          <q-item-section avatar>
            <q-icon name="local_shipping" color="grey-7"/>
          </q-item-section>
          <q-item-section>Dostawcze</q-item-section>
        </q-item>

        <q-item clickable v-ripple class="menu-item">
          <q-item-section avatar>
            <q-icon name="two_wheeler" color="grey-7"/>
          </q-item-section>
          <q-item-section>Motocykle</q-item-section>
        </q-item>

        <q-item clickable v-ripple class="menu-item">
          <q-item-section avatar>
            <q-icon name="build" color="grey-7"/>
          </q-item-section>
          <q-item-section>Części</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { ref, computed } from 'vue';
import authService from '../services/authService';

const drawer = ref(true);

const emit = defineEmits(['update:modelValue', 'open-auth-modal']);

const isAuthenticated = computed(() => authService.isAuthenticated());

const openAuthModal = () => {
  emit('open-auth-modal');
};
</script>

<style scoped>
.modern-sidebar {
  background: #f8f9fa;
  box-shadow: 1px 0 2px rgba(0, 0, 0, 0.1);
}

.company-title {
  color: #2c3e50;
  font-size: 1.5rem;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
}

.menu-list {
  padding-top: 8px;
}

.menu-item {
  border-radius: 8px;
  margin: 4px 8px;
  min-height: 44px;
  color: #445566;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background: #e9ecef;
  transform: translateX(2px);
}

.search-item {
  background: #f1f5f9;
  margin: 8px 8px;
}

.search-item:hover {
  background: #e2e8f0;
}

.search-text {
  font-weight: 500;
  color: #334155;
}

.search-item.q-router-link-active {
  background: #2563eb15;
  border-left: 3px solid #2563eb;
}

.q-item.menu-item.q-router-link-active {
  background: #3498db15;
  color: #2c3e50;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.q-item__section--avatar {
  min-width: 40px;
}

.q-item__section--avatar .q-icon {
  font-size: 1.25rem;
  color: #3498db;
}

.q-separator {
  background: #dee2e6;
  height: 1px;
  opacity: 0.5;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f8f9fa;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>
