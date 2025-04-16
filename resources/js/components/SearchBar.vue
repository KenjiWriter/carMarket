<!-- filepath: c:\xampp\htdocs\carMarket\src\components\SearchBar.vue -->
<template>
    <div class="search-bar-container">
      <div class="search-bar">
        <input type="text" placeholder="Szukaj..." class="search-input keyword-input">
        <select class="search-input category-select">
          <option value="" disabled selected>Wszystkie kategorie</option>
          <!-- Add category options here -->
          <option value="cars">Samochody</option>
          <option value="parts">Części</option>
        </select>
        <input type="text" placeholder="Lokalizacja" class="search-input location-input">
        <button class="search-button">Szukaj</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchBar'
  }
  </script>
  
  <style scoped>
  .search-bar-container {
    background-color: #ebeeef; /* Light grey background */
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 4px;
  }
  
  .search-bar {
    display: flex;
    gap: 10px; /* Space between inputs */
    width: 100%;
  }
  
  .search-input {
    padding: 12px 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    flex-grow: 1; /* Allow inputs to grow */
  }
  
  .keyword-input {
    flex-basis: 40%; /* Adjust width */
  }
  
  .category-select {
    flex-basis: 25%; /* Adjust width */
    background-color: white; /* Ensure select background is white */
  }
  
  .location-input {
    flex-basis: 25%; /* Adjust width */
  }
  
  .search-button {
    padding: 12px 25px;
    background-color: #002f34; /* OLX button color */
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
    flex-shrink: 0; /* Prevent button from shrinking */
  }
  
  .search-button:hover {
    background-color: #004f58; /* Darker shade on hover */
  }
  </style>