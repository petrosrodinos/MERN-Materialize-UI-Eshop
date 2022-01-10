import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CardMedia,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

export default function Orders(props) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const formattedDate = (date) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dateObj = new Date(date);
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, "0");
    const year = dateObj.getFullYear();
    return month + "\n" + day + "," + year;
  };

  return (
    <Container
      sx={{
        marginTop: 8,
      }}
    >
      <Card>
        <CardContent>
          {props.orders.map((order) => {
            return (
              <Accordion
                expanded={expanded === order._id}
                onChange={handleChange(order._id)}
                key={Math.random()}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    {formattedDate(order.createdAt)}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    Total: {order.total}$
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {order.userId && (
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Username</StyledTableCell>
                            <StyledTableCell>Phone</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Address</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <StyledTableRow
                            key={Math.random()}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <StyledTableCell>
                              {order.userId.username}
                            </StyledTableCell>
                            <StyledTableCell>
                              {order.userId.phone}
                            </StyledTableCell>
                            <StyledTableCell>
                              {order.userId.email}
                            </StyledTableCell>
                            <StyledTableCell>
                              {order.userId.address}
                            </StyledTableCell>
                          </StyledTableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                  <br />
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Name</StyledTableCell>
                          <StyledTableCell>Description</StyledTableCell>
                          <StyledTableCell>Price</StyledTableCell>
                          <StyledTableCell>Photo</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.products.map((product) => (
                          <StyledTableRow
                            key={Math.random()}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{product.price} $</TableCell>
                            <TableCell>
                              <CardMedia
                                component="img"
                                height="100"
                                width="50"
                                alt="phone"
                                image={product.photo}
                              />
                            </TableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </CardContent>
      </Card>
    </Container>
  );
}
