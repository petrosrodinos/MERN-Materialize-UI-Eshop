import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Typography, TextField, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik } from "formik";
import InputAdornment from "@mui/material/InputAdornment";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { AuthState } from "../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Validators } from "../validators/authValidators";

const theme = createTheme();

export default function Register({ state }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = AuthState();
  const navigate = useNavigate();
  const data = useLocation();
  const [fromGoogle, setFromGoogle] = useState(false);
  const [extra, setExtra] = useState(null);
  const [validation, setValidation] = useState({});

  const registerHandler = async (values) => {
    let valuesObject = {};
    if (extra) {
      valuesObject.username = extra.username;
      valuesObject.email = extra.email;
    }
    for (const key in values) {
      if (values[key] === "") continue;
      valuesObject[key] = values[key];
    }
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}users/register`,
        valuesObject
      );
      if (data.message !== "OK") {
        setError(data.message);
      } else {
        auth.login({ token: data.token, userId: data.userId });
        navigate("/Mobile-Phones");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("An error occured");
    }
  };

  useEffect(() => {
    if (state) {
      setFromGoogle(true);
      setExtra({ username: state.username, email: state.email });
      setValidation(Validators["FROMGOOGLE"]);
      return;
    }
    setValidation(Validators["REGISTER"]);
  }, []);

  return (
    <Formik
      initialValues={{
        phone: "",
        password: "",
        username: "",
        email: "",
        address: "",
      }}
      onSubmit={(values) => registerHandler(values)}
      validationSchema={validation}
    >
      {({ handleChange, errors, touched, handleSubmit, values }) => (
        <ThemeProvider theme={theme}>
          <>
            <Typography component={"span"} variant="h5">
              {!fromGoogle ? "Sign Up" : "More Info"}
            </Typography>
            <Grid container spacing={2}>
              {!fromGoogle && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      placeholder="User Name"
                      autoComplete="username"
                      name="username"
                      required
                      fullWidth
                      id="username"
                      label="User Name"
                      autoFocus
                      error={touched.username && errors.username}
                      helperText={errors.username}
                      onChange={handleChange}
                      value={values.username}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutlinedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      placeholder="Email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      error={touched.email && errors.email}
                      helperText={errors.email}
                      onChange={handleChange}
                      value={values.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlinedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Password"
                  id="password"
                  autoComplete="new-password"
                  error={touched.password && errors.password}
                  helperText={errors.password}
                  onChange={handleChange}
                  value={values.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  placeholder="Phone"
                  label="Phone"
                  name="phone"
                  type="number"
                  autoComplete="phone"
                  error={touched.phone && errors.phone}
                  helperText={errors.phone}
                  onChange={handleChange}
                  value={values.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalPhoneOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  placeholder="Address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  error={touched.address && errors.address}
                  helperText={errors.address}
                  onChange={handleChange}
                  value={values.address}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <br />
            {error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            )}
            <Button
              onClick={handleSubmit}
              fullWidth
              disabled={loading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {!loading ? "Register" : <CircularProgress color="success" />}
            </Button>
          </>
        </ThemeProvider>
      )}
    </Formik>
  );
}
