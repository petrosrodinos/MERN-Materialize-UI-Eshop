import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Container,
  Typography,
  Box,
  CardContent,
  Tab,
  Tabs,
} from "@mui/material";
import Login from "./Login";
import Register from "./Register";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [fromGoogle, setFromGoogle] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container component="main" maxWidth="sm">
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
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  variant="fullWidth"
                >
                  {!fromGoogle && <Tab label="Login" {...a11yProps(0)} />}
                  {!fromGoogle && <Tab label="Register" {...a11yProps(1)} />}
                  {fromGoogle && <Tab label="Last Step" {...a11yProps(0)} />}
                </Tabs>
              </Box>
              {!fromGoogle && (
                <TabPanel value={value} index={0}>
                  <Login
                    onGoogleLogin={(state) => {
                      setFromGoogle(state);
                      setValue(0);
                    }}
                  />
                </TabPanel>
              )}
              {!fromGoogle && (
                <TabPanel value={value} index={1}>
                  <Register />
                </TabPanel>
              )}
              {fromGoogle && (
                <TabPanel value={value} index={0}>
                  <Register state={fromGoogle} />
                </TabPanel>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
