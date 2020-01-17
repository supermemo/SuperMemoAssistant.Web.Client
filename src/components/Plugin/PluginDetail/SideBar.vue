<template>
  <div class="plugin-sidebar">
    <div class="row col flex-column">
      <h5 class="section-header">
        Resources
      </h5>
      <ul>
        <li><a href="#">Repository</a></li>
        <li><a href="#">Changelog</a></li>
        <li><a href="#">Download Extension</a></li>
      </ul>
    </div>
    <div class="row col flex-column">
      <h5 class="section-header">
        Project Details
      </h5>
      <ul>
        <li><a class="text-center" href="#"><i class="fab fa-github"></i>supermemo/SuperMemoAssistant.Plugins.PDF</a></li>
        <li><a class="text-center" href="#"><i class="fas fa-code-branch"></i>No pull request</a></li>
        <li><a class="text-center" href="#"><i class="fas fa-exclamation-circle"></i>2 Open Issues</a></li>
        <li><a class="text-center" href="#"><i class="fas fa-calendar-alt"></i>Last commit: a month ago</a></li>
      </ul>
    </div>
    <div class="row col flex-column">
      <h5 class="section-header">
        More Info
      </h5>
      <table>
        <tr><td>Version</td><td>1.0.23</td></tr>
        <tr><td>Released on</td><td>11/20/2018 12:21:54 AM</td></tr>
        <tr><td>Last updated</td><td>12/26/2018 10:16:05 PM</td></tr>
        <tr><td>Publisher</td><td>Stuart Robinson</td></tr>
        <tr><td>Package name</td><td>stuart.unique-window-colors</td></tr>
      </table>
    </div>
  </div>
</template>



<style>
.plugin-detail .plugin-sidebar row {
  margin-bottom: 6px;
  overflow: hidden;
}

.plugin-detail .plugin-sidebar .section-header {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 6px;
  color: #555;
}

.plugin-detail .plugin-sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-bottom: 16px;
}

.plugin-detail .plugin-sidebar ul li {
  white-space: nowrap;
  margin-bottom: 2px;
  font-size: 14px;
  font-weight: 400;
}

.plugin-detail .plugin-sidebar ul li i {
  width: 15px;
  margin-right: 6px;
  color: black;
}

.plugin-detail .plugin-sidebar td {
  font-size: 12px;
  padding: 3px 0;
  color: #666;
}
</style>

<script>
export default {
  name: "PluginDetailSideBar",
  data: function() {
    return {
      plugin: null,
    }
  }
};
</script>
