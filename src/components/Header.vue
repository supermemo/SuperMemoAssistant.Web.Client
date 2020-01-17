<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="navbar-brand"><img class="mr-2 align-top" :src="require('../assets/favicon-24.png')"/><router-link tag="span" to="/home">SuperMemo Assistant</router-link></div>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <router-link class="nav-item" tag="li" to="/home" active-class="active">
          <a class="nav-link">Home</a>
        </router-link>
        <router-link v-if="$route.meta.view == 'PluginDetail'" class="nav-item active" tag="li" to="#">
          <a class="nav-link">Plugin</a>
        </router-link>
        <router-link v-if="isAuthenticated" class="nav-item" tag="li" to="/plugin/new" active-class="active">
          <a class="nav-link">Upload</a>
        </router-link>
        <router-link v-if="isAuthenticated" class="nav-item" tag="li" to="/account" active-class="active">
          <a class="nav-link">My Account</a>
        </router-link>
        <li v-else class="nav-item">
          <a class="nav-link" href="#" data-toggle="modal" data-target="#signInModal">Sign in</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import AuthMixin from '../mixins/AuthMixin';

export default {
  name: 'headerBar',
  mixins: [AuthMixin],
};
</script>
