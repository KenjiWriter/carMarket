<template>
  <q-layout view="hHh LpR lff">
    <TopBar @open-auth-modal="openAuthModal" />
    <Sidebar v-model="drawer" @open-auth-modal="openAuthModal" />
    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
    <AuthModal v-model="showAuthModal" @authenticated="onAuthenticated" />
    
    <!-- Loading overlay -->
    <q-dialog v-model="loading" persistent>
      <q-card class="bg-transparent shadow-0">
        <q-card-section class="flex flex-center">
          <q-spinner-dots color="primary" size="80px" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref, provide } from 'vue';
import { useQuasar } from 'quasar';
import TopBar from './TopBar.vue';
import Sidebar from './Sidebar.vue';
import AuthModal from './AuthModal.vue';

// Quasar notification system
const $q = useQuasar();

// Define reactive state
const drawer = ref(false);
const showAuthModal = ref(false);
const loading = ref(false);

// Methods
const openAuthModal = () => {
  showAuthModal.value = true;
};

const onAuthenticated = () => {
  // Handle the authenticated event (e.g., refresh user state)
  showAuthModal.value = false;
};

// Loading methods
const showLoading = () => {
  loading.value = true;
};

const hideLoading = () => {
  loading.value = false;
};

// Notification methods
const notify = (message, options = {}) => {
  const defaults = {
    message,
    color: 'primary',
    position: 'bottom-right',
    timeout: 3000
  };
  
  $q.notify({
    ...defaults,
    ...options
  });
};

// Provide these methods to child components
provide('showLoading', showLoading);
provide('hideLoading', hideLoading);
provide('notify', notify);
</script>

<style scoped>
.q-layout {
  min-height: 100vh;
}
</style>
