import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default () => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Data description
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Nature of work"
            placeholder="Tell us more about your organization or your work"
            autoComplete="shipping address-line1"
            variant="standard"
            fullWidth
            multiline
            maxRows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Data description"
            placeholder="Write about nature of data, history, data source, etc."
            autoComplete="shipping address-line1"
            variant="standard"
            fullWidth
            multiline
            maxRows={4}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
