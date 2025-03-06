import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.14:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookApi = {
  getAll: () => api.get('/books'),
  getById: (id) => api.get(`/books/${id}`),
  create: (data) => api.post('/books', data),
  update: (id, data) => api.put(`/books/${id}`, data),
  delete: (id) => api.delete(`/books/${id}`),
};

export default api;
