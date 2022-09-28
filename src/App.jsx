import Checkout from "./Checkout";
import Navbar from "./NavBar.jsx";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
    <ThemeProvider theme={theme}>
      <Navbar />
      {/* <Header />
      <Information /> */}
      <Checkout />
    </ThemeProvider>
  );
}

export default App;
