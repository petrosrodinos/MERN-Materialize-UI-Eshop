import React, { useEffect, useState } from "react";
import { Card, CardContent, Button, Grid, Container } from "@mui/material";
import { CartState } from "../context/cartContext";
import Phone from "../components/Phone";
import ConfirmModal from "../components/ConfirmModal";
import { AuthState } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function CartPage() {
  const cartstate = CartState();
  const auth = AuthState();
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (cartstate.cart) {
      setCart(cartstate.cart);
      let temp = 0;
      cartstate.cart.map((a) => {
        temp += parseInt(a.price);
      });
      setTotal(temp);
    }
  }, [cartstate.cart]);

  const makeOrder = async () => {
    if (!auth.token) {
      setStatus("1");
      setOpen(true);
      return;
    }
    const { productIds, shopId } = cartstate.getCartData();
    let config = {
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    };

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}shop/orders`,
        { shopId, products: productIds, total },
        config
      );
      setLoading(false);
      if (data.message === "OK") {
        setStatus("0");
        cartstate.emptyCart();
        navigate("/Mobile-Phones");
      }
    } catch (error) {
      setError(true);
      setLoading(false);
      setStatus("3");
    }
    setOpen(true);
  };

  return (
    <Container
      sx={{
        marginTop: 8,
      }}
    >
      <ConfirmModal open={open} handleClose={handleClose} status={status} />
      {loading && <CircularProgress color="error" />}
      <Card>
        <CardContent>
          {!cart && (
            <Alert severity="error">
              <AlertTitle>Your cart is empty</AlertTitle>
              Add some products to your cart first
            </Alert>
          )}
          {cart && (
            <>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {cart &&
                  cart.map((phone, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                      <Phone phone={phone} fromorders />
                    </Grid>
                  ))}
              </Grid>
              <br />
              <Card>
                <CardContent>
                  <b>Cart Total: {total}$</b>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={makeOrder}
                      >
                        Make Order
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          cartstate.emptyCart();
                          navigate("/Mobile-Phones");
                        }}
                      >
                        Empty Cart
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
