// @flow strict

import React from 'react';
import type {Node} from 'react';
import {Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import logo from 'assets/logo/logo.svg';

const useStyles = makeStyles({
  logo: {
    maxWidth: 60,
    margin: '10px',
  },
});

function Navbar(): Node {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center">
      <img alt="logo" src={logo} className={classes.logo} />
      <Typography variant="h5" color="primary">
        FOOD WORKS
      </Typography>
    </Grid>
  );
}

export default Navbar;
