import axios from "axios";
import { useEffect } from "react";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

const AxiosInterceptor = ({ children }) => {
  console.log("interceptor");

  useEffect(() => {
    console.log("useEffect");

    const resInterceptor = (response) => {
      console.log("resInterceptor");
      return response;
    };

    const errInterceptor = (error) => {
      console.log("errInterceptor");
      if (error.response.status === 401) {
        //redirect logic here
      }

      return Promise.reject();
    };

    const ResponseInterceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    instance.interceptors.request.use(
      (config) => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
          config.headers["x-access-token"] = user.token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.response.eject(ResponseInterceptor);
    };
  }, []);

  return children;
};

export default instance;
export { AxiosInterceptor };
