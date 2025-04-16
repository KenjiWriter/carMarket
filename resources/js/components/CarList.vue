<!-- filepath: c:\xampp\htdocs\carMarket\src\components\CarList.vue -->
<template>
    <div class="car-list-grid">
      <CarCard 
        v-for="car in cars" 
        :key="car.id" 
        :car="car" 
        @click="showCarDetails(car)"
      />
    </div>
  </template>
  
  <script>
  import CarCard from './CarCard.vue';
  
  export default {
    name: 'CarList',
    components: {
      CarCard
    },
    props: {
      cars: {
        type: Array,
        required: true
      }
    },
    methods: {
      showCarDetails(car) {
        this.$emit('show-car-details', car);
      }
    }
  }
  </script>
  
  <style scoped>
  .car-list-grid {
    display: grid;
    /* Adjust grid columns for responsiveness */
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Responsive grid */
    gap: 16px; /* Space between cards */
    padding: 0; /* Remove default padding if any */
  }
  </style>