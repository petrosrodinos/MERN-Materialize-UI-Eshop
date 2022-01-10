import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Card,
  Container,
  Typography,
  Box,
  TextField,
  CardContent,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { AuthState } from "../context/authContext";

const theme = createTheme();

const validation = yup.object().shape({
  name: yup
    .string("Only numbers are allowed")
    .trim()
    .required("Name is reguired"),
  description: yup.string().trim().required("description is required"),
  price: yup
    .string("Only alphabets are allowed")
    .trim()
    .required("Price is required"),
  photo: yup.string().required("Photo is required"),
});

export default function CreateProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = AuthState();

  const createProduct = async (values) => {
    setLoading(true);
    setError(null);
    try {
      let config = {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}shop/products`,
        {
          name: values.name,
          description: values.description,
          price: values.price,
          photo: values.photo,
        },
        config
      );
      if (data.message !== "OK") {
        setError(data.message);
      }
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("An error occured");
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        price: "",
        photo: "",
      }}
      onSubmit={(values) => createProduct(values)}
      validationSchema={validation}
    >
      {({ handleChange, errors, touched, handleSubmit, values }) => (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Card>
                <CardContent>
                  <Typography component="h1" variant="h5">
                    Create Product
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        placeholder="Name"
                        autoComplete="name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        autoFocus
                        error={touched.name && errors.name}
                        helperText={errors.name}
                        onChange={handleChange}
                        value={values.name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="price"
                        label="Price"
                        type="number"
                        placeholder="Price"
                        id="price"
                        error={touched.price && errors.price}
                        helperText={errors.price}
                        onChange={handleChange}
                        value={values.price}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="photo"
                        placeholder="Photo"
                        label="Photo"
                        name="photo"
                        autoComplete="photo"
                        error={touched.photo && errors.photo}
                        helperText={errors.photo}
                        onChange={handleChange}
                        value={values.photo}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="description"
                        placeholder="Description"
                        label="Description"
                        name="description"
                        multiline
                        error={touched.description && errors.description}
                        helperText={errors.description}
                        onChange={handleChange}
                        value={values.description}
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
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Create Product
                  </Button>
                  {loading && <CircularProgress color="success" />}
                </CardContent>
              </Card>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </Formik>
  );
}
