<template>
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-section company-info">
        <h3>Giełda Samochodowa</h3>
        <p>Twoje zaufane miejsce do kupna i sprzedaży samochodów. Znajdź idealne auto lub szybko sprzedaj swoje.</p>
      </div>
      
      <div class="footer-section footer-links">
        <h3>Przydatne linki</h3>
        <ul>
          <li><a href="#">Strona główna</a></li>
          <li><a href="#">Wszystkie ogłoszenia</a></li>
          <li><a href="#">Dodaj ogłoszenie</a></li>
          <li><a href="#">Jak kupić</a></li>
          <li><a href="#">Jak sprzedać</a></li>
        </ul>
      </div>
      
      <div class="footer-section categories">
        <h3>Kategorie</h3>
        <ul>
          <li><a href="#">Samochody osobowe</a></li>
          <li><a href="#">Samochody dostawcze</a></li>
          <li><a href="#">Motocykle</a></li>
          <li><a href="#">Części samochodowe</a></li>
          <li><a href="#">Przyczepy i naczepy</a></li>
        </ul>
      </div>
      
      <div class="footer-section contact-info">
        <h3>Kontakt</h3>
        <p><q-icon name="location_on" size="xs" /> ul. Motoryzacyjna 123, 00-001 Warszawa</p>
        <p><q-icon name="phone" size="xs" /> +48 123 456 789</p>
        <p><q-icon name="email" size="xs" /> kontakt@gielda-samochodowa.pl</p>
        <div class="social-icons">
          <a href="#" aria-label="Facebook"><q-icon name="mdi-facebook" /></a>
          <a href="#" aria-label="Twitter"><q-icon name="mdi-twitter" /></a>
          <a href="#" aria-label="Instagram"><q-icon name="mdi-instagram" /></a>
          <a href="#" aria-label="YouTube"><q-icon name="mdi-youtube" /></a>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <div class="footer-container">
        <p class="copyright">&copy; {{ currentYear }} Giełda Samochodowa. Wszelkie prawa zastrzeżone.</p>
        <div class="legal-links">
          <a href="#">Polityka prywatności</a>
          <a href="#">Regulamin</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style scoped>
.site-footer {
  background-color: #1D3557;
  color: #f5f7fa;
  padding-top: 40px;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.footer-section {
  width: 100%;
  margin-bottom: 30px;
}

@media (min-width: 768px) {
  .footer-section {
    width: calc(50% - 20px);
  }
}

@media (min-width: 992px) {
  .footer-section {
    width: calc(25% - 20px);
  }
}

.footer-section h3 {
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 15px;
  position: relative;
}

.footer-section h3:after {
  content: '';
  display: block;
  width: 50px;
  height: 2px;
  background-color: #A8DADC;
  margin-top: 10px;
}

.footer-section p {
  color: #e1e1e1;
  font-size: 14px;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section ul li a {
  color: #e1e1e1;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 14px;
}

.footer-section ul li a:hover {
  color: #A8DADC;
}

.contact-info p {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.contact-info .q-icon {
  margin-right: 10px;
  color: #A8DADC;
}

.social-icons {
  display: flex;
  margin-top: 15px;
}

.social-icons a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  margin-right: 10px;
  color: #fff;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.social-icons a:hover {
  background-color: #A8DADC;
  color: #1D3557;
}

.footer-bottom {
  background-color: #152538;
  padding: 20px 0;
  margin-top: 20px;
}

.footer-bottom .footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  font-size: 14px;
  margin: 0;
}

.legal-links {
  display: flex;
  flex-wrap: wrap;
}

.legal-links a {
  color: #e1e1e1;
  text-decoration: none;
  font-size: 14px;
  margin-left: 20px;
  transition: color 0.3s ease;
}

.legal-links a:hover {
  color: #A8DADC;
}

@media (max-width: 767px) {
  .footer-bottom .footer-container {
    flex-direction: column;
    text-align: center;
  }
  
  .legal-links {
    margin-top: 15px;
    justify-content: center;
  }
  
  .legal-links a {
    margin: 0 10px;
  }
}
</style>
