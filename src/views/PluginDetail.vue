<template>
  <div class="plugin-detail">
    <div class="plugin-header">
      <div class="container">
        <div class="row px-sm-3">
          <div class="col-12 col-sm-auto">
            <img
              class="plugin-icon-m"
              :src="iconUrl"
            >
          </div>
          <div class="col ml-1">
            <h4 class="row col plugin-title">{{ title }}</h4>
            <div class="row plugin-metadata">
              <h5 class="col-auto plugin-metadata-author">
                <a class="text-dark" href="#">{{ username }}</a>
              </h5>
              <span class="col-auto px-0 plugin-metadata-divider">|</span>
              <!-- <div class="col-auto plugin-metadata-item">
                <i class="download-icon fas fa-download grey-text"></i>
                <span class="download-count">15.2M downloads</span>
              </div> -->
              <span class="d-none d-sm-block col-auto px-0 plugin-metadata-divider">|</span>
              <div class="col-12 col-sm-auto plugin-metadata-rating">
                <span class="rating" v-html="ratingHtml">
                </span>
              </div>
            </div>
            <div class="row col mt-2">
              {{ shortDescription }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row plugin-body p-3">
        <div class="plugin-description" v-html="description">
        </div>
        <SideBar class="plugin-panel">
          Side panel
        </SideBar>
      </div>
    </div>
  </div>
</template>



<script>
import SideBar from '../components/Plugin/PluginDetail/SideBar';

import helpers from "../helpers/api-helper.js";
import PluginAPI from "../api/plugin-api";

export default {
  name: "PluginDetail",
  components: { SideBar },
  props: [ 'id' ],
  data: function() {
    return {
      plugin: null,
    }
  },
  computed: {
    isLoaded: function() {
      return this.plugin != null;
    },
    title: function() {
      return this.isLoaded ? this.plugin.title : '';
    },
    iconUrl: function() {
      return this.isLoaded ? this.plugin.iconUrl : 'plugins/0.png';
    },
    username: function() {
      return this.isLoaded ? this.plugin.author.username : '';
    },
    rating: function() {
      return this.isLoaded ? this.plugin.rating : 0;
    },
    ratingCount: function() {
      return this.isLoaded ? this.plugin.ratingCount : 0;
    },
    shortDescription: function() {
      return this.isLoaded ? this.plugin.shortDescription : '';
    },
    description: function() {
      return this.isLoaded ? this.plugin.description : '';
    },
    ratingHtml: function() {
      if (this.isLoaded == false)
        return '';

      let html = '';

      let s = 0;

      for (; s < Math.floor(this.rating); s++) {
        html += '<i class="fas fa-star rating-star"></i>\r\n';
      }

      if (this.rating % 1 >= .5) {
        html += '<i class="fas fa-star-half-alt rating-star"></i>\r\n';
        s++;
      }

      for (; s <= 5; s++) {
        html += '<i class="far fa-star rating-star"></i>\r\n';
      }

      html += `<span class="ml-1">(${ratingCount})</span>`;
      
      return html;
    }
  },
  created: function() {
    PluginAPI.get(this.id)
      .then(data => {
        if (!this.isValidId($data.id) || !this.isValid($data.author) || !this.isValidId($data.author.id) ) {
          this.$router.push({ name: 'Home', props: { error: "Invalid server response" } });
          return;
        }

        this.plugin = data;
      })
      .catch(err => {
        const errStr = helpers.getHydraErrorText(err);
        this.$router.push({ name: 'Home', props: { error: errStr } });
      });
  },
  methods: {
    isValid(value) {
      return value != undefined && value !== null;
    },
    isValidId(value) {
      return this.isValid(value) && value > 0;
    }
  }
};
</script>



<style scoped>

.plugin-detail .plugin-header {
  background-color: #eff1f3;
  padding: 32px 0 20px 0;
}

.plugin-detail .plugin-header .plugin-icon-m {
  max-width: 128px;
  max-height: 128px;
  vertical-align: top;
}

.plugin-detail .plugin-header .plugin-title {
  color: black;
  font-weight: 600;
  font-size: 26px;
}

@media (min-width: 576px) {
  .plugin-detail .plugin-header .plugin-metadata {
    flex-wrap: nowrap;
  }
}

.plugin-detail .plugin-header .plugin-metadata-divider {
  font-size: 14px;
}

.plugin-detail .plugin-header .plugin-metadata-author {
  font-weight: 500;
}

.plugin-detail .plugin-header .plugin-metadata-rating .rating-star {
  font-size: 16px;
}

.plugin-detail .plugin-header .plugin-metadata-item {
  font-size: 14px;
}

@media (max-width: 719.8px) {
  .plugin-detail .plugin-body .plugin-panel {
    flex: 0 0 100%;
    max-width: 100%;
  }
  
  .plugin-detail .plugin-body .plugin-description {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (min-width: 720px) {
  .plugin-detail .plugin-body .plugin-panel {
    max-width: 380px;
    min-width: 300px;
    flex: 1 0 0px;
  }
  
  .plugin-detail .plugin-body .plugin-description {
    flex: 2 0 0;
    max-width: 100%;
  }
}
</style>