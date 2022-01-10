import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate, Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ConfirmModal(props) {
  const navigate = useNavigate();
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {props.status === "0" && (
          <Alert severity="success">
            <AlertTitle>Buy Confirmed</AlertTitle>
            You successfully placed your order
          </Alert>
        )}
        {props.status === "3" && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Could not place order
          </Alert>
        )}
        {props.status === "1" && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            You are not authorized,please
            <Link
              to="/Login-Register"
              style={{ textDecoration: "none", color: "red" }}
            >
              <b> log in </b>
            </Link>
            first
          </Alert>
        )}
        {props.status === "2" && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Phone is not available
          </Alert>
        )}
      </Box>
    </Modal>
  );
}
