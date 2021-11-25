import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from "@/router/router";
import 'bootstrap/dist/css/bootstrap.css'
import BootstrapVue from 'bootstrap-vue';
Vue.config.productionTip = false
Vue.use(BootstrapVue);
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')

