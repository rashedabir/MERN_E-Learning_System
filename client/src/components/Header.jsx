import React, { Fragment, useState } from "react";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import DrawerBox from "./DrawerBox";
import {
  AppBar,
  Button,
  CssBaseline,
  IconButton,
  InputBase,
  makeStyles,
  Toolbar,
  Typography,
  alpha,
  Menu,
  MenuItem,
} from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import Dashboard from "../screens/Dashboard";
import { Route, Switch } from "react-router-dom";
import CourseList from "../screens/CourseList";
import About from "../screens/About";
import Login from "../screens/Login";
import Caterory from "../screens/Caterory";
import Registration from "../screens/Registration";
import logo from "../asstes/logo.png";
import { useContext } from "react";
import { GlobalState } from "../context/GlobalState";
import axios from "axios";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotFound from "../screens/NotFound";
import AddCourse from "../screens/AddCourse";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "linear-gradient(120deg, #2980b9, #8e44ad)",
  },
  appBarShift: {
    width: "100%",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    [theme.breakpoints.down("sm")]: {
      marginRight: 20,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
  },
  heading: {
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: "5px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  Button: {
    margin: "0 5px",
  },
  icon: {
    marginRight: "5px",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  iconDesktop: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function Header() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mobileMenuAnchorEl, setMobileMenuAchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const openMobileMenu = (event) => {
    setMobileMenuAchorEl(event.currentTarget);
  };

  const closeMobileMenu = () => {
    setMobileMenuAchorEl(null);
  };

  const logOut = async () => {
    await axios.get("/user/logout");
    localStorage.clear();
    setIsAdmin(false);
    setIsLogged(false);
    window.location.href = "/";
    closeMobileMenu();
  };

  const mobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchorEl}
      id="mobile-menu"
      keepMounted
      open={isMobileMenuOpen}
    >
      {isLogged ? (
        <div>
          <MenuItem component={Link} to="/profile" onClick={closeMobileMenu}>
            <AccountCircleIcon className={classes.icon} /> Profile
          </MenuItem>
          <MenuItem component={Link} to="/" onClick={logOut}>
            <ExitToAppIcon className={classes.icon} /> Log Out
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem component={Link} to="/login" onClick={closeMobileMenu}>
            <VpnKeyIcon className={classes.icon} /> Login
          </MenuItem>
          <MenuItem
            component={Link}
            to="/registration"
            onClick={closeMobileMenu}
          >
            <PersonAddIcon className={classes.icon} /> Registration
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component={Link}
              to="/"
              noWrap
              className={classes.heading}
            >
              <img width="140px" src={logo} alt="logo" />
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            {isLogged ? (
              <div className={classes.sectionDesktop}>
                <Button
                  className={classes.Button}
                  variant="contained"
                  color="default"
                  component={Link}
                  to="/profile"
                >
                  <AccountCircleIcon className={classes.icon} /> Profile
                </Button>
                <Button
                  className={classes.Button}
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/"
                  onClick={logOut}
                >
                  <ExitToAppIcon className={classes.icon} /> Log Out
                </Button>
              </div>
            ) : (
              <div className={classes.sectionDesktop}>
                <Button
                  className={classes.Button}
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/login"
                >
                  <VpnKeyIcon className={classes.icon} /> Login
                </Button>
                <Button
                  className={classes.Button}
                  variant="contained"
                  component={Link}
                  to="/registration"
                >
                  <PersonAddIcon className={classes.icon} /> registration
                </Button>
              </div>
            )}
            <IconButton
              className={classes.iconDesktop}
              color="inherit"
              onClick={openMobileMenu}
            >
              <MoreVertIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DrawerBox open={open} isAdmin={isAdmin} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/course" component={CourseList} />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/login"
              component={isLogged ? NotFound : Login}
            />
            <Route
              exact
              path="/registration"
              component={isLogged ? NotFound : Registration}
            />
            <Route
              exact
              path="/category"
              component={isAdmin ? Caterory : NotFound}
            />
            <Route
              exact
              path="/addcourse"
              component={isAdmin ? AddCourse : NotFound}
            />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </main>
      </div>
      {mobileMenu}
    </Fragment>
  );
}

export default Header;
