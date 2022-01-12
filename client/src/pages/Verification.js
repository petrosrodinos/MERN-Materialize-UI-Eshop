import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { Typography, Card, CardContent, Container } from "@mui/material";
import EmailVerification from "../components/EmailVerification";
import { AuthState } from "../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const steps = ["Email Verification", "Phone Verification"];

export default function Verification() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [values, setvalues] = useState(null);
  const [missing, setMissing] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const auth = AuthState();

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  useEffect(() => {
    if (!location.state) {
      return navigate("/");
    }
    if (location.state.missing) {
      setMissing(location.state.missing);
      if (location.state.missing === "phone") {
        let newSkipped = skipped;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        handleNext();
      }
    }
    setvalues(location.state);
  }, [location.state]);

  useCallback(async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}users/login`,
        {
          email: values.email,
          password: values.password,
        }
      );
      if (data.message === "OK") {
        auth.login({ token: data.token, userId: data.userId });
        navigate("/Mobile-Phones");
      }
    } catch (error) {
      console.log(error);
    }
  }, [activeStep === steps.length]);

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Card>
          <CardContent>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Step {activeStep + 1}
                  {(activeStep === 0 || missing === "mail") && (
                    <EmailVerification
                      onConfirm={handleNext}
                      values={values}
                      type="email"
                    />
                  )}
                  {(activeStep === 1 || missing === "phone") && (
                    <EmailVerification
                      onConfirm={handleNext}
                      values={values}
                      type="phone"
                    />
                  )}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
