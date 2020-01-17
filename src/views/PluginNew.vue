<template>
  <PluginForm :isNewPlugin=true />
</template>

<script>
import PluginForm from '../components/Plugin/PluginForm.vue';

export default {
  name: 'PluginNew',
  components: { PluginForm },
};
</script>
