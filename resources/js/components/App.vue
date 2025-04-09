<template>
    <q-layout view="hHh LpR fFf">
      <!-- Nagłówek -->
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
  
          <q-toolbar-title>
            Giełda Samochodowa
          </q-toolbar-title>
  
          <q-space />
  
          <!-- Wyszukiwarka -->
          <q-input dark dense standout v-model="search" input-class="text-right" class="q-mr-md">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
  
          <!-- Przycisk logowania / Avatar użytkownika -->
          <div v-if="!isLoggedIn">
            <q-btn flat label="Zaloguj się" @click="loginDialog = true" />
          </div>
          <div v-else>
            <q-btn flat round>
              <q-avatar size="28px">
                <img src="https://cdn.quasar.dev/img/avatar.png">
              </q-avatar>
              <q-menu>
                <q-list style="min-width: 150px">
                  <q-item clickable v-close-popup @click="onProfileClick">
                    <q-item-section>Profil</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="onMyAdsClick">
                    <q-item-section>Moje ogłoszenia</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-close-popup @click="onLogoutClick">
                    <q-item-section>Wyloguj</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-toolbar>
  
        <!-- Zakładki nawigacyjne -->
        <q-tabs align="left">
          <q-route-tab to="/" label="Strona główna" />
          <q-route-tab to="/oferty" label="Przeglądaj oferty" />
          <q-route-tab to="/dodaj" label="Dodaj ogłoszenie" />
          <q-route-tab to="/o-nas" label="O nas" />
          <q-route-tab to="/kontakt" label="Kontakt" />
        </q-tabs>
      </q-header>
  
      <!-- Boczna nawigacja -->
      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        class="bg-grey-1"
      >
        <q-list>
          <q-item-label header>Menu</q-item-label>
          
          <q-item clickable v-ripple to="/">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>Strona główna</q-item-section>
          </q-item>
  
          <q-item clickable v-ripple to="/oferty">
            <q-item-section avatar>
              <q-icon name="directions_car" />
            </q-item-section>
            <q-item-section>Przeglądaj oferty</q-item-section>
          </q-item>
  
          <q-item clickable v-ripple to="/dodaj">
            <q-item-section avatar>
              <q-icon name="add_circle" />
            </q-item-section>
            <q-item-section>Dodaj ogłoszenie</q-item-section>
          </q-item>
  
          <q-separator />
  
          <q-item-label header>Kategorie</q-item-label>
  
          <q-item clickable v-ripple to="/oferty/osobowe">
            <q-item-section avatar>
              <q-icon name="commute" />
            </q-item-section>
            <q-item-section>Samochody osobowe</q-item-section>
          </q-item>
  
          <q-item clickable v-ripple to="/oferty/dostawcze">
            <q-item-section avatar>
              <q-icon name="local_shipping" />
            </q-item-section>
            <q-item-section>Samochody dostawcze</q-item-section>
          </q-item>
  
          <q-item clickable v-ripple to="/oferty/motocykle">
            <q-item-section avatar>
              <q-icon name="two_wheeler" />
            </q-item-section>
            <q-item-section>Motocykle</q-item-section>
          </q-item>
  
          <q-item clickable v-ripple to="/oferty/czesci">
            <q-item-section avatar>
              <q-icon name="build" />
            </q-item-section>
            <q-item-section>Części i akcesoria</q-item-section>
          </q-item>
          
          <q-separator />
          
          <q-item-label header>Informacje</q-item-label>
  
          <q-item clickable v-ripple to="/o-nas">
            <q-item-section avatar>
              <q-icon name="info" />
            </q-item-section>
            <q-item-section>O nas</q-item-section>
          </q-item>
  
          <q-item clickable v-ripple to="/kontakt">
            <q-item-section avatar>
              <q-icon name="contact_support" />
            </q-item-section>
            <q-item-section>Kontakt</q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
  
      <!-- Główna zawartość -->
      <q-page-container>
        <div class="q-pa-md">
          <!-- Baner główny -->
          <q-carousel
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            swipeable
            animated
            control-color="primary"
            navigation
            padding
            arrows
            height="300px"
            class="bg-grey-1 rounded-borders q-mb-md"
          >
            <q-carousel-slide name="1" class="column no-wrap flex-center">
              <q-img src="https://cdn.quasar.dev/img/mountains.jpg" style="height: 100%; width: 100%">
                <div class="absolute-center text-center">
                  <div class="text-h4 text-weight-bold text-white">Znajdź swój wymarzony samochód</div>
                  <div class="text-subtitle1 text-white q-mt-md">Największa baza ogłoszeń motoryzacyjnych</div>
                  <q-btn color="primary" label="Przeglądaj oferty" class="q-mt-md" to="/oferty" />
                </div>
              </q-img>
            </q-carousel-slide>
            
            <q-carousel-slide name="2" class="column no-wrap flex-center">
              <q-img src="https://cdn.quasar.dev/img/parallax1.jpg" style="height: 100%; width: 100%">
                <div class="absolute-center text-center">
                  <div class="text-h4 text-weight-bold text-white">Sprzedaj swój samochód</div>
                  <div class="text-subtitle1 text-white q-mt-md">Dodaj ogłoszenie i dotrzyj do tysięcy kupujących</div>
                  <q-btn color="primary" label="Dodaj ogłoszenie" class="q-mt-md" to="/dodaj" />
                </div>
              </q-img>
            </q-carousel-slide>
            
            <q-carousel-slide name="3" class="column no-wrap flex-center">
              <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" style="height: 100%; width: 100%">
                <div class="absolute-center text-center">
                  <div class="text-h4 text-weight-bold text-white">Części i akcesoria</div>
                  <div class="text-subtitle1 text-white q-mt-md">Znajdź wszystko, czego potrzebujesz</div>
                  <q-btn color="primary" label="Sprawdź oferty" class="q-mt-md" to="/oferty/czesci" />
                </div>
              </q-img>
            </q-carousel-slide>
          </q-carousel>
  
          <!-- Kategorie pojazdów -->
          <div class="text-h5 q-my-md">Kategorie pojazdów</div>
          <div class="row q-col-gutter-md">
            <div class="col-xs-12 col-sm-6 col-md-3">
              <q-card class="my-card" clickable to="/oferty/osobowe">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />
                <q-card-section>
                  <div class="text-h6">Samochody osobowe</div>
                  <div class="text-subtitle2">Ponad 10 000 ogłoszeń</div>
                </q-card-section>
              </q-card>
            </div>
            
            <div class="col-xs-12 col-sm-6 col-md-3">
              <q-card class="my-card" clickable to="/oferty/dostawcze">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />
                <q-card-section>
                  <div class="text-h6">Samochody dostawcze</div>
                  <div class="text-subtitle2">Ponad 2 500 ogłoszeń</div>
                </q-card-section>
              </q-card>
            </div>
            
            <div class="col-xs-12 col-sm-6 col-md-3">
              <q-card class="my-card" clickable to="/oferty/motocykle">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />
                <q-card-section>
                  <div class="text-h6">Motocykle</div>
                  <div class="text-subtitle2">Ponad 3 200 ogłoszeń</div>
                </q-card-section>
              </q-card>
            </div>
            
            <div class="col-xs-12 col-sm-6 col-md-3">
              <q-card class="my-card" clickable to="/oferty/czesci">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />
                <q-card-section>
                  <div class="text-h6">Części i akcesoria</div>
                  <div class="text-subtitle2">Ponad 7 800 ogłoszeń</div>
                </q-card-section>
              </q-card>
            </div>
          </div>
  
          <!-- Najnowsze ogłoszenia -->
          <div class="text-h5 q-my-md">Najnowsze ogłoszenia</div>
          <div class="row q-col-gutter-md">
            <div v-if="loading" class="text-center q-py-lg col-12">
              <q-spinner color="primary" size="3em" />
              <p class="q-mt-sm">Wczytywanie ofert...</p>
            </div>
            
            <div v-else-if="error" class="text-center q-py-lg col-12">
              <q-icon name="error" color="negative" size="3em" />
              <p class="q-mt-sm">{{ error }}</p>
            </div>
            
            <div v-else-if="cars.length === 0" class="text-center q-py-lg col-12">
              <q-icon name="inbox" color="grey" size="3em" />
              <p class="q-mt-sm">Brak ogłoszeń do wyświetlenia</p>
            </div>
            
            <div v-else v-for="car in cars" :key="car.id" class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
              <q-card class="my-card">
                <q-img :src="car.image_url || 'https://cdn.quasar.dev/img/parallax2.jpg'" style="height: 200px" />
                <q-card-section>
                  <div class="text-h6">{{ car.brand }} {{ car.model }}</div>
                  <div class="text-subtitle2">{{ car.year }} · {{ car.mileage }} km · {{ car.fuel_type }}</div>
                  <div class="text-h5 text-primary q-mt-sm">{{ formatPrice(car.price) }} PLN</div>
                </q-card-section>
                
                <q-card-actions align="right">
                  <q-btn flat color="secondary" icon="phone" label="Kontakt" />
                  <q-btn flat color="primary" icon="visibility" label="Szczegóły" :to="`/oferta/${car.id}`" />
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </div>
      </q-page-container>
  
      <!-- Stopka -->
      <q-footer bordered class="bg-white text-primary">
        <q-toolbar>
          <q-toolbar-title>
            <div class="row items-center justify-between q-pa-md">
              <div class="col-xs-12 col-md-4 q-mb-md-none">
                © 2025 Giełda Samochodowa. Wszelkie prawa zastrzeżone.
              </div>
              <div class="col-xs-12 col-md-4 q-mb-md-none text-center">
                <q-btn flat round icon="facebook" type="a" href="#" target="_blank" />
                <q-btn flat round icon="twitter" type="a" href="#" target="_blank" />
                <q-btn flat round icon="instagram" type="a" href="#" target="_blank" />
              </div>
              <div class="col-xs-12 col-md-4 text-right">
                <q-btn flat label="Polityka prywatności" to="/privacy" />
                <q-btn flat label="Regulamin" to="/terms" />
              </div>
            </div>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
  
      <!-- Dialog logowania -->
      <q-dialog v-model="loginDialog" persistent>
        <q-card style="min-width: 350px">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Zaloguj się</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
  
          <q-card-section>
            <q-form @submit="onLoginSubmit" class="q-gutter-md">
              <q-input
                v-model="loginForm.email"
                label="Email"
                type="email"
                :rules="[val => !!val || 'Email jest wymagany', isValidEmail]"
              />
  
              <q-input
                v-model="loginForm.password"
                label="Hasło"
                :type="isPwd ? 'password' : 'text'"
                :rules="[val => !!val || 'Hasło jest wymagane']"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              
              <div class="flex justify-between items-center">
                <q-checkbox v-model="loginForm.remember" label="Zapamiętaj mnie" />
                <q-btn flat label="Zapomniałem hasła" type="button" @click="onForgotPassword" />
              </div>
  
              <div class="q-mt-md">
                <q-btn label="Zaloguj się" type="submit" color="primary" class="full-width" />
              </div>
            </q-form>
          </q-card-section>
  
          <q-card-section class="text-center q-pt-none">
            Nie masz jeszcze konta?
            <q-btn flat label="Zarejestruj się" color="primary" @click="onRegisterClick" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-layout>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const leftDrawerOpen = ref(false);
      const loginDialog = ref(false);
      const search = ref('');
      const slide = ref('1');
      const isPwd = ref(true);
      const isLoggedIn = ref(false);
      const cars = ref([]);
      const loading = ref(true);
      const error = ref(null);
      
      const loginForm = ref({
        email: '',
        password: '',
        remember: false
      });
  
      const toggleLeftDrawer = () => {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      };
  
      const isValidEmail = (val) => {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'Niepoprawny format email';
      };
  
      const onLoginSubmit = () => {
        // Tutaj logika logowania - przykład:
        console.log('Próba logowania:', loginForm.value);
        
        // Symulacja udanego logowania
        setTimeout(() => {
          isLoggedIn.value = true;
          loginDialog.value = false;
          // Tutaj mogłaby być obsługa tokenu JWT, zapisanie do localStorage itp.
        }, 1000);
      };
  
      const onForgotPassword = () => {
        // Obsługa przypomnienia hasła
        console.log('Przejście do formularza przypomnienia hasła');
      };
  
      const onRegisterClick = () => {
        // Przejście do rejestracji
        console.log('Przejście do formularza rejestracji');
        loginDialog.value = false;
        // Tutaj mogłoby być ustawienie dialogu rejestracji na true
      };
  
      const onProfileClick = () => {
        // Przejście do profilu
        console.log('Przejście do profilu użytkownika');
      };
  
      const onMyAdsClick = () => {
        // Przejście do moich ogłoszeń
        console.log('Przejście do moich ogłoszeń');
      };
  
      const onLogoutClick = () => {
        // Wylogowanie
        console.log('Wylogowanie użytkownika');
        isLoggedIn.value = false;
      };
  
      const fetchCars = () => {
        loading.value = true;
        error.value = null;
        
        // Symulacja pobierania danych - w rzeczywistości użyj endpointu API
        setTimeout(() => {
          cars.value = [
            {
              id: 1,
              brand: 'Volkswagen',
              model: 'Golf',
              year: 2019,
              mileage: 45000,
              fuel_type: 'Diesel',
              price: 62500,
              image_url: 'https://cdn.quasar.dev/img/car-avatar.png'
            },
            {
              id: 2,
              brand: 'Toyota',
              model: 'Corolla',
              year: 2020,
              mileage: 32000,
              fuel_type: 'Benzyna',
              price: 78900,
              image_url: 'https://cdn.quasar.dev/img/mountains.jpg'
            },
            {
              id: 3,
              brand: 'Audi',
              model: 'A4',
              year: 2018,
              mileage: 67000,
              fuel_type: 'Diesel',
              price: 89500,
              image_url: 'https://cdn.quasar.dev/img/parallax1.jpg'
            },
            {
              id: 4,
              brand: 'BMW',
              model: 'Seria 3',
              year: 2021,
              mileage: 22000,
              fuel_type: 'Benzyna',
              price: 129000,
              image_url: 'https://cdn.quasar.dev/img/parallax2.jpg'
            }
          ];
          loading.value = false;
        }, 1500);
        
        // W wersji produkcyjnej użyj:
        // axios.get('/api/cars')
        //   .then(response => {
        //     cars.value = response.data;
        //   })
        //   .catch(err => {
        //     console.error('Błąd podczas pobierania danych:', err);
        //     error.value = 'Wystąpił błąd podczas pobierania danych. Spróbuj odświeżyć stronę.';
        //   })
        //   .finally(() => {
        //     loading.value = false;
        //   });
      };
      
      const formatPrice = (price) => {
        return price.toLocaleString('pl-PL');
      };
      
      onMounted(() => {
        fetchCars();
      });
      
      return {
        leftDrawerOpen,
        toggleLeftDrawer,
        loginDialog,
        search,
        slide,
        isPwd,
        isLoggedIn,
        loginForm,
        cars,
        loading,
        error,
        isValidEmail,
        onLoginSubmit,
        onForgotPassword,
        onRegisterClick,
        onProfileClick,
        onMyAdsClick,
        onLogoutClick,
        formatPrice
      };
    }
  };
  </script>
  
  <style>
  .my-card {
    transition: transform 0.3s;
  }
  
  .my-card:hover {
    transform: translateY(-5px);
  }
  
  /* Opcjonalne style globalnie dla aplikacji */
  body {
    font-family: 'Roboto', sans-serif;
  }
  </style>