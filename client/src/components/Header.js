import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { AuthState } from "../context/authContext";
import { CartState } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

// import { createTheme } from "@mui/material/styles";
// import { ThemeProvider } from "@mui/styles";

// const mytheme = createTheme({
//   palette: {
//     primary: "#009688",
//     secondary: {
//       main: "#ff6e40",
//     },
//   },
// });

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Header = (props) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { window } = props;
  const auth = AuthState();
  const cart = CartState();
  const navigate = useNavigate();

  const settings = ["Profile", "Account", "Dashboard"];

  let pages = [];
  let icons = [];

  if (auth.token) {
    pages = [
      "Home",
      "My-Orders",
      "Shop-Orders",
      "Create-Product",
      "Mobile-Phones",
      "Contact",
    ];
    icons = [
      <HomeIcon />,
      <ShoppingBasketOutlinedIcon />,
      <ShoppingBasketOutlinedIcon />,
      <AddIcon />,
      <PhoneAndroidOutlinedIcon />,
      <MessageOutlinedIcon />,
    ];
  } else {
    // pages = ["Home", "Login", "Register", "Mobile-Phones", "Contact"];
    pages = ["Home", "Login-Register", "Mobile-Phones", "Contact"];
    icons = [
      <HomeIcon />,
      <VpnKeyOutlinedIcon />,
      <PhoneAndroidOutlinedIcon />,
      <MessageOutlinedIcon />,
    ];
    // icons = [
    //   <HomeIcon />,
    //   <VpnKeyOutlinedIcon />,
    //   <LoginOutlinedIcon />,
    //   <PhoneAndroidOutlinedIcon />,
    //   <MessageOutlinedIcon />,
    // ];
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Divider />
      <List>
        {pages.map((page, index) => (
          <Link
            key={Math.random()}
            style={{ textDecoration: "none", color: "grey" }}
            to={`/${page}`}
          >
            <MenuItem>
              <Typography textAlign="center">{page}</Typography>
              {icons[index]}
            </MenuItem>
            <Divider />
          </Link>
        ))}
        {auth.token && (
          <MenuItem
            style={{ color: "grey" }}
            key={Math.random()}
            onClick={() => auth.logout()}
          >
            <Typography textAlign="center">Logout</Typography>
            <PowerSettingsNewOutlinedIcon />
          </MenuItem>
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    // <ThemeProvider theme={mytheme}>
    <AppBar color="primary" position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handleDrawerToggle}
              open={mobileOpen}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Box
                component="nav"
                sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
              >
                <Drawer
                  container={container}
                  variant="temporary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                  sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                      boxSizing: "border-box",
                      width: 240,
                    },
                  }}
                >
                  {drawer}
                </Drawer>
              </Box>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => {
              if (page === "Shop-Orders") {
                return (
                  <Link
                    key={Math.random()}
                    style={{ textDecoration: "none", color: "white" }}
                    to={`/${page}?shopOrders=true`}
                  >
                    <MenuItem key={page}>
                      <Typography textAlign="center">{page}</Typography>
                      {icons[index]}
                    </MenuItem>
                  </Link>
                );
              }
              return (
                <Link
                  key={Math.random()}
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/${page}`}
                >
                  <MenuItem key={page}>
                    <Typography textAlign="center">{page}</Typography>
                    {icons[index]}
                  </MenuItem>
                </Link>
              );
            })}
            {auth.token && (
              <MenuItem
                key={Math.random()}
                onClick={() => {
                  auth.logout();
                  navigate("/");
                }}
              >
                <Typography textAlign="center">Logout</Typography>
                <PowerSettingsNewOutlinedIcon />
              </MenuItem>
            )}
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
                color="inherit"
              >
                <AccountCircle style={{ fontSize: "40px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Visit Cart">
              <IconButton
                size="large"
                aria-label="cart"
                aria-haspopup="true"
                onClick={() => {
                  navigate("/Cart");
                  if (cart.count >= 1) {
                  }
                }}
              >
                <StyledBadge
                  showZero
                  badgeContent={cart.count}
                  color="secondary"
                >
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  containerelement={<Link to="/login" />}
                  key={Math.random()}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    // </ThemeProvider>
  );
};
export default Header;
