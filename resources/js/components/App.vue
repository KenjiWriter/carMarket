<template>
    <div class="container py-5">
      <header class="mb-5 text-center">
        <h1 class="display-4 fw-bold text-primary mb-4">Giełda Samochodowa</h1>
        <p class="lead">Znajdź wymarzony samochód w najlepszej cenie</p>
      </header>
      
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Ładowanie...</span>
        </div>
        <p class="mt-3">Wczytywanie ofert...</p>
      </div>
      
      <div v-else-if="error" class="alert alert-danger" role="alert">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        {{ error }}
      </div>
      
      <div v-else-if="cars.length === 0" class="text-center py-5">
        <div class="alert alert-info" role="alert">
          <p class="mb-0">Brak samochodów do wyświetlenia</p>
        </div>
      </div>
      
      <div v-else class="row g-4">
        <div v-for="car in cars" :key="car.id" class="col-12 col-md-6 col-lg-4">
          <div class="card h-100 car-card">
            <div v-if="car.is_new" class="new-badge">NOWY</div>
            <div class="car-image bg-light d-flex align-items-center justify-content-center">
              <span v-if="!car.image" class="text-muted">Brak zdjęcia</span>
              <img v-else :src="'/images/' + car.image" :alt="`${car.brand} ${car.model}`" class="card-img-top">
            </div>
            <div class="card-body">
              <h5 class="card-title fw-bold">{{ car.brand }} {{ car.model }}</h5>
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge bg-secondary">Rok: {{ car.year }}</span>
                <span v-if="!car.is_new" class="badge bg-info text-dark">
                  <i class="bi bi-speedometer2 me-1"></i>{{ car.mileage.toLocaleString() }} km
                </span>
              </div>
              <p class="card-text mb-1">
                <strong>Paliwo:</strong> {{ car.fuel_type }}
              </p>
              <p v-if="car.description" class="card-text text-muted small mb-3">
                {{ car.description }}
              </p>
            </div>
            <div class="card-footer bg-white border-top-0">
              <div class="d-flex justify-content-between align-items-center">
                <div class="price-tag">{{ formatPrice(car.price) }} PLN</div>
                <button class="btn btn-outline-primary btn-sm">Szczegóły</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'App',
    data() {
      return {
        cars: [],
        loading: true,
        error: null
      };
    },
                   created() {
      this.fetchCars();
    },
    methods: {
      fetchCars() {
        this.loading = false;
        this.error = null;
        
        axios.get('/api/cars')
          .then(response => {
            this.cars = response.data;
          })
          .catch(error => {
            console.error('Błąd podczas pobierania danych:', error);
            this.error = 'Wystąpił błąd podczas pobierania danych. Spróbuj odświeżyć stronę.';
          })
          .finally(() => {
            this.loading = false;
          });
      },
      formatPrice(price) {
        return price.toLocaleString('pl-PL');
      }
    }
  };
  </script>