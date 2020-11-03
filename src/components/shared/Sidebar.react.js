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
  Hidden,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Home, Person, RestaurantMenu} from '@material-ui/icons';
import {NavLink, useLocation} from 'react-router-dom';
import clsx from 'clsx';

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
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

const items = [
  {
    name: 'Inicio',
    icon: Home,
    route: '/restaurant/protected',
  },
  {
    name: 'Menú',
    icon: RestaurantMenu,
    route: '/restaurant/protected/products',
  },
  {
    name: 'Cuenta',
    icon: Person,
    route: '/restaurant/protected/account',
  },
];

function Sidebar(): Node {
  const location = useLocation();
  const classes = useStyles();

  function isActive(route: string) {
    return location.pathname === route;
  }

  return (
    <>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="permanent"
          className={clsx(classes.root, classes.drawerClose)}
          classes={{
            paper: clsx(classes.drawerPaper, classes.drawerClose),
          }}
        >
          <div className={classes.drawerHeader}>
            <img alt="logo" src={logo} className={classes.logo} />
            <Typography variant="h5">FOOD WORKS</Typography>
          </div>
          <Divider />
          <List component="nav">
            {items.map((item, ndx) => (
              <ListItem
                key={ndx}
                button
                to={item.route}
                component={NavLink}
                selected={isActive(item.route)}
              >
                <ListItemIcon className={classes.icon}>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
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
            {items.map((item, ndx) => (
              <ListItem
                key={ndx}
                button
                to={item.route}
                component={NavLink}
                selected={isActive(item.route)}
              >
                <ListItemIcon className={classes.icon}>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Hidden>
    </>
  );
}

export default Sidebar;
