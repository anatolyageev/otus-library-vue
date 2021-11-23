import Vue from 'vue'
import Router from 'vue-router'
import Library from '../components/v-library'
import vAddNewBook from '../pages/v-add-new-book'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Library',
            component: Library
        },
        {
            path: '/addBook',
            name: 'addBook',
            component: vAddNewBook
        }

    ]
})