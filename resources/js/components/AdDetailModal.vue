<template>
  <q-dialog
    v-model="showModal"
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
    @hide="onClose"
  >
    <q-card class="ad-detail-modal">
      <q-card-section class="ad-detail-header">
        <div class="ad-title">{{ ad.title }}</div>
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="ad-detail-content">
        <div class="ad-main-content">
          <div class="ad-images">
            <q-carousel
              v-model="slide"
              animated
              arrows
              navigation
              infinite
              :autoplay="autoplay"
              height="400px"
            >
              <q-carousel-slide 
                v-for="(image, index) in ad.images" 
                :key="index" 
                :name="index"
                :img-src="image"
              />
            </q-carousel>
          </div>
          
          <div class="ad-info">
            <div class="ad-price">{{ ad.price }} zł</div>
            <div class="ad-date">Dodano: {{ ad.date }}</div>
            <div class="ad-location">Lokalizacja: {{ ad.location }}</div>
            
            <div class="ad-details">
              <h3>Szczegóły</h3>
              <div class="detail-grid">
                <div v-for="(value, key) in ad.details" :key="key" class="detail-item">
                  <div class="detail-label">{{ key }}:</div>
                  <div class="detail-value">{{ value }}</div>
                </div>
              </div>
            </div>
            
            <div class="ad-description">
              <h3>Opis</h3>
              <p>{{ ad.description }}</p>
            </div>
          </div>
        </div>
        
        <div class="seller-info">
          <div class="seller-card">
            <h3>Sprzedający</h3>
            <div class="seller-name">{{ ad.seller.name }}</div>
            <div class="seller-since">Na OLX od {{ ad.seller.memberSince }}</div>
            <div class="seller-rating">
              <q-rating
                v-model="ad.seller.rating"
                size="1.5em"
                color="amber"
                readonly
                :max="5"
              />
              <span>({{ ad.seller.reviewCount }})</span>
            </div>
            
            <q-separator class="q-my-md" />
            
            <div class="contact-info">
              <div class="phone-number">
                <q-icon name="phone" size="sm" class="q-mr-xs" />
                {{ ad.seller.phone }}
              </div>
              <q-btn color="primary" class="full-width q-mt-md">
                <q-icon name="message" size="sm" class="q-mr-xs" />
                Wyślij wiadomość
              </q-btn>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'AdDetailModal',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    ad: {
      type: Object,
      required: true,
      default: () => ({
        title: '',
        price: '',
        date: '',
        location: '',
        images: [],
        details: {},
        description: '',
        seller: {
          name: '',
          memberSince: '',
          rating: 0,
          reviewCount: 0,
          phone: ''
        }
      })
    }
  },
  data() {
    return {
      slide: 0,
      autoplay: false
    }
  },
  computed: {
    showModal: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    onClose() {
      this.$emit('close');
    }
  },
  mounted() {
    console.log('AdDetailModal mounted, ad:', this.ad);
  }
}
</script>

<style scoped>
.ad-detail-modal {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f5f5f5;
}

.ad-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 15px 20px;
}

.ad-title {
  font-size: 22px;
  font-weight: bold;
}

.ad-detail-content {
  display: flex;
  padding: 20px;
  gap: 20px;
  height: 100%;
  overflow-y: auto;
}

.ad-main-content {
  flex: 3;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 20px;
}

.ad-price {
  font-size: 28px;
  font-weight: bold;
  margin-top: 20px;
  color: #1D3557;
}

.ad-date, .ad-location {
  color: #616161;
  margin: 5px 0;
}

.ad-details, .ad-description {
  margin-top: 30px;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 10px;
}

.detail-item {
  display: flex;
}

.detail-label {
  font-weight: 500;
  margin-right: 10px;
  color: #616161;
}

.seller-info {
  flex: 1;
  max-width: 300px;
}

.seller-card {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 20px;
}

.seller-name {
  font-size: 18px;
  font-weight: 500;
  margin-top: 10px;
}

.seller-since {
  color: #616161;
  font-size: 14px;
  margin-top: 5px;
}

.seller-rating {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.phone-number {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
}
</style>
