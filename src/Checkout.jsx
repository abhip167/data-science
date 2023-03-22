import { useState, Fragment } from "react";
import {
  Container,
  Typography,
  Stepper,
  Box,
  Button,
  Paper,
  Step,
  StepLabel,
  CircularProgress,
} from "@mui/material";

import UserDetailsForm from "./UserDetailsForm.jsx";
import DataDescription from "./DataDescription.jsx";

const steps = ["User Details", "Project & Data Description"];

const defaultValues = {
  name: "",
  organization: "",
  email: "",
  phone: null,
  description: null,
  natureOfWork: null,
  files: {},
};

export default () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const submitForm = async () => {
    handleNext();
    setIsLoading(true);

    console.log({ defaultValues });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(defaultValues),
    };
    const response = await fetch(
      "https://datasciencebackend.azurewebsites.net/details",
      requestOptions
    );
    const data = await response.json();
    console.log({ data });

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleSubmit = (data) => {
    switch (activeStep) {
      case 0:
        defaultValues.name = data.name;
        defaultValues.email = data.email;
        defaultValues.phone = data.phone;
        defaultValues.organization = data.organization;
        break;
      case 1:
        defaultValues.natureOfWork = data.natureOfWork;
        defaultValues.description = data.description;
        break;
    }

    console.log({ defaultValues });
    console.log({ data });

    if (activeStep === steps.length - 1) {
      submitForm();
    } else {
      handleNext();
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <UserDetailsForm
            handleBack={handleBack}
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
          />
        );

      case 1:
        return (
          <DataDescription
            handleBack={handleBack}
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
          />
        );
      // case 2:
      //   return (
      //     <FileUploadForm handleBack={handleBack} onSubmit={handleSubmit} />
      //   );

      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <Box mt={4}>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" style={{ fontWeight: "bolder" }}>
          Submit Data
        </Typography>
      </Box>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label} color="red">
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            isLoading ? (
              <Box sx={{ display: "flex" }} justifyContent="center">
                <CircularProgress />
              </Box>
            ) : (
              <Fragment>
                <Typography variant="h5" align="center" gutterBottom>
                  We appreciate your contribution.
                </Typography>
                <Typography variant="subtitle1">
                  Please allow us for <b>1-2 days</b> to reach out to you. You
                  will receive an email to upload your files. We are looking for
                  more data for our students. Please spread the word for us in
                  your network. Thank you.
                </Typography>

                <Typography variant="subtitle1"></Typography>
              </Fragment>
            )
          ) : (
            <Fragment>{getStepContent(activeStep)}</Fragment>
          )}
        </Paper>
        {/* <Copyright /> */}
      </Container>
    </Box>
  );
};
