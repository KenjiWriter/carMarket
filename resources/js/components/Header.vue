<!-- filepath: c:\xampp\htdocs\carMarket\src\components\Header.vue -->
<template>
    <header class="olx-header">
      <div class="header-container">
        <div class="logo">
          <!-- Replace with actual OLX logo or your logo styled similarly -->
          <img src="https://via.placeholder.com/100x40?text=LOGO" alt="Logo" />
        </div>
        <nav class="navigation">
          <a href="#" class="nav-link">
            <q-icon name="message" size="sm" />
            Wiadomości
          </a>
          <a href="#" class="nav-link">
            <q-icon name="favorite_border" size="sm" />
            Obserwowane
          </a>
          <a href="#" class="nav-link" @click.prevent="openLoginModal">
            <q-icon name="person" size="sm" />
            Moje Konto
          </a>
        </nav>
        <button class="add-advert-button" @click="openAddAdvertModal">
          <q-icon name="add" size="sm" class="q-mr-xs" />
          Dodaj ogłoszenie
        </button>
      </div>
    </header>
</template>
  
<script>
export default {
  name: 'Header',
  methods: {
    openLoginModal() {
      this.$emit('open-login');
    },
    openAddAdvertModal() {
      this.$emit('open-add-advert');
    }
  }
}
</script>
  
<style scoped>
.olx-header {
  background-color: #1D3557; /* Głęboki, profesjonalny ciemny niebieski */
  color: white;
  padding: 10px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
  
.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
  
.logo img {
  height: 40px; /* Adjust as needed */
  display: block;
}
  
.navigation {
  display: flex;
  gap: 20px; /* Space between links */
}
  
.nav-link {
  color: white;
  text-decoration: none;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px; /* Space between icon and text */
  transition: opacity 0.3s;
  padding: 5px 10px;
  border-radius: 4px;
}
  
.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  opacity: 0.9;
}
  
.add-advert-button {
  background-color: #fff; /* White button */
  color: #1976D2; /* Zaktualizowany kolor */
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}
  
.add-advert-button:hover {
  background-color: #f5f5f5; /* Slightly darker on hover */
  transform: translateY(-2px);
  box-shadow: 0 3px 5px rgba(0,0,0,0.1);
}
</style>