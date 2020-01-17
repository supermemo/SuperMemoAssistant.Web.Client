<template>
  <div
    id="signUpModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="Sign Up"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <form @submit.prevent="signUp()">
          <!-- Header -->
          <div class="modal-header text-center mb-3">
            <h4 class="modal-title w-100 font-weight-bold">Sign Up</h4>

            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <!-- Body -->
          <div class="modal-body mx-3 mb-1">
            <!-- Alert message -->
            <div
              v-if="hasRegistrationError"
              class="alert alert-dismissible alert-danger"
              aria-hidden="true"
            >
              <button type="button" class="close" data-dismiss="alert">&times;</button>
              <strong>Oh snap!</strong>
              Registration failed.
              <span v-html="registrationError"></span>
            </div>

            <!-- Username input -->
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-user fa-fw grey-text"></i>
                </span>
              </div>
              <input
                type="text"
                v-model.trim="$v.username.$model"
                placeholder="username"
                :class="{ 'form-control': true, 'is-invalid': hasUsernameError }"
              >
              <div
                class="invalid-feedback"
                v-if="!$v.username.minLength"
              >Must be at least 4 characters.</div>
              <div
                class="invalid-feedback"
                v-if="!$v.username.maxLength"
              >Must 30 characters at most.</div>
              <div class="invalid-feedback" v-if="usernameError">{{ usernameError }}</div>
            </div>

            <!-- Email input -->
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-envelope fa-fw grey-text"></i>
                </span>
              </div>
              <input
                type="email"
                v-model.trim="$v.email.$model"
                placeholder="your@email.com"
                :class="{ 'form-control': true, 'is-invalid': hasEmailError }"
              >
              <div class="invalid-feedback" v-if="$v.email.$error">Invalid email format.</div>
              <div class="invalid-feedback" v-id="hasEmailError">{{ emailError }}</div>
            </div>

            <!-- Password input -->
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-key fa-fw grey-text"></i>
                </span>
              </div>
              <input
                type="password"
                v-model="$v.password.$model"
                placeholder="password"
                :class="{ 'form-control': true, 'is-invalid': hasPasswordError }"
              >
              <div
                class="invalid-feedback"
                v-if="!$v.password.minLength"
              >Must be at least 4 characters.</div>
              <div
                class="invalid-feedback"
                v-if="!$v.password.maxLength"
              >Must 100 characters at most.</div>
              <div class="invalid-feedback" v-if="passwordError">{{ passwordError }}</div>
            </div>

            <!-- Repeat password input -->
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-key fa-fw grey-text"></i>
                </span>
              </div>
              <input
                type="password"
                v-model="$v.passwordRepeat.$model"
                placeholder="repeat password"
                :class="{ 'form-control': true, 'is-invalid': hasPasswordRepeatError }"
              >
              <div
                class="invalid-feedback"
                v-if="!$v.passwordRepeat.sameAsPassword"
              >Password do not match.</div>
            </div>
          </div>

          <!-- Footer -->
          <div class="modal-footer d-flex justify-content-center">
            <button :disabled="isButtonDisabled" type="submit" class="btn btn-primary">
              <span :hidden="isLoading">Sign up !</span>
              <div class="fas fa-spinner fa-spin" :hidden="isLoading === false"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import helpers from "../helpers/api-helper.js";
import AuthAPI from "../api/auth-api.js";
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs
} from "vuelidate/lib/validators";

export default {
  name: "signUp",
  data: function() {
    return {
      email: "",
      username: "",
      password: "",
      passwordRepeat: "",
      isLoading: false,
      emailError: null,
      usernameError: null,
      passwordError: null,
      registrationError: null
    };
  },
  computed: {
    hasRegistrationError: function() {
      return this.registrationError !== null;
    },
    hasUsernameError: function() { return this.$v.username.$error || this.usernameError !== null; },
    hasEmailError: function() { return this.$v.email.$error || this.emailError !== null; },
    hasPasswordError: function() { return this.$v.password.$error || this.passwordError !== null; },
    hasPasswordRepeatError: function() { return this.$v.passwordRepeat.$error; },
    isButtonDisabled: function() {
      return (
        this.$v.$invalid ||
        this.passwordRepeat.length == 0 ||
        this.isLoading
      );
    }
  },
  validations: {
    email: { required, email },
    username: { required, minLength: minLength(4), maxLength: maxLength(30) },
    password: { required, minLength: minLength(4), maxLength: maxLength(100) },
    passwordRepeat: { required, sameAsPassword: sameAs("password") }
  },
  methods: {
    signUp() {
      this.isLoading = true;

      AuthAPI.signUp(this.email, this.username, this.password)
        .then(data => {
          this.clear();

          $("#signUpModal").modal("hide");
        })
        .catch(err => {
          helpers.handleHydraError(
            err,
            {
              email: this.setEmailError,
              username: this.setUsernameError,
              password: this.setPasswordError
            },
            this.setRegistrationError
          );

          this.isLoading = false;
        });
    },
    setEmailError(e) {
      this.emailError = e;
    },
    setUsernameError(e) {
      this.usernameError = e;
    },
    setPasswordError(e) {
      this.passwordError = e;
    },
    setRegistrationError(e) {
      this.registrationError = e;
    },
    clear() {
      this.username = "";
      this.email = "";
      this.password = "";
      this.emailError = null;
      this.usernameError = null;
      this.passwordError = null;
      this.registrationError = null;

      this.isLoading = false;
    }
  }
};
</script>