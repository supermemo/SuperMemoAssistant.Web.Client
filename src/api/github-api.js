import axios from "axios";

// Distinct instance without interceptors
const axiosClient = axios.create(
  {
    baseURL: "https://api.github.com",
    headers: { 'Accept': 'application/vnd.github.v3+json' },
  }
);