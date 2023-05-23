import axios from "axios";

const instance = axios.create({
  baseURL: "https://fuse.theapparel.shop/api",
});

// const instance = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

instance.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem("token")) || null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.reload();
};

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const { status, data } = error?.response;
    if (status === 401 && !data?.auth) return logout()();
    return Promise.reject(error);
  }
);

export default instance;
