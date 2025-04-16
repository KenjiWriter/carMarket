<template>
    <q-layout view="hHh LpR lff">
      <TopBar @toggle-drawer="toggleDrawer" />
      <Sidebar v-model="drawer" />
      <q-page-container class="bg-grey-1">
        <router-view />
      </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import TopBar from './TopBar.vue';
import Sidebar from './Sidebar.vue'; 

const drawer = ref(false);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>

<style scoped>
.q-layout {
  min-height: 100vh;
}
</style>
