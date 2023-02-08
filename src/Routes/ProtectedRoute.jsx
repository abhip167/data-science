import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userState from "../State/userAtom.js";

export default ({ redirectPath = "/login", children }) => {
  const user = useRecoilValue(userState);

  if (!user.token) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
