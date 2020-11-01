// @flow strict

import type {Node} from 'react';
import type {Owner, Restaurant, OwnerProfile} from 'constants/ResourcesTypes';

import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
// import {Typography} from '@material-ui/core';

import Sidebar from 'components/shared/Sidebar.react';
import FlexLayout from 'components/shared/FlexLayout.react';
import AccountMainPanel from 'components/account/AccountMainPanel.react';
import AccountSidePanel from 'components/account/AccountSidePanel.react';
import ErrorPage from 'components/shared/ErrorPage.react';
import LoadingPage from 'components/shared/LoadingPage.react';

import {useQuery} from '@apollo/client';
import {GET_CURRENT_COMPLETE_OWNER} from 'services/apollo/queries';

const useStyles = makeStyles({
  root: {
    flex: '0 0 33.333%',
  },
  content: {
    flexGrow: 1,
    marginLeft: 20,
    padding: '8px',
  },
  fab: {
    position: 'fixed',
    bottom: '5%',
    right: '5%',
    color: 'white',
  },
});

function AccountPage(): Node {
  const classes = useStyles();
  const {loading, error, data} = useQuery(GET_CURRENT_COMPLETE_OWNER);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage>Error con la API</ErrorPage>;

  function handleRestaurantEdit(restaurant: Restaurant) {
    console.log(restaurant);
  }
  function handleOwnerEdit(owner: OwnerProfile) {
    console.log(owner);
  }

  if (data) {
    const ownerData: Owner = data.getCurrentRestaurantOwner;
    const currentOwner = {
      ID: ownerData.ID,
      name: ownerData.name,
      lastName: ownerData.lastName,
      email: ownerData.email,
      phone: ownerData.phone,
    };
    const currentRestaurant = {
      ID: ownerData.restaurant.ID,
      name: ownerData.restaurant.name,
      description: ownerData.restaurant.description,
      tags: ownerData.restaurant.tags,
      address: ownerData.restaurant.address,
      products: ownerData.restaurant.products,
    };
    return (
      <FlexLayout>
        <Sidebar />
        <FlexLayout className={classes.content}>
          <AccountSidePanel restaurant={currentRestaurant} />
          <AccountMainPanel
            restaurant={currentRestaurant}
            editRestaurant={handleRestaurantEdit}
            owner={currentOwner}
            editOwner={handleOwnerEdit}
          />
        </FlexLayout>
      </FlexLayout>
    );
  } else {
    return <LoadingPage />;
  }
}

export default AccountPage;
