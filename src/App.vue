<template>
  <div>
    <SignIn/>
    <SignUp/>

    <Header/>

    <router-view/>
  </div>
</template>

<script>
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

export default {
  name: "app",
  components: {
    Header,
    SignIn,
    SignUp
  }
};
</script>

<style lang="less">
@media (max-width: 991.98px) {
  .container-l {
    max-width: 100%;
  }
}

@media (min-width: 992px) {
  .container-l {
    max-width: 960px;
  }
}

.rating .rating-star {
  font-size: 11px;
  margin-right: -1px;
  color: rgb(204, 173, 0);
}

.form-group.field-required label:after {
  content: "*";
  color: red;
}

.file-uploads label {
  display: none;
}

div.markdown-editor.is-invalid div.editor-toolbar {
  border-top-color: #FF0039;
  border-left-color: #FF0039;
  border-right-color: #FF0039;
  padding-right: 2.15625rem;
  background-repeat: no-repeat;
  background-position: center right calc(2.15625rem / 4);
  background-size: calc(2.15625rem / 2) calc(2.15625rem / 2);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23FF0039' viewBox='-2 -2 7 7'%3e%3cpath stroke='%23d9534f' d='M0 0l3 3m0-3L0 3'/%3e%3ccircle r='.5'/%3e%3ccircle cx='3' r='.5'/%3e%3ccircle cy='3' r='.5'/%3e%3ccircle cx='3' cy='3' r='.5'/%3e%3c/svg%3E");
}

div.markdown-editor.is-invalid div.CodeMirror {
  border-bottom-color: #FF0039;
  border-left-color: #FF0039;
  border-right-color: #FF0039;
}
</style>
