import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "60vh",
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Grid container columns={12}>
            <Grid item xs={6}>
              <b>Email:</b> petros.rodinos@yahoo.com
            </Grid>
            <Grid item xs={6}>
              <b> Address:</b> Rethymno Crete Greece
            </Grid>
            <Grid item xs={6}>
              <b>Tel:</b>(+30)6975638081
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
