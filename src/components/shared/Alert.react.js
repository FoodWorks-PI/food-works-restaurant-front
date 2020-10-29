// @flow strict

import React from 'react';
import type {Node} from 'react';

import {makeStyles} from '@material-ui/core/styles';

import {Collapse} from '@material-ui/core';
import {Alert as MuiAlert} from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    width: '50%',
    margin: '10px',
    alignSelf: 'center',
  },
});

type Props = {
  severity: string,
  open: boolean,
  setOpen: (value: boolean) => void,
  children: Node,
};

function Alert(props: Props): Node {
  const {severity, open, setOpen} = props;
  const classes = useStyles();

  return (
    <Collapse in={open} className={classes.root}>
      <MuiAlert severity={severity} onClose={() => setOpen(false)}>
        {props.children}
      </MuiAlert>
    </Collapse>
  );
}

export default Alert;
