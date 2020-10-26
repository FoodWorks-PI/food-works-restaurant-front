// @flow strict

import type {Node} from 'react';

import React, {useState} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Typography, Fab} from '@material-ui/core';
import {Add} from '@material-ui/icons';
import Sidebar from 'components/shared/Sidebar.react';
import FlexLayout from 'components/shared/FlexLayout.react';
import CreateProductDialog from 'components/create_product/CreateProductDialog.react';

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

type Props = {
  owner?: {
    name: string,
    phone: string,
    lastName: string,
    email: string,
  },
};
type Product = {
  name: string,
  description: string,
  price: number,
  tags: string[],
  isActive: boolean,
};

function Dashboard({owner}: Props): Node {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);

  function openDialog() {
    setOpen(true);
  }
  function closeDialog() {
    setOpen(false);
  }

  function handleProductCreation(product: Product) {
    product.price = parseInt(product.price);
    console.log(product);
  }

  return (
    <FlexLayout>
      <Sidebar />
      <FlexLayout direction="vertical" className={classes.content}>
        <Typography>Hello</Typography>
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
}

export default Dashboard;
