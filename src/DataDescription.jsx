import { Fragment } from "react";
import { Grid, Box, Button, Typography, TextField } from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

const schema = yup
  .object({
    description: yup
      .string()
      .required("Data description is required")
      .max(1200),
    natureOfWork: yup.string().required("Nature of Work is required").max(1200),
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
      <Typography variant="h6" align="center" gutterBottom>
        Data description
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="natureOfWork"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.natureOfWork}
                label="Nature of Work"
                fullWidth
                autoComplete="work-type"
                variant="standard"
                multiline
                rows={5}
                helperText={errors.natureOfWork?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.description}
                label="Description about data"
                fullWidth
                autoComplete="description"
                variant="standard"
                multiline
                rows={5}
                helperText={errors.description?.message}
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
