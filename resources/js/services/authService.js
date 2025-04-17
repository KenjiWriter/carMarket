import axios from 'axios';

// Prawidłowy adres API dla autoryzacji
// W app.js już ustawiłeś axios.defaults.baseURL = '/api'
const API_URL = '/auth';

// Upewnij się, że axios używa ciasteczek
axios.defaults.withCredentials = true;

export default {
    async login(credentials) {
        try {
            // Pobierz CSRF cookie używając pełnej ścieżki (bez przedrostka /api)
            await axios({
                method: 'get',
                url: '/sanctum/csrf-cookie',
                baseURL: '' // Pomiń domyślny baseURL
            });
            
            // Sprawdź poprawność danych przed wysłaniem
            if (!credentials.email || !credentials.password) {
                throw new Error('Email i hasło są wymagane');
            }
            
            // Wykonaj żądanie logowania
            const response = await axios.post(`${API_URL}/login`, credentials);
            
            // Zapisz dane użytkownika i token
            if (response.data && response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('token', response.data.token);
                
                // Ustaw token w nagłówku dla przyszłych żądań
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            }
            
            return response.data;
        } catch (error) {
            console.error('Error logging in:', error);
            
            // Lepsze informacje o błędach
            if (error.response && error.response.data) {
                console.log('Server validation errors:', error.response.data);
            }
            
            throw error;
        }
    },

    async register(userData) {
        try {
            // Pobierz CSRF cookie używając pełnej ścieżki (bez przedrostka /api)
            await axios({
                method: 'get',
                url: '/sanctum/csrf-cookie',
                baseURL: '' // Pomiń domyślny baseURL
            });
            
            const response = await axios.post(`${API_URL}/register`, userData);
            
            if (response.data && response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('token', response.data.token);
                
                // Ustaw token w nagłówku dla przyszłych żądań
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            }
            
            return response.data;
        } catch (error) {
            console.error('Error registering:', error);
            throw error;
        }
    },

    // Pozostała część kodu pozostaje bez zmian
    async logout() {
        try {
            // Dodaj token autoryzacji do żądania wylogowania
            const config = {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            };
            
            await axios.post(`${API_URL}/logout`, {}, config);
            
            // Usuń dane użytkownika
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            
            // Usuń nagłówek autoryzacji
            delete axios.defaults.headers.common['Authorization'];
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    },

    isAuthenticated() {
        return !!localStorage.getItem('token');
    },

    getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    getToken() {
        return localStorage.getItem('token');
    },
    
    // Metoda do inicjalizacji przy starcie aplikacji
    initializeAuth() {
        const token = this.getToken();
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }
};