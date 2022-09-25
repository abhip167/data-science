import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default () => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Data owner details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Organization/Individual name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Email"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="Contact number"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
