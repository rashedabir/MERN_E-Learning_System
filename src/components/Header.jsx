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
import Registration from "../screens/Registration";

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

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const openMobileMenu = (event) => {
    setMobileMenuAchorEl(event.currentTarget);
  };

  const closeMobileMenu = () => {
    setMobileMenuAchorEl(null);
  };

  const mobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchorEl}
      id="mobile-menu"
      keepMounted
      open={isMobileMenuOpen}
    >
      <MenuItem component={Link} to="/login" onClick={closeMobileMenu}>
        <VpnKeyIcon className={classes.icon} /> Login
      </MenuItem>
      <MenuItem component={Link} to="/registration" onClick={closeMobileMenu}>
        <PersonAddIcon className={classes.icon} /> Registration
      </MenuItem>
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
            <Typography variant="h6" noWrap className={classes.heading}>
              E-Learn
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
            <IconButton
              className={classes.iconDesktop}
              color="inherit"
              onClick={openMobileMenu}
            >
              <MoreVertIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DrawerBox open={open} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/course" component={CourseList} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />
          </Switch>
        </main>
      </div>
      {mobileMenu}
    </Fragment>
  );
}

export default Header;
