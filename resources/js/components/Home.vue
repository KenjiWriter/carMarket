<template>
  <q-page class="q-py-lg">
    <!-- Hero section -->
    <div class="hero-section q-mb-xl">
      <div class="row justify-center">
        <div class="col-12 col-md-10 q-px-md">
          <q-card flat class="bg-primary text-white search-card q-pa-lg">
            <div class="text-center q-mb-lg">
              <div class="text-h3 text-weight-bold q-mb-sm">Znajdź swój wymarzony samochód</div>
              <div class="text-h6">Ponad {{ totalListings.toLocaleString() }} ogłoszeń w naszej bazie</div>
            </div>
            
            <q-card class="search-form q-pa-md">
              <div class="row q-col-gutter-md items-center">
                <div class="col-12 col-sm-4">
                  <q-select 
                    filled
                    v-model="filters.brand" 
                    :options="carBrands"
                    label="Marka pojazdu"
                    clearable
                    use-input
                    input-debounce="0"
                    @filter="filterBrands"
                  >
                    <template v-slot:prepend>
                      <q-icon name="directions_car" />
                    </template>
                  </q-select>
                </div>
                <div class="col-12 col-sm-3">
                  <q-select 
                    filled
                    v-model="filters.priceRange" 
                    :options="priceRanges"
                    label="Cena"
                    clearable
                  >
                    <template v-slot:prepend>
                      <q-icon name="attach_money" />
                    </template>
                  </q-select>
                </div>
                <div class="col-12 col-sm-3">
                  <q-select 
                    filled
                    v-model="filters.year" 
                    :options="yearRanges"
                    label="Rok produkcji"
                    clearable
                  >
                    <template v-slot:prepend>
                      <q-icon name="event" />
                    </template>
                  </q-select>
                </div>
                <div class="col-12 col-sm-2">
                  <q-btn 
                    color="secondary"
                    class="full-width"
                    size="lg"
                    label="Szukaj"
                    icon-right="search"
                    @click="searchCars"
                  />
                </div>
              </div>
            </q-card>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Stats section -->
    <div class="stats-section q-mb-xl">
      <div class="row q-col-gutter-lg justify-center text-center">
        <div v-for="stat in stats" :key="stat.label" class="col-6 col-sm-3">
          <q-card flat class="stat-card">
            <q-card-section>
              <div class="text-h4 text-weight-bold text-primary">{{ stat.value }}</div>
              <div class="text-subtitle1">{{ stat.label }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Categories section -->
    <div class="categories-section q-mb-xl q-px-md">
      <div class="text-h4 text-weight-bold q-mb-lg text-center">Popularne kategorie</div>
      <div class="row q-col-gutter-lg justify-center">
        <div v-for="category in categories" :key="category.name" class="col-12 col-sm-6 col-md-3">
          <q-card 
            class="category-card cursor-pointer" 
            @click="goToCategory(category)"
          >
            <q-img
              :src="category.img"
              height="200px"
              :class="category.gradient"
            >
              <div class="absolute-bottom text-white q-pa-md">
                <div class="text-h6">{{ category.name }}</div>
                <div class="text-subtitle2">{{ category.count }} ogłoszeń</div>
              </div>
            </q-img>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Latest listings section -->
    <div class="listings-section q-px-md">
      <div class="row items-center justify-between q-mb-lg">
        <div class="text-h4 text-weight-bold">Najnowsze ogłoszenia</div>
        <q-btn 
          color="primary" 
          label="Zobacz wszystkie" 
          icon-right="arrow_forward"
          @click="goToListings" 
        />
      </div>
      <div class="row q-col-gutter-md">
        <div v-for="listing in latestListings" :key="listing.id" class="col-12 col-sm-6 col-md-3">
          <q-card class="listing-card">
            <q-img 
              :src="listing.image" 
              height="200px"
              :ratio="16/9"
            >
              <div class="absolute-top-right q-ma-sm">
                <q-btn
                  round
                  color="grey-2"
                  text-color="grey-8"
                  icon="favorite_border"
                  size="sm"
                  @click.stop="toggleFavorite(listing)"
                  class="q-mr-xs"
                />
                <q-btn
                  round
                  color="grey-2"
                  text-color="grey-8"
                  icon="share"
                  size="sm"
                />
              </div>
              <div class="absolute-bottom text-subtitle2 text-center">
                <q-badge color="secondary" class="q-px-sm">
                  {{ listing.year }}
                </q-badge>
                <q-badge color="orange" class="q-px-sm q-ml-sm">
                  {{ listing.mileage }} km
                </q-badge>
              </div>
            </q-img>
            <q-card-section>
              <div class="text-h6 ellipsis">{{ listing.title }}</div>
              <div class="text-subtitle1 text-weight-bold text-primary">
                {{ formatPrice(listing.price) }} PLN
              </div>
              <div class="row items-center justify-between q-mt-sm">
                <div class="text-caption">
                  <q-icon name="place" size="16px"/> {{ listing.location }}
                </div>
                <div class="text-caption">
                  <q-icon name="access_time" size="16px"/> {{ listing.date }}
                </div>
              </div>
            </q-card-section>
          </q-card>
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
.search-card {
  background: linear-gradient(135deg, var(--q-primary) 0%, #1e88e5 100%);
  border-radius: 16px;
}

.search-form {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
}

.category-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

.listing-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}

.listing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.stat-card {
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.bg-gradient-blue {
  background: linear-gradient(rgba(0,0,0,0), rgba(25,118,210,0.8));
}

.bg-gradient-green {
  background: linear-gradient(rgba(0,0,0,0), rgba(56,142,60,0.8));
}

.bg-gradient-red {
  background: linear-gradient(rgba(0,0,0,0), rgba(211,47,47,0.8));
}

.bg-gradient-purple {
  background: linear-gradient(rgba(0,0,0,0), rgba(123,31,162,0.8));
}
</style>
