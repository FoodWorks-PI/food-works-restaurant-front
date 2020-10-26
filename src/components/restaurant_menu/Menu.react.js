// @flow strict

import type {Node} from 'react';

import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Sidebar from 'components/shared/Sidebar.react';
import FlexLayout from 'components/shared/FlexLayout.react';
import ProductsRow from 'components/restaurant_menu/ProductsRow.react';

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

function Menu(): Node {
  const classes = useStyles();

  return (
    <FlexLayout>
      <Sidebar />
      <FlexLayout direction="vertical" className={classes.content}>
        <ProductsRow />
      </FlexLayout>
    </FlexLayout>
  );
}

export default Menu;
