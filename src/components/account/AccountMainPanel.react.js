// @flow strict

import type {Node} from 'react';
import type {Restaurant, OwnerProfile} from 'constants/ResourcesTypes';

import React from 'react';

import {Hidden, Paper, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import FlexLayout from 'components/shared/FlexLayout.react';
import EditRestaurantForm from 'components/account/AccountEditRestaurantForm.react';
import EditOwnerForm from 'components/account/AccountEditOwnerForm.react';
import DeleteRestaurantForm from 'components/account/AccountDeleteRestaurant.react';
import DeleteOwnerForm from 'components/account/AccountDeleteOwner.react';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      flex: '0 0 100%',
    },
    flex: `0 0 80%`,
    margin: '0 5px',
    padding: 5,
  },
  img: {
    height: 200,
    width: '100%',
  },
}));

type Props = {
  editRestaurant: (restaurant: Restaurant) => void,
  restaurant: Restaurant,
  editOwner: (owner: OwnerProfile) => void,
  owner: OwnerProfile,
};

function AccountSidePanel({editRestaurant, restaurant, editOwner, owner}: Props): Node {
  const classes = useStyles();

  return (
    <Hidden>
      <Paper className={classes.root} elevation={3}>
        <FlexLayout direction="vertical">
          <Typography variant="h5" gutterBottom align="center">
            Edita tu cuenta
          </Typography>
          <EditRestaurantForm
            currentRestaurant={restaurant}
            editRestaurant={editRestaurant}
          />
          <EditOwnerForm currentOwner={owner} editOwner={editOwner} />
          <DeleteRestaurantForm restaurant={restaurant} />
          <DeleteOwnerForm owner={owner} />
        </FlexLayout>
      </Paper>
    </Hidden>
  );
}

export default AccountSidePanel;
