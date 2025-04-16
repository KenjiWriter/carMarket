<template>
  <q-header elevated class="bg-white text-primary">
    <q-toolbar>
      <q-toolbar-title>
        <router-link to="/" class="text-primary text-weight-bold" style="text-decoration: none;">
          CarMarket
        </router-link>
      </q-toolbar-title>

      <q-space />

      <div class="row items-center q-gutter-sm">
        <template v-if="isAuthenticated">
          <q-btn
            flat
            color="primary"
            icon="add"
            label="Dodaj ogłoszenie"
            @click="goToAddListing"
          />
          <q-btn-dropdown flat color="primary" :label="userName">
            <q-list>
              <q-item clickable v-close-popup @click="goToProfile">
                <q-item-section>
                  <q-item-label>Mój profil</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="goToMyListings">
                <q-item-section>
                  <q-item-label>Moje ogłoszenia</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="logout">
                <q-item-section>
                  <q-item-label>Wyloguj się</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </template>
        <template v-else>
          <q-btn
            flat
            color="primary"
            label="Logowanie/Rejestracja"
            @click="$emit('open-auth-modal')"
          />
        </template>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import authService from '../services/authService';

defineEmits(['open-auth-modal']);

const router = useRouter();
const $q = useQuasar();

const isAuthenticated = computed(() => authService.isAuthenticated());
const userName = computed(() => {
  const user = authService.getCurrentUser();
  return user ? user.name : '';
});

const goToAddListing = () => {
  router.push('/dodaj');
};

const goToProfile = () => {
  router.push('/profil');
};

const goToMyListings = () => {
  router.push('/moje-ogloszenia');
};

const logout = async () => {
  try {
    await authService.logout();
    $q.notify({
      color: 'positive',
      message: 'Wylogowano pomyślnie'
    });
    router.push('/');
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: 'Wystąpił błąd podczas wylogowywania'
    });
  }
};
</script>