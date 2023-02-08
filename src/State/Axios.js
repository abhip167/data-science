import axios from "axios";
import { useNavigate } from "react-router-dom";

export function createAxiosClient({ options, getCurrentAccessToken }) {
  const client = axios.create(options);

  client.interceptors.request.use(
    (config) => {
      if (config.authorization !== false) {
        const token = localStorage.getItem("token") || getCurrentAccessToken;
        if (token) {
          config.headers["x-access-token"] = token;
        } else {
          const navigate = useNavigate();
          navigate("/login");
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      const navigate = useNavigate();
      navigate("/login");
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return client;
}

const client = createAxiosClient({
  options: {
    baseURL: "http://localhost:3000",
    timeout: 300000,
    headers: {
      "Content-Type": "application/json",
    },
  },
  getCurrentAccessToken: null,
});

export default client;
