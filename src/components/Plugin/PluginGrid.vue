
<template>
  <div class="justify-content-center">
    <div class="card-deck">
      <PluginCard />
      <PluginCard />
      <PluginCard />
      <PluginCard />
      <PluginCard />
      <PluginCard />
      <PluginCard />
      <PluginCard />
      <PluginCard />
      <PluginCard />
      <PluginCard />
    </div>
  </div>
</template>

<script>
import PluginCard from './PluginCard';

export default {
  name: "PluginGrid",
  components: { PluginCard },
  data: function() {
    return {
      imgSrc:
        "https://ms-python.gallerycdn.vsassets.io/extensions/ms-python/python/2018.12.1/1544826220818/Microsoft.VisualStudio.Services.Icons.Small",
      desc:
        "Linting, Debugging (multi-threaded, remote), Intellisense, code formatting, refactoring, unit tests, snippets, and more."
    };
  }
};
</script>
