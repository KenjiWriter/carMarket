<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="min-width: 350px">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ isLogin ? 'Logowanie' : 'Rejestracja' }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleSubmit" class="q-gutter-md">
          <q-input
            v-model="form.email"
            label="Email"
            type="email"
            :rules="[val => !!val || 'Email jest wymagany']"
            dense
            outlined
          />

          <q-input
            v-model="form.password"
            label="Hasło"
            :type="isPasswordVisible ? 'text' : 'password'"
            :rules="[val => !!val || 'Hasło jest wymagane']"
            dense
            outlined
          >
            <template v-slot:append>
              <q-icon
                :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPasswordVisible = !isPasswordVisible"
              />
            </template>
          </q-input>

          <template v-if="!isLogin">
            <q-input
              v-model="form.name"
              label="Imię"
              :rules="[val => !!val || 'Imię jest wymagane']"
              dense
              outlined
            />

            <q-input
              v-model="form.password_confirmation"
              label="Potwierdź hasło"
              :type="isPasswordVisible ? 'text' : 'password'"
              :rules="[
                val => !!val || 'Potwierdzenie hasła jest wymagane',
                val => val === form.password || 'Hasła muszą być identyczne'
              ]"
              dense
              outlined
            />
          </template>

          <div class="text-center q-mt-md">
            <q-btn
              type="submit"
              color="primary"
              :label="isLogin ? 'Zaloguj się' : 'Zarejestruj się'"
              class="full-width"
              :loading="loading"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions align="center" class="q-pb-md">
        <q-btn
          flat
          color="primary"
          :label="isLogin ? 'Nie masz konta? Zarejestruj się' : 'Masz już konto? Zaloguj się'"
          @click="toggleMode"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useQuasar } from 'quasar';
import authService from '../services/authService';

const $q = useQuasar();
const emit = defineEmits(['authenticated', 'update:modelValue']);

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});

const showModal = ref(props.modelValue);
const isLogin = ref(true);
const loading = ref(false);
const isPasswordVisible = ref(false);

const form = reactive({
  email: '',
  password: '',
  name: '',
  password_confirmation: ''
});

const toggleMode = () => {
  isLogin.value = !isLogin.value;
  form.password = '';
  form.password_confirmation = '';
};

const handleSubmit = async () => {
  try {
    loading.value = true;
    if (isLogin.value) {
      await authService.login({
        email: form.email,
        password: form.password
      });
    } else {
      await authService.register({
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation
      });
    }
    
    $q.notify({
      color: 'positive',
      message: isLogin.value ? 'Zalogowano pomyślnie' : 'Zarejestrowano pomyślnie'
    });
    
    emit('authenticated');
    showModal.value = false;
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: error.response?.data?.message || 'Wystąpił błąd'
    });
  } finally {
    loading.value = false;
  }
};

watch(() => props.modelValue, (newVal) => {
  showModal.value = newVal;
});

watch(showModal, (newVal) => {
  emit('update:modelValue', newVal);
});
</script> 