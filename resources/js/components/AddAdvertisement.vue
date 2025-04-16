<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content ad-form-modal">
      <h2>Dodaj ogłoszenie</h2>
      
      <form @submit.prevent="submitForm">
        <!-- Category Selection -->
        <div class="form-group">
          <label for="category">Kategoria:</label>
          <select id="category" v-model="formData.category" required @change="onCategoryChange">
            <option value="">Wybierz kategorię</option>
            <option value="cars">Samochody osobowe</option>
            <option value="commercial">Samochody dostawcze</option>
            <option value="motorcycles">Motocykle</option>
            <option value="parts">Części samochodowe</option>
          </select>
        </div>

        <!-- Title -->
        <div class="form-group">
          <label for="title">Tytuł ogłoszenia:</label>
          <input type="text" id="title" v-model="formData.title" required>
        </div>

        <!-- Car specific fields -->
        <template v-if="formData.category === 'cars' || formData.category === 'commercial'">
          <!-- Car Brand -->
          <div class="form-group">
            <label for="brand">Marka:</label>
            <select id="brand" v-model="formData.brand" required @change="onBrandChange">
              <option value="">Wybierz markę</option>
              <option v-for="brand in carBrands" :key="brand" :value="brand">{{ brand }}</option>
            </select>
          </div>

          <!-- Car Model - Dependent on brand -->
          <div class="form-group">
            <label for="model">Model:</label>
            <select id="model" v-model="formData.model" required :disabled="!formData.brand">
              <option value="">Wybierz model</option>
              <option v-for="model in availableModels" :key="model" :value="model">{{ model }}</option>
            </select>
          </div>

          <!-- Year -->
          <div class="form-group">
            <label for="year">Rok produkcji:</label>
            <input type="number" id="year" v-model="formData.year" min="1900" :max="currentYear + 1" required>
          </div>

          <!-- Mileage -->
          <div class="form-group">
            <label for="mileage">Przebieg (km):</label>
            <input type="number" id="mileage" v-model="formData.mileage" min="0" required>
          </div>

          <!-- Engine capacity -->
          <div class="form-group">
            <label for="engineCapacity">Pojemność silnika (cm³):</label>
            <input type="number" id="engineCapacity" v-model="formData.engineCapacity" min="0" step="0.1" required>
          </div>

          <!-- Engine power -->
          <div class="form-group">
            <label for="enginePower">Moc silnika (KM):</label>
            <input type="number" id="enginePower" v-model="formData.enginePower" min="0" required>
          </div>

          <!-- Fuel type -->
          <div class="form-group">
            <label for="fuelType">Rodzaj paliwa:</label>
            <select id="fuelType" v-model="formData.fuelType" required>
              <option value="">Wybierz rodzaj paliwa</option>
              <option value="petrol">Benzyna</option>
              <option value="diesel">Diesel</option>
              <option value="lpg">LPG</option>
              <option value="hybrid">Hybryda</option>
              <option value="electric">Elektryczny</option>
            </select>
          </div>

          <!-- Damage Status -->
          <div class="form-group">
            <label>Stan techniczny:</label>
            <div class="radio-group">
              <label>
                <input type="radio" v-model="formData.isDamaged" :value="false">
                Nieuszkodzony
              </label>
              <label>
                <input type="radio" v-model="formData.isDamaged" :value="true">
                Uszkodzony
              </label>
            </div>
          </div>
        </template>

        <!-- Motorcycle specific fields -->
        <template v-if="formData.category === 'motorcycles'">
          <!-- Motorcycle Brand -->
          <div class="form-group">
            <label for="motorcycleBrand">Marka:</label>
            <select id="motorcycleBrand" v-model="formData.brand" required>
              <option value="">Wybierz markę</option>
              <option v-for="brand in motorcycleBrands" :key="brand" :value="brand">{{ brand }}</option>
            </select>
          </div>

          <!-- Similar fields as cars but possibly with different options -->
          <div class="form-group">
            <label for="motocycleYear">Rok produkcji:</label>
            <input type="number" id="motocycleYear" v-model="formData.year" min="1900" :max="currentYear + 1" required>
          </div>

          <div class="form-group">
            <label for="engineSize">Pojemność silnika (cm³):</label>
            <input type="number" id="engineSize" v-model="formData.engineCapacity" min="0" required>
          </div>
        </template>

        <!-- Parts specific fields -->
        <template v-if="formData.category === 'parts'">
          <div class="form-group">
            <label for="partType">Rodzaj części:</label>
            <select id="partType" v-model="formData.partType" required>
              <option value="">Wybierz rodzaj części</option>
              <option value="engine">Silnik</option>
              <option value="transmission">Skrzynia biegów</option>
              <option value="body">Karoseria</option>
              <option value="suspension">Zawieszenie</option>
              <option value="electronics">Elektronika</option>
              <option value="other">Inne</option>
            </select>
          </div>

          <div class="form-group">
            <label for="compatibility">Kompatybilność:</label>
            <input type="text" id="compatibility" v-model="formData.compatibility" placeholder="np. Ford Focus 2018-2022">
          </div>
        </template>

        <!-- Common fields for all categories -->
        <div class="form-group">
          <label for="price">Cena (PLN):</label>
          <input type="number" id="price" v-model="formData.price" min="0" required>
        </div>

        <div class="form-group">
          <label for="location">Lokalizacja:</label>
          <input type="text" id="location" v-model="formData.location" required>
        </div>

        <div class="form-group">
          <label for="description">Opis:</label>
          <textarea id="description" v-model="formData.description" rows="4" required></textarea>
        </div>

        <div class="form-group">
          <label for="photos">Zdjęcia:</label>
          <input type="file" id="photos" multiple accept="image/*" @change="handleFileUpload">
          <div class="photo-preview" v-if="photoPreviewUrls.length">
            <div v-for="(url, index) in photoPreviewUrls" :key="index" class="preview-item">
              <img :src="url" alt="Preview">
              <button type="button" class="remove-photo" @click="removePhoto(index)">×</button>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-button" @click="closeModal">Anuluj</button>
          <button type="submit" class="submit-button">Dodaj ogłoszenie</button>
        </div>
      </form>

      <button @click="closeModal" class="close-button">
        <q-icon name="close" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddAdvertisement',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      formData: {
        category: '',
        title: '',
        brand: '',
        model: '',
        year: '',
        mileage: '',
        engineCapacity: '',
        enginePower: '',
        fuelType: '',
        isDamaged: false,
        partType: '',
        compatibility: '',
        price: '',
        location: '',
        description: '',
        photos: []
      },
      photoPreviewUrls: [],
      carBrands: [
        'Audi', 'BMW', 'Citroën', 'Dacia', 'Fiat', 'Ford', 'Honda', 'Hyundai', 
        'Kia', 'Mazda', 'Mercedes-Benz', 'Nissan', 'Opel', 'Peugeot', 'Renault', 
        'Škoda', 'Toyota', 'Volkswagen', 'Volvo'
      ],
      carModels: {
        'Audi': ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron'],
        'BMW': ['Seria 1', 'Seria 2', 'Seria 3', 'Seria 4', 'Seria 5', 'Seria 6', 'Seria 7', 'X1', 'X3', 'X5', 'X6', 'X7'],
        'Ford': ['Fiesta', 'Focus', 'Kuga', 'Mondeo', 'Mustang', 'Puma', 'Edge', 'EcoSport'],
        'Opel': ['Astra', 'Corsa', 'Insignia', 'Mokka', 'Grandland X', 'Crossland X'],
        'Toyota': ['Aygo', 'Yaris', 'Corolla', 'C-HR', 'RAV4', 'Camry', 'Prius', 'Land Cruiser'],
        'Volkswagen': ['Polo', 'Golf', 'Passat', 'Tiguan', 'Touareg', 'T-Roc', 'Arteon', 'ID.3', 'ID.4']
      },
      motorcycleBrands: [
        'BMW', 'Ducati', 'Harley-Davidson', 'Honda', 'Kawasaki', 'KTM', 'Suzuki', 'Triumph', 'Yamaha'
      ]
    };
  },
  computed: {
    availableModels() {
      return this.formData.brand ? (this.carModels[this.formData.brand] || []) : [];
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    onCategoryChange() {
      // Reset form fields that are specific to certain categories
      if (this.formData.category !== 'cars' && this.formData.category !== 'commercial') {
        this.formData.brand = '';
        this.formData.model = '';
        this.formData.year = '';
        this.formData.mileage = '';
        this.formData.engineCapacity = '';
        this.formData.enginePower = '';
        this.formData.fuelType = '';
        this.formData.isDamaged = false;
      }
      
      if (this.formData.category !== 'parts') {
        this.formData.partType = '';
        this.formData.compatibility = '';
      }
    },
    onBrandChange() {
      // Reset model when brand changes
      this.formData.model = '';
    },
    handleFileUpload(event) {
      const files = event.target.files;
      if (!files.length) return;
      
      // Add new files to the photos array
      for (let i = 0; i < files.length; i++) {
        if (this.formData.photos.length < 10) { // Limit to 10 photos
          const file = files[i];
          this.formData.photos.push(file);
          
          // Create preview URL
          const reader = new FileReader();
          reader.onload = (e) => {
            this.photoPreviewUrls.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    },
    removePhoto(index) {
      this.formData.photos.splice(index, 1);
      this.photoPreviewUrls.splice(index, 1);
    },
    submitForm() {
      // Here you would normally send the form data to your backend
      console.log('Form submitted:', this.formData);
      
      // For demo purposes, just close the modal and show a success message
      alert('Ogłoszenie zostało dodane pomyślnie!');
      this.closeModal();
    }
  }
}
</script>

<style scoped>
.ad-form-modal {
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: 500;
  color: white;
}

input, select, textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}

input:focus, select:focus, textarea:focus {
  border-color: #1976D2;
  outline: none;
}

.radio-group {
  display: flex;
  gap: 20px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.photo-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.preview-item {
  position: relative;
  width: 100px;
  height: 100px;
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.remove-photo {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  background-color: rgba(255, 0, 0, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.cancel-button {
  padding: 10px 20px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button {
  padding: 10px 20px;
  background-color: #1976D2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #1565C0;
}
</style>
