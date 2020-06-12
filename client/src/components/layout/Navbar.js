import React, { useContext } from "react";
import { GiSteeringWheel } from "react-icons/gi";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AdContext from "../../context/ad/adContext";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  spacing: 8,
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    backgroundColor: "#fff",
    color: "black",
    cursor: "pointer",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const adContext = useContext(AdContext);
  const { isAuthenticated, logout, user } = authContext;
  const { clearMyAds } = adContext;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    logout();
    clearMyAds();
  };

  const authLinks = (
    <>
      <Link to="/editing">
        <Button color="secondary" variant="contained">
          Post an ad
        </Button>
      </Link>
      <Link to="/myads">
        <Button color="inherit">My adverts</Button>
      </Link>
      <Box ml={1}>
        <Avatar
          alt=""
          src="/broken-image.jpg"
          className={classes.avatar}
          aria-haspopup="true"
          onClick={handleClick}
        >
          {user && user.name.toUpperCase().charAt(0)}
        </Avatar>
      </Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            onLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
  const guestLinks = (
    <>
      <Link to="/register">
        <Button color="inherit">Register</Button>
      </Link>
      <Link to="/login">
        <Button color="inherit">Login</Button>
      </Link>
    </>
  );
  return (
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" className={classes.title}>
          <Link to="/">
            <span style={{ color: "white" }}>Aut</span>

            <GiSteeringWheel style={{ color: "white", marginBottom: "-4px" }} />
            <span style={{ color: "red" }}>market</span>
          </Link>
        </Typography>

        <>{isAuthenticated ? authLinks : guestLinks}</>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
