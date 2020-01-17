
<template>
  <div class="card gallery-card mb-3">
    <div class="card-img-top">
      <img :src="imgSrc">
    </div>
    <div class="card-top">
      <div class="card-title">
        <span>Python</span>
        <span class="text-fadeout"></span>
      </div>
      <div>
        <span class="card-downloads">
          <i class="download-icon fas fa-download grey-text"></i>
          <span class="download-count">15.2M</span>
        </span>
        <div class="card-author">
          <span>Microsoft & corporation are something</span>
          <span class="text-fadeout"></span>
        </div>
      </div>
      <div class="card-body">
        <p class="card-text">{{ desc }}</p>
      </div>
      <div class="card-footer">
        <div class="rating">
          <span>
            <i class="fas fa-star rating-star"></i>
            <i class="fas fa-star rating-star"></i>
            <i class="fas fa-star rating-star"></i>
            <i class="fas fa-star-half-alt rating-star"></i>
            <i class="far fa-star rating-star"></i>
            <span class="ml-1">(524)</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "PluginCard",
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



<style scoped>
.gallery-card {
  height: 250px;
  margin: 0 5px 0 5px;
  font-size: 12px;
  cursor: pointer;
  -moz-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.gallery-card:hover {
  -moz-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
}

.gallery-card .card-img-top {
  height: 108px;
  text-align: center;
  padding: 16px 0;
}

.gallery-card .card-img-top > img {
  max-width: 85%;
  max-height: 72px;
}

.gallery-card .card-top {
  padding: 0 10px;
  position: relative;
  height: 40px;
  white-space: nowrap;
}

.gallery-card .card-top .card-title {
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.1;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.gallery-card .card-top .card-author {
  max-width: 60%;
  color: #767676;
  position: relative;
  vertical-align: middle;
  text-align: left;
  overflow: hidden;
}

.gallery-card .card-top .card-downloads {
  max-width: 33%;
  float: right;
  vertical-align: middle;
  text-align: right;
  display: inline;
}

.gallery-card .card-top .download-icon {
  height: 10px;
  width: 12px;
}

.gallery-card .card-top .download-count {
  color: #767676;
}

.gallery-card .card-body {
  padding: 10px 0 0 0;
}

.gallery-card .card-text {
  height: 50px;
  display: block;
  color: #767676;
  text-overflow: ellipsis;
  white-space: normal;
  overflow: hidden;
  line-height: 1.4;
}

.gallery-card .card-footer {
  position: relative;
  height: 20px;
  padding: 3px 0 0 0;
  margin-top: 13px;
  background-color: #fff;
  white-space: nowrap;
  overflow: hidden;
}

.gallery-card .card-footer .rating {
  display: inline-block;
  float: left;
}

.gallery-card .text-fadeout {
  height: 100%;
  width: 30px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), #fff);
  position: absolute;
  right: 0;
  top: 0;
  display: block;
}

@media (min-width: 576px) {
  .gallery-card {
    min-width: 10.6rem;
    max-width: 10.6rem;
  }
}

@media (min-width: 768px) {
  .gallery-card {
    min-width: 10.6rem;
    max-width: 10.6rem;
  }
}

@media (min-width: 992px) {
  .gallery-card {
    min-width: 11.3rem;
    max-width: 11.3rem;
  }
}

@media (min-width: 1200px) {
  .gallery-card {
    min-width: 11.2rem;
    max-width: 11.2rem;
  }
}
</style>