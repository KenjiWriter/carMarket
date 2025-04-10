<template>
  <q-page class="q-py-lg bg-grey-1">
    <!-- Hero section -->
    <div class="hero-section q-mb-xl">
      <div class="row justify-center">
        <div class="col-12 col-md-10 q-px-md">
          <q-card flat class="hero-card q-pa-xl text-white text-center">
            <div class="text-h3 text-weight-light q-mb-sm">Znajdź swój wymarzony samochód</div>
            <div class="text-subtitle1 q-mb-xl">{{ totalListings.toLocaleString() }} ogłoszeń w naszej bazie</div>
            
            <q-card class="search-form q-pa-md">
              <div class="row q-col-gutter-md items-center">
                <div class="col-12 col-sm">
                  <q-input 
                    outlined 
                    v-model="searchText" 
                    placeholder="Czego szukasz?"
                    class="search-input"
                    dense
                    clearable
                    clear-icon="close"
                    :input-class="'text-center'"
                    hide-bottom-space
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" color="grey-7" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-sm-auto">
                  <q-btn 
                    color="primary"
                    class="full-width search-btn"
                    label="Szukaj"
                    no-caps
                    unelevated
                    @click="searchCars"
                  />
                </div>
              </div>
            </q-card>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Quick filters -->
    <div class="row justify-center q-mb-xl">
      <div class="col-12 col-md-10 q-px-md">
        <div class="row q-col-gutter-md">
          <div v-for="category in quickCategories" :key="category.name" class="col-6 col-sm-3">
            <q-card 
              class="quick-filter-card cursor-pointer" 
              @click="goToCategory(category)"
              flat
              bordered
            >
              <q-card-section class="text-center">
                <q-icon :name="category.icon" color="primary" size="md" />
                <div class="text-subtitle1 q-mt-sm">{{ category.name }}</div>
                <div class="text-caption text-grey">{{ category.count }} ogłoszeń</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <!-- Latest listings -->
    <div class="listings-section q-px-md">
      <div class="row justify-center">
        <div class="col-12 col-md-10">
          <div class="row items-center justify-between q-mb-lg">
            <div class="text-h5">Najnowsze ogłoszenia</div>
            <q-btn 
              flat 
              color="primary" 
              label="Zobacz wszystkie" 
              no-caps
              @click="goToListings" 
            />
          </div>
          <div class="row q-col-gutter-md">
            <div v-for="listing in latestListings" :key="listing.id" class="col-12 col-sm-6 col-md-4">
              <q-card class="listing-card">
                <q-img 
                  :src="listing.image" 
                  :ratio="16/9"
                >
                  <div class="absolute-bottom-right q-pa-xs">
                    <q-btn
                      round
                      color="white"
                      text-color="grey-8"
                      icon="favorite_border"
                      size="sm"
                      flat
                      dense
                    />
                  </div>
                </q-img>
                <q-card-section>
                  <div class="text-subtitle1 ellipsis">{{ listing.title }}</div>
                  <div class="text-h6 text-weight-bold text-primary q-mt-sm">
                    {{ formatPrice(listing.price) }} PLN
                  </div>
                  <div class="row items-center justify-between q-mt-sm text-grey-7">
                    <div class="text-caption">
                      <q-icon name="place" size="xs"/> {{ listing.location }}
                    </div>
                    <div class="text-caption">
                      {{ listing.date }}
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const totalListings = 345678;

// Stats data
const stats = [
  { label: 'Aktywnych ogłoszeń', value: '345,678' },
  { label: 'Zarejestrowanych użytkowników', value: '125,430' },
  { label: 'Sprzedanych pojazdów', value: '89,254' },
  { label: 'Średni czas sprzedaży', value: '15 dni' }
];

// Filters state
const filters = reactive({
  brand: null,
  priceRange: null,
  year: null
});

const searchText = ref('');

// Data
const carBrands = ['Wszystkie marki', 'BMW', 'Audi', 'Mercedes', 'Toyota', 'Volkswagen'];
const priceRanges = ['Dowolna cena', 'do 20 000 zł', '20 000 - 50 000 zł', '50 000 - 100 000 zł', 'powyżej 100 000 zł'];
const yearRanges = ['Dowolny rok', 'do 2000', '2000 - 2010', '2010 - 2020', 'powyżej 2020'];

// Enhanced categories data
const categories = [
  { 
    name: 'Samochody osobowe', 
    count: '234,567', 
    img: 'https://source.unsplash.com/random/800x600?luxury,car',
    gradient: 'bg-gradient-blue'
  },
  { 
    name: 'SUV i Crossover', 
    count: '45,678', 
    img: 'https://source.unsplash.com/random/800x600?suv',
    gradient: 'bg-gradient-green'
  },
  { 
    name: 'Samochody sportowe', 
    count: '12,345', 
    img: 'https://source.unsplash.com/random/800x600?sports,car',
    gradient: 'bg-gradient-red'
  },
  { 
    name: 'Samochody elektryczne', 
    count: '5,678', 
    img: 'https://source.unsplash.com/random/800x600?electric,car',
    gradient: 'bg-gradient-purple'
  }
];

const quickCategories = [
  { name: 'Osobowe', count: '234,567', icon: 'directions_car' },
  { name: 'Dostawcze', count: '45,678', icon: 'local_shipping' },
  { name: 'Motocykle', count: '12,345', icon: 'two_wheeler' },
  { name: 'Części', count: '89,254', icon: 'build' }
];

const latestListings = [
  {
    id: 1,
    title: 'BMW Seria 3',
    price: '89900',
    location: 'Warszawa',
    date: 'Dzisiaj',
    image: 'https://source.unsplash.com/random/400x300?bmw',
    year: '2020',
    mileage: '15,000'
  },
  // ... więcej ogłoszeń
];

// Helper functions
const formatPrice = (price) => {
  return new Intl.NumberFormat('pl-PL').format(price);
};

const filterBrands = (val, update) => {
  // ... implement brand filtering logic ...
};

// Methods
const searchCars = () => {
  console.log('Searching with filters:', filters);
};

const goToCategory = (category) => {
  router.push(`/category/${category.name.toLowerCase()}`);
};

const goToListing = (listing) => {
  router.push(`/listing/${listing.id}`);
};

const goToListings = () => {
  router.push('/listings');
};

const toggleFavorite = (listing) => {
  console.log('Toggle favorite:', listing.id);
};
</script>

<style scoped>
.hero-card {
  background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}

.hero-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
  pointer-events: none;
}

.search-form {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

.search-input {
  width: 100%;
}

.search-input :deep(.q-field__control) {
  background: white;
  border-radius: 8px;
}

.search-input :deep(.q-field__control-container) {
  padding: 0;
}

.search-input :deep(.q-field__native) {
  padding: 0;
}

.search-input :deep(.q-field__marginal) {
  height: 40px;
  min-width: 40px;
}

.search-input :deep(.q-field__before),
.search-input :deep(.q-field__after) {
  color: var(--q-primary);
}

.quick-filter-card {
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid #eef2f7;
}

.quick-filter-card:hover {
  transform: translateY(-2px);
  border-color: #FF6B6B;
  background: linear-gradient(135deg, #ffffff 0%, #fff5f5 100%);
}

.listing-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
  border: 1px solid #eef2f7;
}

.listing-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.06);
  border-color: #4ECDC4;
}

.search-btn {
  height: 40px;
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%);
  transition: all 0.3s ease;
}

.search-btn:hover {
  background: linear-gradient(135deg, #FF8E8E 0%, #FF6B6B 100%);
}

.q-card {
  box-shadow: none;
}

:deep(.q-btn) {
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%);
}

:deep(.text-primary) {
  color: #FF6B6B !important;
}

:deep(.q-icon) {
  color: #4ECDC4;
}
</style>
