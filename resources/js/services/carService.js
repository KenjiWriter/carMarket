import axios from 'axios';

const API_URL = '/cars';

export default {
    async getCars() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching cars:', error);
            throw error;
        }
    },

    async getCar(id) {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching car:', error);
            throw error;
        }
    },

    async createCar(carData) {
        try {
            const response = await axios.post(API_URL, carData);
            return response.data;
        } catch (error) {
            console.error('Error creating car:', error);
            throw error;
        }
    },

    async updateCar(id, carData) {
        try {
            const response = await axios.put(`${API_URL}/${id}`, carData);
            return response.data;
        } catch (error) {
            console.error('Error updating car:', error);
            throw error;
        }
    },

    async deleteCar(id) {
        try {
            await axios.delete(`${API_URL}/${id}`);
        } catch (error) {
            console.error('Error deleting car:', error);
            throw error;
        }
    }
}; 