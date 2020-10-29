// @flow strict

import type {Node} from 'react';

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import FlexLayout from 'components/shared/FlexLayout.react';
import ProductCard from 'components/restaurant_menu/ProductCard.react';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '50%',
    padding: '5px 0 5px 0',
  },
});

function ProductsRow(): Node {
  const classes = useStyles();

  return <FlexLayout className={classes.root} wrap="wrap"></FlexLayout>;
}

export default ProductsRow;
