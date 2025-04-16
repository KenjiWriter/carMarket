<!-- filepath: c:\xampp\htdocs\carMarket\src\components\CarCard.vue -->
<template>
    <div class="car-card" @click="$emit('click', car)">
      <div class="card-image-container">
        <img :src="car.image" :alt="car.title" class="card-image">
        <button class="favorite-button" @click.stop>♡</button> <!-- Stop propagation to prevent modal from opening when clicking the heart -->
      </div>
      <div class="card-content">
        <h3 class="card-title">{{ car.title }}</h3>
        <p class="card-price">{{ car.price }} zł</p>
        <div class="card-footer">
          <span class="card-location">{{ car.location }}</span>
          <span class="card-date">{{ car.date }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CarCard',
    props: {
      car: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .car-card {
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    overflow: hidden; /* Ensures image corners are rounded if border-radius is applied */
    transition: box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    cursor: pointer; /* Add pointer cursor to indicate it's clickable */
  }
  
  .car-card:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  
  .card-image-container {
    position: relative;
    width: 100%;
    padding-top: 66.66%; /* Aspect ratio 3:2 */
    overflow: hidden;
  }
  
  .card-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Cover the container */
  }
  
  .favorite-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 18px;
    line-height: 30px; /* Center icon vertically */
    text-align: center;
    cursor: pointer;
    color: #333;
  }
  
  .favorite-button:hover {
      background: rgba(255, 255, 255, 1);
      color: red; /* Indicate favorited state */
  }
  
  
  .card-content {
    padding: 15px;
    flex-grow: 1; /* Allow content to fill space */
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Push footer down */
  }
  
  .card-title {
    font-size: 16px;
    font-weight: normal; /* OLX titles are often not bold */
    margin: 0 0 10px 0;
    color: #002f34;
    /* Limit title lines if needed */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 38px; /* Approx height for 2 lines */
  }
  
  .card-price {
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 15px 0;
    color: #002f34;
  }
  
  .card-footer {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #7f9799; /* Greyish color for footer text */
    margin-top: auto; /* Push to bottom */
  }
  
  .card-location,
  .card-date {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  </style>