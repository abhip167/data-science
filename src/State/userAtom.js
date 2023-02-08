import { atom } from "recoil";

const userAtom = atom({
  key: "user",

  default: {
    isAuthenticated: false,
    first_name: "",
    last_name: "",
    email: "",
    token: "",
  },
});

export default userAtom;
