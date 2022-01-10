import React from "react";

import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Box,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";

function Contact() {
  return (
    <Container component="main" maxWidth="sm">
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
            <Typography gutterBottom variant="h5">
              Contact Us
            </Typography>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField
                  placeholder="Name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  placeholder="Subject"
                  label="Subject"
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SubjectOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  placeholder="Email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  multiline
                  rows={4}
                  placeholder="Type your message here"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  send
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Contact;
