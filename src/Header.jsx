import { Typography, Grid, Button, Box } from "@mui/material";
import headerImage from "./assets/header_image.svg";
const Header = () => (
  //   <Container maxWidth="md" >
  //     <Box sx={{ justifyContent: "space-between" }}>
  //       <Typography variant="h3"> Bring your data</Typography>
  //     </Box>
  //   </Container>
  <Grid
    container
    spacing={4}
    mt={4}
    alignItems="center"
    justifyContent="center"
  >
    <Grid item md={4}>
      <Typography variant="h2" style={{ fontWeight: "bolder" }}>
        Data Science
      </Typography>
      <Box mt={2}>
        <Typography variant="subtitle1" color="#494949">
          At Carleton we welcome organizations and individual volenteers to help
          our Data Science students with their own realistic data, which will
          help students to better understand their fundamentals. Are you ready
          to utilize your data for tomorrow's future ?
        </Typography>
      </Box>
      <Box mt={3}>
        <Button variant="contained" style={{ backgroundColor: "black" }}>
          Submit data
        </Button>
      </Box>
    </Grid>
    <Grid item md={4}>
      <img src={headerImage} style={{ width: "40rem" }}></img>
    </Grid>
  </Grid>
);

export default Header;
