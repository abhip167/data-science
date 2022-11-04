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
import FileUploadForm from "./FileUploadForm.jsx";
import UserAddress from "./UserAddress.jsx";
import DataDescription from "./DataDescription.jsx";
import Navbar from "./NavBar.jsx";

const steps = ["User Details", "Data Description", "Files Upload"];

const defaultValues = {
  name: "",
  email: "",
  phone: undefined,
  description: "",
  natureOfWork: "",
  files: {},
};

export default () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormdata] = useState(defaultValues);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const submitForm = () => {
    handleNext();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  const handleSubmit = (data) => {
    setFormdata((oldFormData) => ({ ...oldFormData, ...data }));
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
            defaultValues={formData}
          />
        );

      case 1:
        return (
          <DataDescription
            handleBack={handleBack}
            onSubmit={handleSubmit}
            defaultValues={formData}
          />
        );
      case 2:
        return (
          <FileUploadForm handleBack={handleBack} onSubmit={handleSubmit} />
        );

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
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Stepper
            activeStep={activeStep}
            sx={{ pt: 3, pb: 5 }}
            alternativeLabel
          >
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
                <Typography variant="h5" gutterBottom>
                  Thank you so much.
                </Typography>
                <Typography variant="subtitle1">
                  Your data will help us shaping the next future generation.
                </Typography>
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
