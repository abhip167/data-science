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
} from "@mui/material";

import UserDetailsForm from "./UserDetailsForm.jsx";
import FileUploadForm from "./FileUploadForm.jsx";
import UserAddress from "./UserAddress.jsx";
import DataDescription from "./DataDescription.jsx";
const steps = [
  "User Details",
  "Contact Information",
  "Data Description",
  "Files Upload",
];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <UserDetailsForm />;
    case 1:
      return <UserAddress />;
    case 2:
      return <DataDescription />;
    case 3:
      return <FileUploadForm />;

    default:
      throw new Error("Unknown step");
  }
}

export default () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Submit Data
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Fragment>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
          </Fragment>
        ) : (
          <Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </Fragment>
        )}
      </Paper>
      {/* <Copyright /> */}
    </Container>
  );
};
