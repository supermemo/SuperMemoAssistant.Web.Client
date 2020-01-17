<template>
  <div class="container container-l mt-3">
    <div class="row col border-bottom mb-3">
      <h3>New plugin</h3>
    </div>

    <div class="row col">
      <form id="plugin-new-form" @submit.prevent="postNewPlugin()">
        <!-- Alert message -->
        <div
          v-if="hasGlobalError"
          class="alert alert-dismissible alert-danger"
          aria-hidden="true"
        >
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <strong>Oh snap!</strong>
          Plugin create failed.
          <span v-html="globalError"></span>
        </div>

        <fieldset>
          <!-- title -->
          <div class="form-group field-required">
            <label for="plugin-title" class="control-label">Title</label>
            <input
              v-model.trim="title"
              @input="$v.title.$touch()"
              id="plugin-title"
              name="title"
              type="text"
              :readonly="!isNewPlugin"
              :class="{ 'form-control': true, 'is-invalid': hasTitleError }"
              aria-describedby="title"
              placeholder="Enter the title of your plugin"
            >
            <div
              class="invalid-feedback"
              v-if="!$v.title.maxLength"
            >Must be 50 characters at most.</div>
            <div class="invalid-feedback" v-if="titleError">{{ titleError }}</div>
          </div>

          <!-- package name -->
          <div class="form-group field-required">
            <label for="plugin-package-name">Package Name</label>
            <input
              v-model.trim="packageName"
              id="plugin-package-name"
              name="packageName"
              type="text"
              :class="{ 'form-control': true, 'is-invalid': hasPackageNameError }"
              aria-describedby="Package name"
              placeholder="Enter the NuGet package name for your plugin"
              @input="validateNuGetPackage()"
            >
            <div
              class="invalid-feedback"
              v-if="!$v.packageName.maxLength"
            >Must be 190 characters at most.</div>
            <div class="invalid-feedback" v-if="packageNameError">{{ packageNameError }}</div>
            <small
              v-if="packageVersion !== null"
              id="plugin-package-name-found"
              class="form-text text-muted"
            >
              <i class="fas fa-check-circle"></i>
              Found latest version: {{ packageVersion }}
            </small>
            <small id="plugin-package-name-help" class="form-text text-muted">
              Make sure to
              <a href="https://www.nuget.org/packages/manage/upload">upload you plugin</a> on NuGet first. It should have a dependency on the SuperMemoAssistant.Interop package.
            </small>
          </div>

          <!-- icon -->
          <div class="form-group">
            <label for="plugin-icon">Icon (optional)</label>
            <div
              id="plugin-icon-upload"
              :class="$refs.iconUploader && $refs.iconUploader.dropActive ? 'drop-active' : ''"
              onclick="document.getElementById('plugin-icon').click()"
            >
              <div v-if="hasIcon" id="plugin-icon-upload-preview">
                <img :src="iconUrl" alt="Plugin icon preview">
              </div>
              <div v-else id="plugin-icon-upload-help">
                <div>
                  <i class="fas fa-image"></i>
                </div>
                <div class="mb-3">180px X 180px</div>
                <div>
                  <b>Drag and Drop</b> file or click to upload
                </div>
              </div>
              <file-upload
                ref="iconUploader"
                v-model="iconFiles"
                input-id="plugin-icon"
                name="icon"
                :drop="true"
                extensions="gif,jpg,jpeg,png,webp"
                accept="image/png, image/gif, image/jpeg, image/webp"
                @input-filter="iconInputCallback"
              ></file-upload>
            </div>
            <small
              id="plugin-icon-help"
              class="form-text text-muted"
            >Max size 512kB. Max dimensions 180x180px, larger images will be scaled down.</small>
          </div>

          <!-- short description -->
          <div class="form-group field-required">
            <label for="plugin-short-description">Short description</label>
            <input
              v-model="shortDescription"
              @input="$v.shortDescription.$touch()"
              type="text"
              id="plugin-short-description"
              name="shortDescription"
              :class="{ 'form-control': true, 'is-invalid': hasShortDescriptionError }"
              aria-describedby="Short description"
              placeholder="Enter a short inline description for your plugin (max 100 words)"
            >
            <div
              class="invalid-feedback"
              v-if="!$v.shortDescription.maxLength"
            >Must be 100 characters at most.</div>
            <div class="invalid-feedback" v-if="shortDescriptionError">{{ shortDescriptionError }}</div>
          </div>

          <!-- description -->
          <div class="form-group field-required">
            <label for="plugin-description">Description</label>
            <markdown-editor
              v-model="description"
              id="plugin-description"
              name="description"
              :class="{ 'is-invalid': hasDescriptionError }"
              previewClass="markdown-body"
              aria-describedby="Description"
              :configs="{ placeholder: 'Enter a description for your plugin', status: false }"
            ></markdown-editor>
            <div
              class="invalid-feedback"
              v-if="!$v.description.maxLength"
            >Must be 65535 characters at most.</div>
            <div class="invalid-feedback d-block" v-if="descriptionError">{{ descriptionError }}</div>
          </div>

          <!-- repository -->
          <div class="form-group">
            <label for="plugin-repository">Repository (optional)</label>
            <input
              v-model="repository"
              @input="$v.repository.$touch()"
              id="plugin-repository"
              name="repository"
              type="text"
              :class="{ 'form-control': true, 'is-invalid': hasRepositoryError }"
              aria-describedby="repository"
              placeholder="http://github.com/supermemo-junkie/SuperMemoAssistant.Plugins.Awesome"
            >
            <div
              class="invalid-feedback"
              v-if="!$v.repository.maxLength"
            >Must be 190 characters at most.</div>
            <div
              class="invalid-feedback"
              v-if="!$v.repository.url"
            >Invalid URL format.</div>
            <div class="invalid-feedback" v-if="repositoryError">{{ repositoryError }}</div>
          </div>

          <!-- change log -->
          <div class="form-group">
            <label for="plugin-change-log">Change log (optional)</label>
            <markdown-editor
              v-model="changeLog"
              id="plugin-change-log"
              name="changeLog"
              :class="{ 'is-invalid': hasChangeLogError }"
              previewClass="markdown-body"
              aria-describedby="Change log"
              :configs="{ placeholder: 'Enter your plugin\'s change log', status: false }"
            ></markdown-editor>
            <div
              class="invalid-feedback"
              v-if="!$v.changeLog.maxLength"
            >Must be 65535 characters at most.</div>
            <div class="invalid-feedback" v-if="changeLogError">{{ changeLogError }}</div>
          </div>

          <!-- submit -->
          <div class="form-group">
            <button :disabled="isButtonDisabled" type="submit" class="btn btn-primary">
              <span :hidden="isLoading">Create</span>
              <div class="fas fa-spinner fa-spin" :hidden="isLoading === false"></div>
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<style scoped>
#plugin-icon-upload {
  max-height: 148px;
  min-height: 148px;
  max-width: 180px;
  min-width: 180px;
  cursor: pointer;
  background-color: #f4f4f4;
  border-color: transparent;
  border-style: dashed;
  border-width: 1px;
}

#plugin-icon-upload.drop-active {
  border-color: black;
}

#plugin-icon-upload-preview img {
  width: 180px;
  height: 148px;
  object-fit: contain;
}

#plugin-icon-upload-help {
  padding: 30px 15px;
  text-align: center;
}

#plugin-icon-upload-help div {
  font-size: 12px;
}
</style>

<script>
import FileUpload from "vue-upload-component";
import lodash from "lodash";
import {
  required,
  maxLength,
  url
} from "vuelidate/lib/validators";

import helpers from "../../helpers/api-helper.js";
import PluginAPI from "../../api/plugin-api";
import NuGet from "../../api/nuget-api";

export default {
  name: "PluginForm",
  components: { FileUpload },
  props: ["isNewPlugin"],
  data: function() {
    return {
      // Form data
      title: "",
      packageName: "",
      shortDescription: "",
      description: "",
      repository: "",
      changeLog: "",
      iconFiles: [],

      // Metadata
      packageVersion: null,

      // Validation
      isLoading: false,
      globalError: null,
      titleError: null,
      packageNameError: null,
      shortDescriptionError: null,
      descriptionError: null,
      repositoryError: null,
      changeLogError: null,
    };
  },
  computed: {
    hasGlobalError: function() { return this.globalError !== null; },
    hasTitleError: function() { return this.$v.title.$error || this.titleError !== null; },
    hasPackageNameError: function() { return this.$v.packageName.$error || this.packageNameError !== null; },
    hasShortDescriptionError: function() { return this.$v.shortDescription.$error || this.shortDescriptionError !== null; },
    hasDescriptionError: function() { return this.$v.description.$error || this.descriptionError !== null; },
    hasRepositoryError: function() { return this.$v.repository.$error || this.repositoryError !== null; },
    hasChangeLogError: function() { return this.$v.changeLog.$error || this.changeLogError !== null; },
    isButtonDisabled: function() { return this.$v.$invalid || this.hasPackageNameError || this.isLoading; },
    hasIcon: function() {
      return this.iconFiles.length > 0;
    },
    iconUrl: function() {
      return this.iconFiles.length ? this.iconFiles[0].url : "";
    },
    iconFile: function() {
      return this.iconFiles.length ? this.iconFiles[0].file : null;
    }
  },
  validations: {
    title: { required, maxLength: maxLength(50) },
    packageName: { required, maxLength: maxLength(190) },
    shortDescription: { required, maxLength: maxLength(100) },
    description: { required, maxLength: maxLength(65535) },
    repository: { url, maxLength: maxLength(190) },
    changeLog: { maxLength: maxLength(65535) },
  },
  methods: {
    validateNuGetPackage: lodash.debounce(function() {
      NuGet.getPkgInfo(this.packageName)
        .then(data => {
          try {
            this.$v.packageName.$touch()
            const pkgInfos = new NuGet.NuGetPackageInfos(data);

            this.packageVersion = null;

            if (!pkgInfos.hasDependency("SuperMemoAssistant.Interop")) {
              this.packageNameError = "Package doesn't reference SuperMemoAssistant.Interop"
              return;
            }

            const pkg = pkgInfos.getLatestVersion();

            this.packageVersion = pkg.version;
            this.packageNameError = null;
          } catch (ex) {
            this.packageNameError = ex;
          }
        })
        .catch(err => {
          this.packageVersion = null;
          this.packageNameError = "Invalid package";

          console.log(err);
        });
    }, 350),
    postNewPlugin: function() {
      const form = document.querySelector("#plugin-new-form");

      this.isLoading = true;

      PluginAPI.create(form, this.iconFile)
        .then(data => {
          if (data.id > 0) {
            $this.$router.push({ path: `plugin/${data.id}` });
          }
          else
            this.globalError = "Invalid server response";
        })
        .catch(err => {
          helpers.handleHydraError(
            err,
            {
              title: this.setTitle,
              packageName: this.setPackageName,
              shortDescription: this.setShortDescription,
              description: this.setDescription,
              repository: this.setRepository,
              changeLog: this.setChangeLog,
            },
            this.setGlobalError
          );
        });
        
      this.isLoading = false;
    },
    iconInputCallback: function(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
          alert("Unsupported format.");
          return prevent();
        }

        if (newFile.size > 512 * 1024) {
          alert(
            `Maximum file size is 512kB. This file is ${Math.round(
              newFile.size / 1024
            )}kB`
          );
          return prevent();
        }
      }

      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = "";
        let URL = window.URL || window.webkitURL;
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file);
        }
      }
    },
    setGlobalError(value) { this.globalError = value },
    setTitle(value) { this.titleError = value },
    setPackageName(value) { this.packageNameError = value },
    setShortDescription(value) { this.shortDescriptionError = value },
    setDescription(value) { this.descriptionError = value },
    setRepository(value) { this.repositoryError = value },
    setChangeLog(value) { this.changeLogError = value },
  }
};
</script>
