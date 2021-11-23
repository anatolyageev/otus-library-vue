import axios from 'axios'

const booksApi = axios.create({baseURL: '/api'});

export default {
    getAll: () => booksApi.get('/library')
}