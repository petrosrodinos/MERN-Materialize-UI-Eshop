import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Phone from "../components/Phone";
import Pagination from "@mui/material/Pagination";
import { CartState } from "../context/cartContext";
import { AuthState } from "../context/authContext";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert, Card, CardContent } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";

export default function MobilePhones() {
  const cart = CartState();
  const auth = AuthState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState(null);
  const [added, setAdded] = useState(false);
  const [paginationSize, setPaginationSize] = useState(5);

  const handlePageChange = (e) => {
    setCurrentPage(e.target.innerText);
  };

  const closeAdded = (event, reason) => {
    setAdded(false);
    if (reason === "clickaway") {
      return;
    }
  };

  const onAddToCart = (product) => {
    cart.addToCart(product);
    setAdded(true);
  };

  const fetchProducts = async (pageNumber) => {
    setLoading(true);
    try {
      let config = {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}shop/products?pageNumber=${pageNumber}&perPage=6`,
        config
      );

      setProducts(data.products);
      setPaginationSize(data.maxPosts);
      setLoading(false);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.log("errra ", error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  return (
    <Container
      sx={{
        marginTop: 8,
      }}
    >
      {loading && <CircularProgress color="error" />}
      {error && (
        <Card>
          <CardContent>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              No available products
            </Alert>
          </CardContent>
        </Card>
      )}
      {!error && products && (
        <>
          <Snackbar open={added} autoHideDuration={3000} onClose={closeAdded}>
            <Alert
              onClose={closeAdded}
              severity="success"
              sx={{ width: "100%" }}
            >
              Item added to your cart
            </Alert>
          </Snackbar>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {products &&
              products.map((phone, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Phone phone={phone} onAddToCart={onAddToCart} />
                </Grid>
              ))}
          </Grid>
          <br />
          <Pagination
            count={Math.floor(paginationSize / 6)}
            size="large"
            onChange={(e) => handlePageChange(e)}
            hidePrevButton
            hideNextButton
          />
        </>
      )}
    </Container>
  );
}
