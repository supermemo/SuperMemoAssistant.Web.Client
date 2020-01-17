import Vue from 'vue';

import Vuelidate from 'vuelidate';
import router from './router';
import store from './store';

import Axios from 'axios';
import SetupAxiosAuth from './helpers/authInterceptorsHelper.js';

import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
import 'github-markdown-css'

import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  
  beforeCreate() {
    this.$store.dispatch('auth/initializeStore');
  },
  created() {
    SetupAxiosAuth(
      Axios,
      () => 'Bearer ' + this.$store.getters['auth/token'],
      () => this.$store.dispatch['auth/refreshToken']
    );
  }
}).$mount('#app');
