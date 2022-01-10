import React, { useEffect, useState } from "react";
import { AuthState } from "../context/authContext";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Box, Card, CardContent, Grid, Container } from "@mui/material";
import Orders from "../components/Orders";
//import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState(null);
  const auth = AuthState();
  const [searchParams] = useSearchParams();
  //const {fromShop} = useParams();
  const shopOrders = searchParams.get("shopOrders");

  async function fetchOrders() {
    let url = `${process.env.REACT_APP_API_URL}shop/orders`;
    if (shopOrders) {
      url = `${process.env.REACT_APP_API_URL}shop/orders?shopOrders=true`;
    }
    let config = {
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    };

    try {
      const { data } = await axios.get(url, config);
      if (data.message === "OK" && data.orders.length > 0) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log("errra ", error);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [shopOrders]);

  return (
    <Container
      sx={{
        marginTop: 8,
      }}
    >
      {orders && (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {orders && <Orders orders={orders} />}
          </Grid>
        </Box>
      )}
      {!orders && (
        <Card>
          <CardContent>
            <Alert severity="error">
              <AlertTitle>Your orders list is empty</AlertTitle>
              Buy some products first
            </Alert>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default MyOrders;
