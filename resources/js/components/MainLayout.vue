<template>
    <q-layout view="hHh LpR lff">
      <TopBar @open-auth-modal="openAuthModal" />
      <Sidebar v-model="drawer" @open-auth-modal="openAuthModal" />
      <q-page-container class="bg-grey-1">
        <router-view />
      </q-page-container>

      <AuthModal
        v-model="showAuthModal"
        @authenticated="handleAuthenticated"
      />
    </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import TopBar from './TopBar.vue';
import Sidebar from './Sidebar.vue';
import AuthModal from './AuthModal.vue';

const drawer = ref(false);
const showAuthModal = ref(false);

const openAuthModal = () => {
  showAuthModal.value = true;
};

const handleAuthenticated = () => {
  showAuthModal.value = false;
};
</script>

<style scoped>
.q-layout {
  min-height: 100vh;
}
</style>
