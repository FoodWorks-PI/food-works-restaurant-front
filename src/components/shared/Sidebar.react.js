// @flow strict

import type {Node} from 'react';

import React from 'react';
import {
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Drawer,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Home, Person, RestaurantMenu} from '@material-ui/icons';
import {NavLink, useLocation} from 'react-router-dom';

import logo from 'assets/logo/logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    width: 240,
  },
  drawerPaper: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  logo: {
    maxWidth: 45,
    margin: '10px',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  icon: {
    color: 'white',
  },
}));

function Sidebar(): Node {
  const location = useLocation();
  const classes = useStyles();

  function isActive(route: string) {
    return location.pathname === route;
  }

  return (
    <Drawer
      variant="permanent"
      className={classes.root}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <img alt="logo" src={logo} className={classes.logo} />
        <Typography variant="h5">FOOD WORKS</Typography>
      </div>
      <Divider />
      <List component="nav">
        <ListItem
          button
          to="/restaurant/protected/dashboard"
          component={NavLink}
          selected={isActive('/restaurant/protected/dashboard')}
        >
          <ListItemIcon className={classes.icon}>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem button to="/restaurant/protected/products" component={NavLink}>
          <ListItemIcon className={classes.icon}>
            <RestaurantMenu />
          </ListItemIcon>
          <ListItemText primary="Menú" />
        </ListItem>
        <ListItem button to="/restaurant/protected/account" component={NavLink}>
          <ListItemIcon className={classes.icon}>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Cuenta" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
