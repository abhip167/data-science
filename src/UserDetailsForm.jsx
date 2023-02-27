import * as React from "react";
import { Grid, Box, Button, Typography, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required("Organization/Individual name is required"),
    organization: yup.string().required("Organization name is required"),
    email: yup.string().email().required(),
    phone: yup
      .number("Please enter correct phone number")
      .min(10, "Please enter correct phone number")
      .required("Phone number is required"),
  })
  .required();

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
    <React.Fragment>
      <Typography variant="h6" align="center" gutterBottom>
        Data owner details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.name}
                label="Name"
                fullWidth
                autoComplete="name"
                variant="standard"
                helperText={errors.name?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="organization"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.organization}
                label="Organization"
                fullWidth
                autoComplete="organization"
                variant="standard"
                helperText={errors.organization?.message}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.email}
                label="Email"
                fullWidth
                autoComplete="email"
                variant="standard"
                helperText={errors.email?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.phone}
                label="Phone"
                fullWidth
                autoComplete="phone"
                variant="standard"
                helperText={errors.phone?.message}
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button color="inherit" disabled onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />

        <Button onClick={handleSubmit(onSubmit)}>Next</Button>
      </Box>
    </React.Fragment>
  );
};
