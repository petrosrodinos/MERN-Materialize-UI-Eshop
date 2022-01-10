import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Phone({ phone, onAddToCart, fromorders }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={phone.name}
        subheader={`${phone.price} $`}
      />
      <CardMedia component="img" height="400" alt="phone" image={phone.photo} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <b>{phone.description}</b>
        </Typography>
      </CardContent>
      {!fromorders && (
        <CardActions disableSpacing>
          <Button
            onClick={() => onAddToCart(phone)}
            size="medium"
            endIcon={<LocalGroceryStoreOutlinedIcon />}
          >
            Add to cart
          </Button>
          <ExpandMore aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      )}
    </Card>
  );
}
