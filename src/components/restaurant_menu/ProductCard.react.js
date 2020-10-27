// @flow strict

import type {Node} from 'react';

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {Typography, Paper, Chip, Checkbox, FormControlLabel} from '@material-ui/core';
import FlexLayout from 'components/shared/FlexLayout.react';
import Button from 'components/shared/Button.react';

import donuts from 'assets/placeholder.png';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '10px 0',
  },
  img: ({img}) => ({
    flex: '0 0 33.333%',
    height: 200,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: `url(${img})`,
  }),
  title: {
    fontWeight: 'bold',
    width: '100%',
  },
  content: {
    flex: '0 0 66.666%',
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
  buttons: {
    width: '100%',
    flexGrow: 3,
    alignItems: 'flex-end',
  },
  buttonEdit: {
    backgroundColor: theme.palette.secondary.main,
    marginRight: 8,
    fontSize: 13,
  },
  buttonDelete: {
    backgroundColor: theme.palette.error.main,
    fontSize: 13,
  },
}));

// const product = {
//   id: 0,
//   name: 'Donas',
//   isActive: true,
//   price: 50.0,
//   description: 'ricas donas de muchos sabores',
//   tags: ['postres', 'dulce'],
//   img: donuts,
// };

type Props = {
  product: {
    ID: number,
    name: string,
    description: string,
    isActive: boolean,
    cost: number,
    tags: [{name: string}],
  },
  handleClick: (e: SyntheticMouseEvent<>) => mixed,
};

function ProductCard({product, handleClick}: Props): Node {
  const img = donuts;
  const classes = useStyles({img});

  return (
    <Paper elevation={3} className={classes.root} square>
      <FlexLayout wrap="wrap" align="stretch">
        <FlexLayout className={classes.img}></FlexLayout>
        <FlexLayout className={classes.content} direction="vertical">
          <Typography variant="h4" className={classes.title}>
            {product.name}
          </Typography>
          <FlexLayout align="center" justify="between" className={classes.fullRow}>
            <Typography variant="subtitle1" align="justify">
              {product.description}
            </Typography>
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
                  label={tag.name}
                  key={ndx}
                  color="primary"
                  size="small"
                  className={classes.chip}
                />
              ))}
            </FlexLayout>
            <Typography variant="h6" color="primary" align="right">
              ${product.cost / 100}
            </Typography>
          </FlexLayout>
          <FlexLayout justify="end" className={classes.buttons}>
            <Button className={classes.buttonEdit} onClick={handleClick}>
              Editar
            </Button>
            <Button className={classes.buttonDelete} onClick={handleClick}>
              Eliminar
            </Button>
          </FlexLayout>
        </FlexLayout>
      </FlexLayout>
    </Paper>
  );
}

export default ProductCard;
