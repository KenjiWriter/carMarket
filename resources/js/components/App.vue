<template>
  <div id="app" class="car-market-app">
    <Header 
      @open-login="openLoginModal"
      @open-add-advert="openAddAdvertModal" 
    />
    <main class="main-content">
      <SearchBar />
      <CarList :cars="cars" @show-car-details="showCarDetails" />
    </main>
    
    <Footer />

    <!-- Ad Detail Modal -->
    <ad-detail-modal
      v-if="selectedCar"
      v-model="showDetailModal"
      :ad="selectedCar"
      @close="closeDetailModal"
    />

    <!-- Add Advertisement Modal -->
    <add-advertisement
      v-if="showAddAdvertModal"
      @close="closeAddAdvertModal"
    />

    <!-- Login Modal -->
    <div v-if="showLoginModal" class="modal-overlay" @click.self="closeLoginModal">
      <div class="modal-content">
        <h2>Logowanie</h2>
        <!-- Placeholder for Login Form -->
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <q-icon name="email" class="form-icon" />
            <input type="email" placeholder="Email" required>
          </div>
          <div class="form-group">
            <q-icon name="lock" class="form-icon" />
            <input type="password" placeholder="Hasło" required>
          </div>
          <button type="submit">Zaloguj się</button>
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
        <!-- Placeholder for Registration Form -->
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <q-icon name="person" class="form-icon" />
            <input type="text" placeholder="Nazwa użytkownika" required>
          </div>
          <div class="form-group">
            <q-icon name="email" class="form-icon" />
            <input type="email" placeholder="Email" required>
          </div>
          <div class="form-group">
            <q-icon name="lock" class="form-icon" />
            <input type="password" placeholder="Hasło" required>
          </div>
          <div class="form-group">
            <q-icon name="lock" class="form-icon" />
            <input type="password" placeholder="Potwierdź hasło" required>
          </div>
          <button type="submit">Zarejestruj się</button>
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
import Header from './Header.vue';
import SearchBar from './SearchBar.vue';
import CarList from './CarList.vue';
import AdDetailModal from './AdDetailModal.vue';
import AddAdvertisement from './AddAdvertisement.vue';
import Footer from './Footer.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    Header,
    SearchBar,
    CarList,
    AdDetailModal,
    AddAdvertisement,
    Footer
  },
  data() {
    return {
      cars: [],
      showLoginModal: false,
      showRegisterModal: false,
      showDetailModal: false,
      showAddAdvertModal: false,
      selectedCar: null
    };
  },
  methods: {
    async fetchCars() {
      try {
        const response = await axios.get('/cars');
        this.cars = response.data.map(car => {
          return {
            id: car.id,
            title: `${car.brand} ${car.model} ${car.year}`,
            price: this.formatPrice(car.price),
            location: 'Warszawa', // Default location as it's not in API
            image: car.image ? `./images/${car.image}` : `https://via.placeholder.com/300x200?text=${car.brand}+${car.model}`,
            date: this.formatDate(car.created_at),
            images: [
              car.image ? `./images/${car.image}` : `https://via.placeholder.com/600x400?text=${car.brand}+${car.model}`, 
              `https://via.placeholder.com/600x400?text=${car.brand}+${car.model}+Interior`
            ],
            details: {
              'Marka': car.brand,
              'Model': car.model,
              'Rok produkcji': car.year.toString(),
              'Przebieg': `${car.mileage} km`,
              'Rodzaj paliwa': car.fuel_type
            },
            description: car.description,
            seller: {
              name: 'Sprzedawca',
              memberSince: 'Styczeń 2023',
              rating: 4.8,
              reviewCount: 12,
              phone: '+48 555 123 456'
            }
          };
        });
        console.log('Fetched cars:', this.cars);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    },
    formatPrice(price) {
      return Number(price).toLocaleString('pl-PL');
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Dzisiaj';
      if (diffDays === 1) return 'Wczoraj';
      if (diffDays < 7) return `${diffDays} dni temu`;
      return date.toLocaleDateString('pl-PL');
    },
    showCarDetails(car) {
      console.log('Opening car details:', car.title);
      this.selectedCar = car;
      this.showDetailModal = true;
    },
    closeDetailModal() {
      console.log('Closing detail modal');
      this.showDetailModal = false;
      setTimeout(() => {
        this.selectedCar = null;
      }, 300);
    },
    openLoginModal() {
      this.showLoginModal = true;
      this.showRegisterModal = false;
    },
    closeLoginModal() {
      this.showLoginModal = false;
    },
    openRegisterModal() {
      this.showRegisterModal = true;
      this.showLoginModal = false;
    },
    closeRegisterModal() {
      this.showRegisterModal = false;
    },
    switchToRegister() {
      this.closeLoginModal();
      this.openRegisterModal();
    },
    switchToLogin() {
      this.closeRegisterModal();
      this.openLoginModal();
    },
    handleLogin() {
      console.log('Login attempt');
      this.closeLoginModal();
    },
    handleRegister() {
      console.log('Register attempt');
      this.closeRegisterModal();
    },
    openAddAdvertModal() {
      console.log('Opening add advertisement modal');
      this.showAddAdvertModal = true;
    },
    closeAddAdvertModal() {
      console.log('Closing add advertisement modal');
      this.showAddAdvertModal = false;
    }
  },
  mounted() {
    this.fetchCars();
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fa;
  color: #2c3e50;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  flex: 1;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background-color: #1D3557;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
  min-width: 320px;
  max-width: 500px;
  position: relative;
  text-align: center;
  animation: slideIn 0.3s ease;
  color: white;
}

@keyframes slideIn {
  from { transform: translateY(-30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-content h2 {
  margin-top: 0;
  color: white;
  margin-bottom: 25px;
  font-weight: 500;
}

.modal-content form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.form-group {
  position: relative;
}

.form-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.modal-content input[type="text"],
.modal-content input[type="email"],
.modal-content input[type="password"] {
  padding: 12px 12px 12px 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s;
  background-color: rgba(255, 255, 255, 0.9);
}

.modal-content input:focus {
  border-color: #1976D2;
  outline: none;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
}

.modal-content button[type="submit"] {
  padding: 12px;
  background-color: #1976D2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  font-weight: 500;
}

.modal-content button[type="submit"]:hover {
  background-color: #1565C0;
}

.modal-content .link-button {
  background: none;
  border: none;
  color: #A8DADC;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  font-size: 0.9rem;
}

.modal-content .link-button:hover {
  color: white;
}

.modal-content .close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #A8DADC;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.modal-content .close-button:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
