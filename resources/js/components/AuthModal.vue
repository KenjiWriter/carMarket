<template>
  <div id="auth" class="car-market-app">
    

   

    <!-- Login Modal -->
    <div v-if="showLoginModal" class="modal-overlay" @click.self="closeLoginModal">
      <div class="modal-content">
        <h2>Logowanie</h2>
        <form @submit.prevent="handleLogin">
          <div v-if="loginError" class="error-message">{{ loginError }}</div>
          <div class="form-group">
            <q-icon name="email" class="form-icon" />
            <input type="email" v-model="loginForm.email" placeholder="Email" required>
          </div>
          <div class="form-group">
            <q-icon name="lock" class="form-icon" />
            <input type="password" v-model="loginForm.password" placeholder="Hasło" required>
          </div>
          <button type="submit" :disabled="isLoading">
            {{ isLoading ? 'Logowanie...' : 'Zaloguj się' }}
          </button>
        </form>
        <p>Nie masz konta? <button @click="switchToRegister" class="link-button">Zarejestruj się</button></p>
        <button @click="closeLoginModal" class="close-button">
          <q-icon name="close" />
        </button>
      </div>
    </div>

    <!-- Registration Modal -->
    <div v-if="showRegisterModal" class="modal-overlay" @click.self="closeRegisterModal">
      <div class="modal-content">
        <h2>Rejestracja</h2>
        <form @submit.prevent="handleRegister">
          <div v-if="registerError" class="error-message">{{ registerError }}</div>
          <div class="form-group">
            <q-icon name="person" class="form-icon" />
            <input type="text" v-model="registerForm.name" placeholder="Nazwa użytkownika" required>
          </div>
          <div class="form-group">
            <q-icon name="email" class="form-icon" />
            <input type="email" v-model="registerForm.email" placeholder="Email" required>
          </div>
          <div class="form-group">
            <q-icon name="lock" class="form-icon" />
            <input type="password" v-model="registerForm.password" placeholder="Hasło" required>
          </div>
          <div class="form-group">
            <q-icon name="lock" class="form-icon" />
            <input type="password" v-model="registerForm.password_confirmation" placeholder="Potwierdź hasło" required>
          </div>
          <button type="submit" :disabled="isLoading">
            {{ isLoading ? 'Rejestracja...' : 'Zarejestruj się' }}
          </button>
        </form>
        <p>Masz już konto? <button @click="switchToLogin" class="link-button">Zaloguj się</button></p>
        <button @click="closeRegisterModal" class="close-button">
          <q-icon name="close" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import authService from '../services/authService';

export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'authenticated'],
  
  setup(props, { emit }) {
    // State
    const showLoginModal = ref(true);
    const showRegisterModal = ref(false);
    const isLoading = ref(false);
    const loginError = ref('');
    const registerError = ref('');
    
    // Form data
    const loginForm = ref({
      email: '',
      password: ''
    });
    
    const registerForm = ref({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    });
    
    // Watch for parent v-model changes
    watch(() => props.modelValue, (newVal) => {
      if (newVal) {
        showLoginModal.value = true;
        showRegisterModal.value = false;
      } else {
        showLoginModal.value = false;
        showRegisterModal.value = false;
      }
    });
    
    // Methods
    const closeLoginModal = () => {
      emit('update:modelValue', false);
    };
    
    const closeRegisterModal = () => {
      emit('update:modelValue', false);
    };
    
    const switchToRegister = () => {
      showLoginModal.value = false;
      showRegisterModal.value = true;
    };
    
    const switchToLogin = () => {
      showLoginModal.value = true;
      showRegisterModal.value = false;
    };
    
    const handleLogin = async () => {
      try {
        isLoading.value = true;
        loginError.value = '';
        
        await authService.login(loginForm.value);
        emit('authenticated');
        emit('update:modelValue', false);
      } catch (error) {
        loginError.value = error.response?.data?.message || 'Błąd logowania. Spróbuj ponownie.';
      } finally {
        isLoading.value = false;
      }
    };
    
    const handleRegister = async () => {
      try {
        isLoading.value = true;
        registerError.value = '';
        
        await authService.register(registerForm.value);
        emit('authenticated');
        emit('update:modelValue', false);
      } catch (error) {
        registerError.value = error.response?.data?.message || 'Błąd rejestracji. Spróbuj ponownie.';
      } finally {
        isLoading.value = false;
      }
    };
    
    return {
      showLoginModal,
      showRegisterModal,
      isLoading,
      loginError,
      registerError,
      loginForm,
      registerForm,
      closeLoginModal,
      closeRegisterModal,
      switchToRegister,
      switchToLogin,
      handleLogin,
      handleRegister
    };
  }
};
</script>