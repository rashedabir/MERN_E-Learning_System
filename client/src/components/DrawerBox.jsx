import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import clsx from "clsx";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../context/GlobalState";
import {
  adminDrawerItemList,
  drawerItemList,
  isLoggedDrawerItemList,
} from "../utils/drawerItemList";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(9) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
    [theme.breakpoints.down("xs")]: {
      width: 0,
    },
  },
  drawerList: {
    marginTop: "60px",
  },
  footer: {
    marginTop: "auto",
  },
  bgIcon: {
    color: "crimson",
  },
}));

function DrawerBox({ open, isAdmin }) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <Divider />
      <List className={classes.drawerList}>
        {isAdmin
          ? adminDrawerItemList.map((item) => (
              <ListItem
                button
                component={Link}
                to={item.path}
                selected={selectedIndex === item.id}
                onClick={(event) => handleListItemClick(event, item.id)}
              >
                <ListItemIcon
                  className={selectedIndex === item.id && classes.bgIcon}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ))
          : drawerItemList.map((item) => (
              <ListItem
                button
                component={Link}
                to={item.path}
                selected={selectedIndex === item.id}
                onClick={(event) => handleListItemClick(event, item.id)}
              >
                <ListItemIcon
                  className={selectedIndex === item.id && classes.bgIcon}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
        {isLogged
          ? isLoggedDrawerItemList.map((item) => (
              <ListItem
                button
                component={Link}
                to={item.path}
                selected={selectedIndex === item.id}
                onClick={(event) => handleListItemClick(event, item.id)}
              >
                <ListItemIcon
                  className={selectedIndex === item.id && classes.bgIcon}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ))
          : null}
      </List>
      <List className={classes.footer}>
        <Divider />
        <ListItem>
          <ListItemText>©2021</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default DrawerBox;
