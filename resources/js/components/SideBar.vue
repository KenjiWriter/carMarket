<template>
    <q-drawer show-if-above v-model="drawer" side="left" bordered>
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item-label header>Menu</q-item-label>
          <q-item clickable v-ripple to="/">
            <q-item-section avatar><q-icon name="home" /></q-item-section>
            <q-item-section>Strona główna</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/oferty">
            <q-item-section avatar><q-icon name="directions_car" /></q-item-section>
            <q-item-section>Przeglądaj oferty</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/dodaj">
            <q-item-section avatar><q-icon name="add" /></q-item-section>
            <q-item-section>Dodaj ogłoszenie</q-item-section>
          </q-item>
  
          <q-separator spaced />
          <q-item-label header>Kategorie</q-item-label>
          <q-item clickable v-ripple><q-item-section avatar><q-icon name="time_to_leave" /></q-item-section><q-item-section>Samochody osobowe</q-item-section></q-item>
          <q-item clickable v-ripple><q-item-section avatar><q-icon name="local_shipping" /></q-item-section><q-item-section>Samochody dostawcze</q-item-section></q-item>
          <q-item clickable v-ripple><q-item-section avatar><q-icon name="two_wheeler" /></q-item-section><q-item-section>Motocykle</q-item-section></q-item>
          <q-item clickable v-ripple><q-item-section avatar><q-icon name="build" /></q-item-section><q-item-section>Części i akcesoria</q-item-section></q-item>
  
          <q-separator spaced />
          <q-item-label header>Informacje</q-item-label>
          <q-item clickable v-ripple><q-item-section avatar><q-icon name="info" /></q-item-section><q-item-section>O nas</q-item-section></q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const drawer = ref(true);
  </script>
  