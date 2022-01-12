import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Card, CardContent, Box, IconButton, Snackbar } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import SendIcon from "@mui/icons-material/Send";
import { AuthState } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function EmailVerification({ values, onConfirm, type }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [send, setSend] = useState(null);
  const [code, setCode] = useState("");
  const [vType, setvType] = useState("");
  const [vals, setVals] = useState();
  const auth = AuthState();
  const navigate = useNavigate();

  const sendEmail = async () => {
    if (!values) return;
    let url;
    let userData = {};
    if (type === "email") {
      console.log("email");
      userData = {
        email: values.email,
        userId: values.userId,
      };
      url = `${process.env.REACT_APP_API_URL}verification/send-email`;
    } else {
      console.log("phone");
      userData = {
        phone: values.phone,
        userId: values.userId,
      };
      url = `${process.env.REACT_APP_API_URL}verification/send-sms`;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(url, userData);
      if (data.message === "OK") {
        setSend(true);
      } else {
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

  const confirmCode = async () => {
    if (!code) return;
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}verification/verify-code`,
        {
          userId: values.userId,
          otp: code,
          type,
        }
      );
      if (data.message === "OK") {
        onConfirm();
        // auth.login({ token: data.token, userId: data.userId });
        // navigate("/Mobile-Phones");
      } else {
        setError(data.message);
      }
      setLoading(false);
      //console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("An error occured");
    }
    setSend(false);
    setCode("");
  };

  useEffect(() => {
    if (type) {
      setvType(type);
    }
    if (values) {
      setVals(values);
    }
  }, [type, values]);

  return (
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
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={vType === "email" ? "Email" : "Phone"}
              inputProps={{ readOnly: true }}
              value={
                vType === "email" && vals ? vals.email : vals ? vals.phone : ""
              }
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: "10px" }} onClick={sendEmail}>
              <SendIcon />
            </IconButton>
            {send && (
              <Snackbar open={send} autoHideDuration={3000}>
                <Alert severity="success" sx={{ width: "100%" }}>
                  {`Verification Code sended to your ${
                    type === "email" ? "Email" : "Phone"
                  }`}
                </Alert>
              </Snackbar>
            )}
          </Paper>

          {send && (
            <>
              <br />
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Verification Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              </Paper>
              <br />
              {error && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {error}
                </Alert>
              )}
              <Button
                onClick={confirmCode}
                disabled={loading}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {!loading ? "Verify" : <CircularProgress color="success" />}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
