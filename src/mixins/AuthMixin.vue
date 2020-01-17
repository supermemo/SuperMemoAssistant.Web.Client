<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    isAuthLoading() {
      return this.$store.getters["auth/isLoading"];
    },
    hasAuthError() {
      return this.$store.getters["auth/hasError"];
    },
    authError() {
      return this.$store.getters["auth/error"];
    }
  }
};
</script>