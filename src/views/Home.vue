<template>
  <div class="container mt-2">
    <div class="row col">
      <h1>Homepage</h1>
    </div>

    <div class="row col">
      <p>This is the homepage of our Vue.js application.</p>
    </div>

    <PluginGrid />
  </div>
</template>

<script>
import PluginGrid from '../components/Plugin/PluginGrid.vue';

export default {
  name: "home",
  components: { PluginGrid }
};
</script>