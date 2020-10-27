// @flow strict

import type {Node} from 'react';

import React, {useState, useEffect} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Typography, Fab} from '@material-ui/core';
import {Add} from '@material-ui/icons';
import Sidebar from 'components/shared/Sidebar.react';
import FlexLayout from 'components/shared/FlexLayout.react';
import CreateProductDialog from 'components/create_product/CreateProductDialog.react';

import {useMutation} from '@apollo/client';
import {NEW_PRODUCT} from 'services/apollo/mutations';
import {useHistory} from 'react-router-dom';

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

type Product = {
  name: string,
  description: string,
  cost: number,
  tags: string[],
  active: boolean,
  restaurantID: ?number,
};

type Owner = {
  ID: number,
  email: string,
  name: string,
  restaurant: {
    ID: number,
    name: string,
  },
};

function Dashboard(): Node {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const [ownerData, setOwnerData] = useState<?Owner>(null);
  const [createProduct] = useMutation(NEW_PRODUCT);
  const history = useHistory();

  useEffect(() => {
    const local = localStorage.getItem('owner');
    const owner = local ? JSON.parse(local) : null;
    setOwnerData(owner);
  }, []);

  function openDialog() {
    setOpen(true);
  }
  function closeDialog() {
    setOpen(false);
  }

  function handleProductCreation(product: Product) {
    console.log(product);
    // Change to cents
    product.cost = parseInt(product.cost) * 100;
    product.restaurantID = ownerData?.restaurant?.ID;
    createProduct({
      variables: {
        input: {
          ...product,
        },
      },
    })
      .then((result) => {
        console.log('Created product successfully');
        console.log(result);
        history.push('/restaurant/protected/products');
      })
      .catch((error) => {
        console.log('Error creating owner');
        console.log(error);
      });
  }

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
          <Fab
            color="primary"
            aria-label="add"
            size="medium"
            className={classes.fab}
            onClick={openDialog}
          >
            <Add />
          </Fab>
        </FlexLayout>
        <CreateProductDialog
          isOpen={isOpen}
          closeDialog={closeDialog}
          createProduct={handleProductCreation}
        />
      </FlexLayout>
    );
  } else {
    return 'Loading....';
  }
}

export default Dashboard;
