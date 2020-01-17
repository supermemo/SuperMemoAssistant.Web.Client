import AuthAPI from '../api/auth-api';
import Axios from 'axios';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    error: null,
    isAuthenticated: false,
    token: null,
    user: null,
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    hasError(state) {
      return state.error !== null;
    },
    error(state) {
      return state.error;
    },
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    isFullyAuthenticated(state, getters) {
      return state.isAuthenticated && getters.userLoaded;
    },
    userLoaded(state) {
      return state.user !== null;
    },
    token(state) {
      return state.token;
    },
    user(state) {
      return state.user;
    },
    hasRole(state) {
      return role => {
        return userLoaded ? state.user.roles.indexOf(role) !== -1 : false;
      }
    },
  },
  mutations: {
    ['AUTH_INPROGRESS'](state) {
      state.isLoading = true;
      state.error = null;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
    ['AUTH_SUCCESS'](state, { token, user }) {
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.user = user;

      console.log(`Logged in as ${user.email}`);
      console.log(user);

      if (token) {
        state.token = token;
        localStorage.setItem('token', token);
      }
    },
    ['AUTH_FAILURE'](state, error) {
      state.isLoading = false;
      state.error = error;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;

      console.log(error);
    },
    ['AUTH_REFRESHING'](state) {
      state.isLoading = true;
      state.isAuthenticated = true;
      state.user = null;
    },
  },
  actions: {
    signIn({commit}, payload) {
      commit('AUTH_INPROGRESS');

      return AuthAPI.signIn(payload.email, payload.password)
        .then(res => commit('AUTH_SUCCESS', res.data))
        .catch(err => commit('AUTH_FAILURE', err));
    },
    refreshToken(context) {
      return null;
    },
    initializeStore({commit}) {
      // Get stored tokens, if any.
      var token = localStorage.getItem('token');
  
      if (token) {
        this.token = token;
        
        commit('AUTH_REFRESHING');

        AuthAPI.getCurrentUser()
          .then(res => commit('AUTH_SUCCESS', res.data))
          .catch(err => commit('AUTH_FAILURE', err));
      }
    },
  }
}