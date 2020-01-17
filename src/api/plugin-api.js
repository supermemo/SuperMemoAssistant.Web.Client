import axios from "axios";

export default {
  create(form, iconFile) {
    const formData = new FormData(form);
    formData.delete('icon');
    formData.append("icon", iconFile);

    return axios.post("/api/plugins", formData);
  },
  get(id) {
    return axios.get(`/api/plugins/${id}`);
  }
};
