// @flow strict

import type {Node} from 'react';

import React from 'react';

import {Typography} from '@material-ui/core';

type Props = {
  owner?: {
    name: string,
    phone: string,
    lastName: string,
    email: string,
  },
};

function Dashboard({owner}: Props): Node {
  return (
    <div>
      <Typography variant="h2" align="center" color="primary">
        FOOD WORKS - HOME
      </Typography>
      <Typography variant="body1" align="center" color="secondary">
        Owner, {owner?.name} {owner?.phone}
        <br />
        Email, {owner?.email}
      </Typography>
    </div>
  );
}

export default Dashboard;
