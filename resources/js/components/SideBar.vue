<template>
  <q-drawer
    show-if-above
    v-model="drawer"
    side="left"
    bordered
    class="modern-sidebar"
    :width="280"
  >
    <q-scroll-area class="fit">
      <div class="q-pa-md text-center">
        <q-avatar size="80px" class="q-mb-sm">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
        <div class="text-weight-bold">Car Market</div>
        <div class="text-caption text-grey">Panel nawigacyjny</div>
      </div>

      <q-list padding separator>
        <!-- Menu główne -->
        <q-item-label header class="text-weight-bold text-primary q-mt-md">
          Menu główne
        </q-item-label>
        
        <q-item clickable v-ripple to="/" class="menu-item">
          <q-item-section avatar>
            <q-icon name="home" color="primary"/>
          </q-item-section>
          <q-item-section>Strona główna</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/oferty" class="menu-item">
          <q-item-section avatar>
            <q-icon name="directions_car" color="secondary"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Przeglądaj oferty</q-item-label>
            <q-item-label caption>Wszystkie ogłoszenia</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/dodaj" class="menu-item q-mb-md">
          <q-item-section avatar>
            <q-icon name="add_circle" color="positive"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Dodaj ogłoszenie</q-item-label>
            <q-item-label caption>Sprzedaj swój samochód</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Kategorie -->
        <q-item-label header class="text-weight-bold text-primary q-mt-md">
          Kategorie pojazdów
        </q-item-label>

        <q-expansion-item
          icon="time_to_leave"
          label="Samochody osobowe"
          caption="Najpopularniejsza kategoria"
          expand-separator
        >
          <q-list class="q-pl-lg">
            <q-item clickable v-ripple dense class="menu-item">
              <q-item-section>SUV</q-item-section>
            </q-item>
            <q-item clickable v-ripple dense class="menu-item">
              <q-item-section>Sedan</q-item-section>
            </q-item>
            <q-item clickable v-ripple dense class="menu-item">
              <q-item-section>Kombi</q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-expansion-item
          icon="local_shipping"
          label="Samochody dostawcze"
          expand-separator
        >
          <q-list class="q-pl-lg">
            <q-item clickable v-ripple dense class="menu-item">
              <q-item-section>Do 3.5t</q-item-section>
            </q-item>
            <q-item clickable v-ripple dense class="menu-item">
              <q-item-section>Powyżej 3.5t</q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-item clickable v-ripple class="menu-item">
          <q-item-section avatar>
            <q-icon name="two_wheeler" color="orange"/>
          </q-item-section>
          <q-item-section>Motocykle</q-item-section>
        </q-item>

        <q-item clickable v-ripple class="menu-item">
          <q-item-section avatar>
            <q-icon name="build" color="grey"/>
          </q-item-section>
          <q-item-section>Części i akcesoria</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { ref } from 'vue';
const drawer = ref(true);
</script>

<style scoped>
.modern-sidebar {
  background: #f8f9fa;
}

.menu-item {
  border-radius: 8px;
  margin: 0 8px;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background: rgba(0,0,0,0.05);
}

.q-item.menu-item.q-router-link-active {
  background: rgba(25, 118, 210, 0.1);
}

.q-list.separator > .q-item-type + .q-item-type {
  border-top: 1px solid rgba(0,0,0,0.05);
}
</style>
