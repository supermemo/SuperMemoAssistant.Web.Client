import axios from "axios";

// Distinct instance without interceptors
const axiosClient = axios.create();

export default {
  signIn(email, password) {
    return axiosClient.post("/api/auth/login", {
      username: email,
      password: password
    });
  },
  signOut() {
    return axios.post("/api/auth/logout");
  },
  signUp(email, username, password) {
    return axiosClient.post("/api/users", {
      email: email,
      username: username,
      password: password
    });
  },
  getCurrentUser() {
    return axios.get("/api/users/current");
  }
};
