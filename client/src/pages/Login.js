import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
  Checkbox,
  Typography,
  TextField,
  FormControlLabel,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik } from "formik";
import InputAdornment from "@mui/material/InputAdornment";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { AuthState } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { Validators } from "../validators/authValidators";

const theme = createTheme();

const validation = Validators["LOGIN"];

export default function Login({ onGoogleLogin }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const auth = AuthState();
  const navigate = useNavigate();

  const loginHandler = async (values) => {
    setLoading(true);
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
      if (data.message === "NOT-VERIFIED") {
        if (!data.emailVerified) {
          console.log("mail");
          navigate("/Verification", {
            state: { email: data.email, userId: data.userId, missing: "email" },
          });
        }
        if (!data.phoneVerified) {
          console.log("phone");
          navigate("/Verification", {
            state: { phone: data.phone, userId: data.userId, missing: "phone" },
          });
        }
      }
      setError(false);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  const responseSuccessGoogle = async (response) => {
    //console.log(response);

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}users/google-login`,
        { tokenId: response.tokenId }
      );
      if (data.message === "OK") {
        auth.login({ token: data.token, userId: data.userId });
        navigate("/Mobile-Phones");
        return;
      }
      if (data.message === "NOT") {
        onGoogleLogin({
          google: true,
          username: response.profileObj.name,
          email: response.profileObj.email,
        });
        setLoading(false);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  const responseErrorGoogle = (response) => {
    console.log(response);
    setError(true);
  };

  return (
    <Formik
      initialValues={{ password: "", email: "" }}
      onSubmit={loginHandler}
      validationSchema={validation}
    >
      {({ handleChange, errors, touched, handleSubmit, values }) => (
        <ThemeProvider theme={theme}>
          <>
            <Typography component={"span"} variant="h5">
              Log in
            </Typography>
            <TextField
              margin="normal"
              placeholder="Email"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              error={touched.email && errors.email}
              helperText={errors.email}
              onChange={handleChange("email")}
              value={values.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              placeholder="Password"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange("password")}
              value={values.password}
              error={touched.password && errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <br />
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API}
              buttonText="Login with Google"
              onSuccess={responseSuccessGoogle}
              onFailure={responseErrorGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <br />
            <br />
            {error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Invalid Credentials
              </Alert>
            )}
            <Button
              onClick={handleSubmit}
              fullWidth
              disabled={loading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {!loading ? "Login" : <CircularProgress color="success" />}
            </Button>
          </>
        </ThemeProvider>
      )}
    </Formik>
  );
}
