import { Fragment } from "react";
import { Grid, Box, Button, Typography, TextField } from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

const schema = yup
  .object({
    address: yup.string().required("Address Line is required").max(50),
    city: yup.string().required("City is required").max(15),
    province: yup.string().required("Province is required").max(15),
    country: yup.string().required("Country is required").max(10),
    postalCode: yup.string().required().max(15),
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
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Data owner details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.address}
                label="Address"
                fullWidth
                autoComplete="address"
                variant="standard"
                multiline
                rows={2}
                helperText={errors.address?.message}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.city}
                label="City"
                fullWidth
                autoComplete="city"
                variant="standard"
                helperText={errors.city?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="province"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.province}
                label="State/Province/Region"
                fullWidth
                autoComplete="province"
                variant="standard"
                helperText={errors.province?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="postalCode"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.postalCode}
                label="Zip/Postal Code"
                fullWidth
                autoComplete="postal-code"
                variant="standard"
                helperText={errors.postalCode?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.country}
                label="Country"
                fullWidth
                autoComplete="country"
                variant="standard"
                helperText={errors.country?.message}
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
