<template>
  <div class="ad-preview" @click="showDetails">
    <div class="ad-image">
      <img :src="ad.images[0]" :alt="ad.title">
    </div>
    <div class="ad-content">
      <div class="ad-title">{{ ad.title }}</div>
      <div class="ad-price">{{ ad.price }} zł</div>
      <div class="ad-meta">
        <span class="ad-location">{{ ad.location }}</span>
        <span class="ad-date">{{ ad.date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdPreview',
  props: {
    ad: {
      type: Object,
      required: true
    }
  },
  methods: {
    showDetails() {
      console.log('Ad clicked:', this.ad.title);
      this.$emit('show-details', this.ad);
    }
  }
}
</script>

<style scoped>
.ad-preview {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.ad-preview:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.ad-image {
  height: 200px;
  overflow: hidden;
}

.ad-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ad-content {
  padding: 12px;
}

.ad-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ad-price {
  font-size: 18px;
  font-weight: 700;
  color: #1D3557;
  margin-bottom: 8px;
}

.ad-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #757575;
}
</style>
