// @flow strict

import type {Node} from 'react';
import type {Restaurant} from 'constants/ResourcesTypes';

import React from 'react';

import {
  Hidden,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Paper,
  Typography,
  Divider,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import FlexLayout from 'components/shared/FlexLayout.react';

import img from 'assets/placeholder.png';

const useStyles = makeStyles({
  root: {
    flex: '0 0 20.0%',
  },
  img: {
    height: 120,
    width: '100%',
  },
  list: {
    width: '100%',
  },
  chip: {
    color: 'white',
  },
});

type Props = {
  restaurant: Restaurant,
};

function AccountSidePanel({restaurant}: Props): Node {
  const classes = useStyles();

  const totalProducts = restaurant.products.length;

  return (
    <Hidden mdDown>
      <Paper className={classes.root} elevation={3}>
        <FlexLayout direction="vertical" align="center">
          <img src={img} alt="Product Main" className={classes.img} />
          <Typography variant="h5">{restaurant.name}</Typography>
          <List className={classes.list}>
            <ListItem>
              <ListItemText primary="Mis productos" />
              <ListItemSecondaryAction>
                <Chip color="primary" label={totalProducts} className={classes.chip} />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Mis ordenes" />
              <ListItemSecondaryAction>
                <Chip color="primary" label="0" className={classes.chip} />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </FlexLayout>
      </Paper>
    </Hidden>
  );
}

export default AccountSidePanel;
