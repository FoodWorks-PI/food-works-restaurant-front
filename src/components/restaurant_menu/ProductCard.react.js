// @flow strict

import type {Node} from 'react';

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {Typography, Paper, Chip, Checkbox, FormControlLabel} from '@material-ui/core';
import FlexLayout from 'components/shared/FlexLayout.react';

import donuts from 'assets/donuts.jpg';

const useStyles = makeStyles({
  root: {
    flex: '0 0 30%',
    margin: 10,
    minWidth: 300,
  },
  img: (props) => ({
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundImage: `url(${props.product.img})`,
  }),
  title: {
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 3,
    width: '100%',
  },
  content: {
    width: '100%',
    padding: '8px',
  },
  fullRow: {
    width: '100%',
  },
  chip: {
    marginRight: 2,
    color: 'white',
    fontWeight: 'bold',
  },
  checkbox: {
    marginRight: 0,
  },
});

const product = {
  id: 0,
  name: 'donas',
  isActive: true,
  price: 50.0,
  description: 'Ricas donas',
  tags: ['mexicana', 'asiatica'],
  img: donuts,
};

function ProductCard(): Node {
  const classes = useStyles({product});

  return (
    <Paper elevation={3} className={classes.root} square>
      <FlexLayout direction="vertical" justify="center">
        <FlexLayout className={classes.img} direction="vertical-reverse">
          <Typography variant="h4" className={classes.title}>
            {product.name}
          </Typography>
        </FlexLayout>
        <FlexLayout className={classes.content} direction="vertical">
          <FlexLayout align="center" justify="between" className={classes.fullRow}>
            <Typography variant="subtitle1">{product.description}</Typography>
            <FormControlLabel
              className={classes.checkbox}
              control={
                <Checkbox checked={product.isActive} name="isActive" color="primary" />
              }
              label="Activo"
            />
          </FlexLayout>
          <FlexLayout align="center" justify="between" className={classes.fullRow}>
            <FlexLayout>
              {product.tags.map((tag, ndx) => (
                <Chip
                  label={tag}
                  key={ndx}
                  color="primary"
                  size="small"
                  className={classes.chip}
                />
              ))}
            </FlexLayout>
            <Typography variant="h6" color="primary" align="right">
              ${product.price}
            </Typography>
          </FlexLayout>
        </FlexLayout>
      </FlexLayout>
    </Paper>
  );
}

export default ProductCard;
