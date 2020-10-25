// @flow strict

import type {Node} from 'react';

import React from 'react';

import FlexLayout from 'components/shared/FlexLayout.react';
import {Typography} from '@material-ui/core';
import Navbar from './Navbar.react';

type Props = {
  children: Node,
};

function ErrorPage({children}: Props): Node {
  return (
    <>
      <Navbar />
      <FlexLayout justify="center" align="center" direction="vertical">
        <Typography variant="h2" align="center" gutterBottom color="error">
          Oops.. ocurrió un error.
        </Typography>
        <Typography variant="h6">{children}</Typography>
      </FlexLayout>
    </>
  );
}

export default ErrorPage;
