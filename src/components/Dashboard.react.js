// @flow strict

import type {Node} from 'react';
import type {NewProduct, Owner} from 'constants/ResourcesTypes';

import React, {useState, useEffect} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';

import Sidebar from 'components/shared/Sidebar.react';
import FlexLayout from 'components/shared/FlexLayout.react';
import LoadingPage from 'components/shared/LoadingPage.react';

const useStyles = makeStyles({
  root: {
    display: 'flex',
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

function Dashboard(): Node {
  const classes = useStyles();
  const [ownerData, setOwnerData] = useState<?Owner>(null);

  useEffect(() => {
    const local = localStorage.getItem('owner');
    const owner = local ? JSON.parse(local) : null;
    setOwnerData(owner);
  }, []);

  if (ownerData) {
    return (
      <FlexLayout>
        <Sidebar />
        <FlexLayout direction="vertical" className={classes.content}>
          <Typography variant="h4" color="primary">
            Hola! {ownerData.name}
          </Typography>
          <Typography variant="subtitle1" color="secondary">
            Bienvienido a tu restaurante "{ownerData.restaurant.name}"
          </Typography>
          <Typography variant="h6" color="secondary">
            No tienes ordenes
          </Typography>
        </FlexLayout>
      </FlexLayout>
    );
  } else {
    return <LoadingPage />;
  }
}

export default Dashboard;
