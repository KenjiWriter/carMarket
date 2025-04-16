<!-- filepath: c:\xampp\htdocs\carMarket\src\App.vue -->
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
      cars: [
        { 
          id: 1, 
          title: 'Ford Focus 2018', 
          price: '55 000', 
          location: 'Warszawa', 
          image: 'https://via.placeholder.com/300x200?text=Ford+Focus', 
          date: 'Dzisiaj 14:30',
          images: ['https://via.placeholder.com/600x400?text=Ford+Focus', 'https://via.placeholder.com/600x400?text=Ford+Focus+Interior'],
          details: {
            'Marka': 'Ford',
            'Model': 'Focus',
            'Rok produkcji': '2018',
            'Przebieg': '75 000 km',
            'Pojemność skokowa': '1.6L',
            'Rodzaj paliwa': 'Benzyna'
          },
          description: 'Ford Focus w świetnym stanie technicznym. Regularnie serwisowany, pierwszy właściciel, bezwypadkowy.',
          seller: {
            name: 'Adam Nowak',
            memberSince: 'Maj 2020',
            rating: 4.9,
            reviewCount: 15,
            phone: '+48 555 123 456'
          }
        },
        { 
          id: 2, 
          title: 'Opel Astra 2016', 
          price: '42 000', 
          location: 'Kraków', 
          image: 'https://via.placeholder.com/300x200?text=Opel+Astra', 
          date: 'Wczoraj 10:15',
          images: ['https://via.placeholder.com/600x400?text=Opel+Astra', 'https://via.placeholder.com/600x400?text=Opel+Astra+Interior'],
          details: {
            'Marka': 'Opel',
            'Model': 'Astra',
            'Rok produkcji': '2016',
            'Przebieg': '98 000 km',
            'Pojemność skokowa': '1.4L',
            'Rodzaj paliwa': 'Benzyna'
          },
          description: 'Opel Astra w dobrym stanie, regularnie serwisowany. Drugi właściciel, garażowany.',
          seller: {
            name: 'Piotr Kowalski',
            memberSince: 'Styczeń 2019',
            rating: 4.7,
            reviewCount: 8,
            phone: '+48 555 789 012'
          }
        },
        { 
          id: 3, 
          title: 'Volkswagen Golf 2019', 
          price: '68 000', 
          location: 'Gdańsk', 
          image: 'https://via.placeholder.com/300x200?text=VW+Golf', 
          date: '2 dni temu',
          images: ['https://via.placeholder.com/600x400?text=VW+Golf', 'https://via.placeholder.com/600x400?text=VW+Golf+Interior'],
          details: {
            'Marka': 'Volkswagen',
            'Model': 'Golf',
            'Rok produkcji': '2019',
            'Przebieg': '45 000 km',
            'Pojemność skokowa': '1.5L',
            'Rodzaj paliwa': 'Benzyna'
          },
          description: 'Volkswagen Golf w idealnym stanie, pełna dokumentacja serwisowa, pierwszy właściciel.',
          seller: {
            name: 'Marta Wiśniewska',
            memberSince: 'Czerwiec 2017',
            rating: 4.9,
            reviewCount: 22,
            phone: '+48 555 345 678'
          }
        }
      ],
      showLoginModal: false,
      showRegisterModal: false,
      showDetailModal: false,
      showAddAdvertModal: false,
      selectedCar: null
    };
  },
  methods: {
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