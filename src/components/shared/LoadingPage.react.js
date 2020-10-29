// @flow strict

import type {Node} from 'react';

import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Typography, CircularProgress} from '@material-ui/core';

import FlexLayout from 'components/shared/FlexLayout.react';

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
});

function LoadingPage(): Node {
  const classes = useStyles();

  return (
    <FlexLayout
      direction="vertical"
      align="center"
      justify="center"
      className={classes.root}
    >
      <CircularProgress size={64} />
      <Typography variant="h6" align="center" color="primary">
        Cargando...
      </Typography>
    </FlexLayout>
  );
}

export default LoadingPage;
