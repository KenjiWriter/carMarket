<template>
    <q-layout view="hHh LpR lff">
      <TopBar />
      <SideBar />
      <q-page-container class="bg-grey-1">
        <router-view />
      </q-page-container>
    </q-layout>
</template>

<script setup>
import TopBar from './TopBar.vue';
import SideBar from './SideBar.vue';
</script>

<style scoped>
.q-layout {
  min-height: 100vh;
}
</style>
