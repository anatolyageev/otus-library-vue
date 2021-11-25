import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import BooksApi from '../api/books'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        library: [],
        genres: [],
        authors: []
    },
    mutations: {
        SET_LIBRARY_TO_STATE: (state, library) => {
            state.library = library;
        },
        DELETE_BOOK_MUTATION: (state, index) => {
            state.library.splice(index, 1);
        },
        SET_GENRE_TO_STATE: (state, genres) => {
            state.genres = genres;
        },
        SET_AUTHORS_TO_STATE: (state, authors) => {
            state.authors = authors;
        }
    },
    actions: {
        GET_LIBRARY_FROM_API({commit}) {
            return BooksApi.getAll()
                .then((library) => {
                    commit('SET_LIBRARY_TO_STATE', library.data);
                    return library;
                })
                .catch((error) => {
                    return error;
                })
        },
        DELETE_BOOK_FROM_API({commit}, book_id, index) {
            axios('/api/library/' + book_id, {method: "DELETE"})
                .then(commit('DELETE_BOOK_MUTATION', index))
                .catch((error) => {
                    return error;
                });
        },
        INSERT_BOOK_FROM_API({commit}, book) {
            axios.post('/api/library/', book)
                .then(response => {
                    commit(response)
                    return response.data
                })
                .catch((error) => {
                    return error;
                });
        },
        UPDATE_BOOK_FROM_API({commit}, book) {
            axios.put('/api/library/', book)
                .then(response => {
                    commit(response)
                    return response.data
                })
                .catch((error) => {
                    return error;
                });
        },
        GET_GENRES_FROM_API({commit}) {
            return axios('/api/genre', {method: "GET"})
                .then((genres) => {
                    commit('SET_GENRE_TO_STATE', genres.data);
                    return genres;
                })
                .catch((error) => {
                    return error;
                })
        },
        GET_AUTHORS_FROM_API({commit}) {
            axios('/api/author', {method: "GET"})
                .then((authors) => {
                    commit('SET_AUTHORS_TO_STATE', authors.data);
                })
                .catch((error) => {
                    return error;
                })
        }
    },
    getters: {
        LIBRARY(state) {
            return state.library;
        },
        GENRES(state) {
            return state.genres;
        },
        AUTHORS(state) {
            return state.authors;
        }
    }

})

export default store;