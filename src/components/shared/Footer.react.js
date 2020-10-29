// @flow strict

import React from 'react';
import type {Node} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    width: '120%',
    height: '100%',
    bottom: '-63%',
    borderRadius: '50%',
    left: '-10%',
    background: 'linear-gradient(180deg, #7EA8EF 0%, rgba(126, 168, 239, 0.5) 100%)',
  },
  text: {
    position: 'absolute',
    top: '33%',
    width: '100%',
    color: 'white',
  },
});

function Footer(): Node {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span className={classes.text}>
        <Typography variant="h6" align="center">
          Food Works © 2020
        </Typography>
      </span>
    </div>
  );
}

export default Footer;
