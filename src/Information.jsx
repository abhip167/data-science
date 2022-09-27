import { Typography, Grid, Button, Box } from "@mui/material";
import InformationImage from "./assets/information.svg";
import InformationImageTwo from "./assets/information_2.svg";
import BulletPoint from "./assets/bulletPoint.svg";
const Information = () => (
  <Grid
    style={{ backgroundColor: "#fff2f2" }}
    container
    spacing={2}
    mt={1}
    px={4}
    pt={4}
    justifyContent="space-between"
  >
    <Grid item md={4}>
      <Typography variant="h4" style={{ fontWeight: "bolder" }}>
        Our Purpose
      </Typography>
      <Box mt={2}>
        <Typography variant="subtitle1" color="#494949">
          Out motto is to help students learn and understand data in a better
          way by providing them with real life examples.
        </Typography>
      </Box>
      <Box mt={3} style={{ display: "flex" }}>
        <img
          src={BulletPoint}
          style={{ width: "25px", marginRight: "1rem" }}
        ></img>

        <Typography variant="h6" color="#494949">
          Better Learning experience
        </Typography>
      </Box>
      <Box mt={3} style={{ display: "flex" }}>
        <img
          src={BulletPoint}
          style={{ width: "25px", marginRight: "1rem" }}
        ></img>

        <Typography variant="h6" color="#494949">
          Good Portfolio
        </Typography>
      </Box>
      <Box mt={3} style={{ display: "flex" }}>
        <img
          src={BulletPoint}
          style={{ width: "25px", marginRight: "1rem" }}
        ></img>

        <Typography variant="h6" color="#494949">
          Deep understanding of the concept
        </Typography>
      </Box>
      <Box mt={3} style={{ display: "flex" }}>
        <img
          src={BulletPoint}
          style={{ width: "25px", marginRight: "1rem" }}
        ></img>

        <Typography variant="h6" color="#494949">
          Diverse data analysis techniques
        </Typography>
      </Box>
    </Grid>
    <Grid item container md={6}>
      <Grid item md={6}>
        <img src={InformationImage} style={{ width: "18rem" }}></img>
      </Grid>
      <Grid item md={6}>
        <Box mt={24}>
          <img src={InformationImageTwo} style={{ width: "18rem" }}></img>
        </Box>
      </Grid>
    </Grid>
  </Grid>
);

export default Information;
