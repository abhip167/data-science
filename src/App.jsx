import Checkout from "./Checkout";
import Navbar from "./NavBar.jsx";
import AdminPage from "./Pages/Admin.jsx";
import UserData from "./Pages/UserData.jsx";
import Login from "./Pages/Login.jsx";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import ProtectedRoute from "./Routes/ProtectedRoute.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
      contrastText: "#ffff",
    },
  },
});

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Navbar />

        <Routes>
          <Route index element={<Checkout />} />
          <Route path="login" element={<Login />} />

          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="user-data"
            element={
              <ProtectedRoute>
                <UserData />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
