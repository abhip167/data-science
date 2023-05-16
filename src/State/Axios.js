import axios from "axios";
import { useLayoutEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import userState from "../State/userAtom.js";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const AxiosInterceptor = ({ children }) => {
  console.log("interceptor");
  const [user, setUser] = useRecoilState(userState);

  const navigate = useNavigate();

  const logout = () => {
    setUser({ ...user, isAuthenticated: false, token: null });

    navigate("/login");
  };

  useLayoutEffect(() => {
    console.log("useEffect");

    const resInterceptor = (response) => {
      if ([401, 403].includes(response.status)) {
        logout();
      }
      return response;
    };

    const errInterceptor = (error) => {
      console.log("errInterceptor", error);
      if ([401, 403].includes(error.response.status)) {
        logout();
      }

      return Promise.reject();
    };

    const RequestInterceptor = instance.interceptors.request.use(
      (config) => {
        // const userData = JSON.parse(localStorage.getItem("user"));
        if (user?.token) {
          config.headers["x-access-token"] = user.token;
        }
        return config;
      },
      (error) => {
        console.log("Error in request interceptor", error);
        Promise.reject(error);
      }
    );

    const ResponseInterceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );
    return () => {
      instance.interceptors.response.eject(ResponseInterceptor);
      instance.interceptors.request.eject(RequestInterceptor);
    };
  });

  return children;
};

export default instance;
export { AxiosInterceptor };
