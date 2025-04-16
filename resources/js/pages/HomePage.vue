<template>
  <div class="home-page">
    <div class="ads-grid">
      <ad-preview 
        v-for="ad in advertisements" 
        :key="ad.id" 
        :ad="ad" 
        @show-details="showAdDetails"
      />
    </div>
    
    <ad-detail-modal
      v-if="selectedAd"
      v-model="showModal"
      :ad="selectedAd"
      @close="closeModal"
    />
  </div>
</template>

<script>
import AdPreview from '../components/AdPreview.vue';
import AdDetailModal from '../components/AdDetailModal.vue';

export default {
  name: 'HomePage',
  components: {
    AdPreview,
    AdDetailModal
  },
  data() {
    return {
      showModal: false,
      selectedAd: null,
      advertisements: [
        {
          id: 1,
          title: 'BMW M3 Competition 2021',
          price: '420 000',
          date: '2023-11-05',
          location: 'Warszawa',
          images: [
            'https://via.placeholder.com/600x400?text=BMW+M3',
            'https://via.placeholder.com/600x400?text=BMW+M3+Interior',
            'https://via.placeholder.com/600x400?text=BMW+M3+Engine'
          ],
          details: {
            'Marka': 'BMW',
            'Model': 'M3 Competition',
            'Rok produkcji': '2021',
            'Przebieg': '15 000 km',
            'Pojemność skokowa': '3.0L',
            'Rodzaj paliwa': 'Benzyna',
            'Moc': '510 KM',
            'Skrzynia biegów': 'Automatyczna'
          },
          description: 'BMW M3 Competition w idealnym stanie. Samochód był serwisowany w ASO, posiada pełną dokumentację oraz historię serwisową. Pierwszy właściciel w kraju.',
          seller: {
            name: 'Jan Kowalski',
            memberSince: 'Kwiecień 2018',
            rating: 4.8,
            reviewCount: 27,
            phone: '+48 123 456 789'
          }
        }
      ]
    };
  },
  methods: {
    showAdDetails(ad) {
      console.log('Opening ad details:', ad);
      this.selectedAd = ad;
      this.showModal = true;
    },
    closeModal() {
      console.log('Closing modal');
      this.showModal = false;
      setTimeout(() => {
        this.selectedAd = null;
      }, 300);
    }
  }
}
</script>

<style scoped>
.home-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.ads-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
</style>
