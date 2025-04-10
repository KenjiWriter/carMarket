import axios from 'axios';

const API_URL = '/auth';

export default {
    async login(credentials) {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    },

    async register(userData) {
        try {
            const response = await axios.post(`${API_URL}/register`, userData);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            console.error('Error registering:', error);
            throw error;
        }
    },

    async logout() {
        try {
            await axios.post(`${API_URL}/logout`);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
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
    }
}; 