import React, { useEffect, useState } from "react";
import { Card, CardContent, Container, Alert, AlertTitle } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { CartState } from "../context/cartContext";
import { AuthState } from "../context/authContext";
import axios from "axios";

export default function AfterCheckout() {
  const [state, setState] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const cartstate = CartState();
  const auth = AuthState();

  useEffect(() => {
    const val = searchParams.get("success");
    if (val === "true") {
      if (cartstate.cart) {
        let total = 0;
        cartstate.cart.map((item) => {
          total += parseInt(item.price);
        });
        createOrder(total);
      }
      setState(true);
      return;
    }
    setState(false);
  }, [cartstate.cart]);

  const createOrder = async (total) => {
    const { productIds, shopId } = cartstate.getCartData();

    console.log(total);
    let config = {
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    };
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}shop/orders`,
        { shopId, products: productIds, total },
        config
      );
      if (data.message === "OK") {
        console.log("okk");
        cartstate.emptyCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      sx={{
        marginTop: 8,
      }}
    >
      <Card>
        <CardContent>
          {state === true && (
            <Alert severity="success">
              <AlertTitle>Order Success</AlertTitle>
            </Alert>
          )}
          {state === false && (
            <Alert severity="error">
              <AlertTitle>Order failure</AlertTitle>
            </Alert>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
