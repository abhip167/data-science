import { Fragment } from "react";
import { Grid, Box, Button, Typography, TextField } from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

const schema = yup.object({
  collectionMethod: yup.string().max(1200),
  format: yup.string().max(1200),
  updateFrequency: yup.string().max(1200),
  ethicsApproval: yup.string().max(1200),
  collaboration: yup.string().max(1200),
  financialSupport: yup.string().max(1200),
});

export default ({ handleBack, onSubmit, defaultValues }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Collaboration Details (Optional)
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Controller
            name="collectionMethod"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.collectionMethod}
                label="Data Collection Method (How was the data collected ?)"
                fullWidth
                autoComplete="data-collection-method"
                variant="standard"
                multiline
                placeholder="e.g. Survey, Interview, Observation, etc."
                rows={2}
                helperText={errors.collectionMethod?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="format"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.format}
                label="Data Format (What format is the data in ?)"
                fullWidth
                autoComplete="format"
                variant="standard"
                multiline
                placeholder="e.g. CSV, Excel, SPSS, etc."
                rows={2}
                helperText={errors.format?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="updateFrequency"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.updateFrequency}
                label="Update Frequency (How often is the data updated ?)"
                fullWidth
                autoComplete="format"
                variant="standard"
                multiline
                placeholder="e.g. Daily, Weekly, Monthly, etc."
                rows={2}
                helperText={errors.updateFrequency?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="ethicsApproval"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.ethicsApproval}
                label="Ethics Approval (Any ethical, privacy, or licensing concerns  ?)"
                fullWidth
                autoComplete="format"
                variant="standard"
                multiline
                placeholder="e.g. Yes, No. If yes, please provide details."
                rows={2}
                helperText={errors.ethicsApproval?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="collaboration"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.collaboration}
                label="Available for future collaboration with students ?"
                fullWidth
                autoComplete="format"
                variant="standard"
                multiline
                placeholder="Yes, No. If yes, please provide the availability of a company representative (e.g. meetings frequencies)"
                rows={2}
                helperText={errors.collaboration?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="financialApproval"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.financialApproval}
                label="Willing to support students financially ?"
                fullWidth
                autoComplete="format"
                variant="standard"
                multiline
                placeholder="eg: For attending a conference to publish and present the outcome of the collaboration"
                rows={2}
                helperText={errors.financialApproval?.message}
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />

        <Button onClick={handleSubmit(onSubmit)}>Next</Button>
      </Box>
    </Fragment>
  );
};
