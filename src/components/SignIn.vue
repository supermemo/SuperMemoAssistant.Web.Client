<template>
  <div
    id="signInModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="Sign In"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <form @submit.prevent="signIn()">
          <div class="modal-header text-center mb-3">
            <h4 class="modal-title w-100 font-weight-bold">Sign In</h4>

            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body mx-3 mb-1">
            <div v-if="hasAuthError" class="alert alert-danger" aria-hidden="true">
              <button type="button" class="close" data-dismiss="alert">&times;</button>
              <strong>Oh snap!</strong> Authentication failed. Try changing your email or password.
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-envelope fa-fw grey-text"></i>
                </span>
              </div>
              <input
                id="signInEmail"
                type="email"
                v-model="email"
                placeholder="your@email.com"
                class="form-control"
              >
            </div>
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-key fa-fw grey-text"></i>
                </span>
              </div>
              <input
                id="signInPassword"
                type="password"
                v-model="password"
                placeholder="password"
                class="form-control"
              >
            </div>
            <div class="d-flex justify-content-center">
              <button
                :disabled="email.length === 0 || password.length === 0 || isAuthLoading"
                type="submit"
                class="btn btn-primary width-100"
              >
                <span :hidden="isAuthLoading">Login</span>
                <div class="fas fa-spinner fa-spin" :hidden="isAuthLoading === false"></div>
              </button>
            </div>
          </div>

          <div class="modal-footer">
            <p class="font-small grey-text d-flex justify-content-end">
              Not a member?
              <a
                href="#"
                class="blue-text ml-1"
                data-toggle="modal"
                data-target="#signUpModal"
                data-dismiss="modal"
              >Sign Up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AuthMixin from "../mixins/AuthMixin";

export default {
  name: "signIn",
  mixins: [AuthMixin],
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signIn() {
      let payload = {
        email: this.email,
        password: this.password
      };

      this.$store.dispatch("auth/signIn", payload).then(() => {
        if (this.isAuthenticated) {
          $("#signInModal").modal("hide");

          this.email = "";
          this.password = "";
        }
      });
    }
  }
};
</script>