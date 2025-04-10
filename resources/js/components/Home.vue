<template>
  <q-page class="q-pa-md">
    <!-- Sekcja wyszukiwania -->
    <div class="search-section q-mb-xl">
      <q-card class="search-card">
        <q-card-section class="text-center q-pb-none">
          <div class="text-h4 text-weight-bold">Znajdź swój wymarzony samochód</div>
          <div class="text-subtitle1 q-mt-sm">Największa baza ogłoszeń motoryzacyjnych w Polsce</div>
        </q-card-section>
        
        <q-card-section>
          <div class="row q-col-gutter-md justify-center">
            <div class="col-12 col-sm-4">
              <q-select 
                v-model="filters.brand" 
                :options="carBrands" 
                label="Marka pojazdu"
                filled
              />
            </div>
            <div class="col-12 col-sm-4">
              <q-select 
                v-model="filters.priceRange" 
                :options="priceRanges" 
                label="Zakres cenowy"
                filled
              />
            </div>
            <div class="col-12 col-sm-2">
              <q-btn 
                color="primary"
                label="Szukaj"
                class="full-width"
                size="lg"
                @click="searchCars"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Kategorie -->
    <div class="categories-section q-mb-xl">
      <div class="row items-center justify-between q-mb-md">
        <div class="text-h5 text-weight-bold">Popularne kategorie</div>
      </div>
      <div class="row q-col-gutter-md">
        <div v-for="category in categories" :key="category.name" class="col-6 col-sm-3">
          <q-card class="cursor-pointer hover-card" @click="goToCategory(category)">
            <q-img :src="category.img" height="180px">
              <div class="absolute-bottom category-label">
                <div class="text-subtitle1 text-weight-bold">{{ category.name }}</div>
                <div class="text-caption">{{ category.count }} ogłoszeń</div>
              </div>
            </q-img>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Najnowsze ogłoszenia -->
    <div class="listings-section">
      <div class="row items-center justify-between q-mb-lg">
        <div class="text-h5 text-weight-bold">Najnowsze ogłoszenia</div>
        <q-btn flat color="primary" label="Zobacz wszystkie" @click="goToListings" />
      </div>
      <div class="row q-col-gutter-md">
        <div v-for="listing in latestListings" :key="listing.id" class="col-12 col-sm-6 col-md-3">
          <q-card class="hover-card cursor-pointer" @click="goToListing(listing)">
            <q-img :src="listing.image" height="200px">
              <q-btn
                round
                color="white"
                text-color="grey"
                icon="favorite_border"
                class="absolute-top-right q-ma-sm"
                @click.stop="toggleFavorite(listing)"
              />
            </q-img>
            <q-card-section>
              <div class="text-subtitle1 text-weight-bold">{{ listing.title }}</div>
              <div class="text-h6 text-primary q-mt-sm">{{ listing.price }} PLN</div>
              <div class="row items-center justify-between q-mt-sm">
                <div class="text-caption"><q-icon name="place" size="16px"/> {{ listing.location }}</div>
                <div class="text-caption"><q-icon name="access_time" size="16px"/> {{ listing.date }}</div>
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

// Filters state
const filters = reactive({
  brand: null,
  priceRange: null
});

// Data
const carBrands = ['Wszystkie marki', 'BMW', 'Audi', 'Mercedes', 'Toyota', 'Volkswagen'];
const priceRanges = ['Dowolna cena', 'do 20 000 zł', '20 000 - 50 000 zł', '50 000 - 100 000 zł', 'powyżej 100 000 zł'];

const categories = [
  { name: 'Osobowe', count: '234,567', img: 'https://source.unsplash.com/random/400x300?car' },
  { name: 'SUV', count: '45,678', img: 'https://source.unsplash.com/random/400x300?suv' },
  { name: 'Sportowe', count: '12,345', img: 'https://source.unsplash.com/random/400x300?sports,car' },
  { name: 'Elektryczne', count: '5,678', img: 'https://source.unsplash.com/random/400x300?electric,car' }
];

const latestListings = [
  {
    id: 1,
    title: 'BMW Seria 3',
    price: '89 900',
    location: 'Warszawa',
    date: 'Dzisiaj',
    image: 'https://source.unsplash.com/random/400x300?bmw'
  },
  // ... więcej ogłoszeń
];

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
.hover-card {
  transition: all 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.category-label {
  background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2));
  padding: 16px;
  color: white;
}

.search-card {
  background: linear-gradient(135deg, #1976D2, #64B5F6);
  color: white;
}

.search-card .q-field {
  background: white;
  border-radius: 8px;
}
</style>
