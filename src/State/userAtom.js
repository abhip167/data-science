import { atom } from "recoil";

const userToken = JSON.parse(localStorage.getItem("user"));

const userAtom = atom({
  key: "user",

  default: {
    isAuthenticated: userToken ? true : false,
    first_name: userToken?.first_name || "",
    last_name: userToken?.last_name || "",
    email: userToken?.email || "",
    token: userToken?.token || "",
  },
});

export default userAtom;
