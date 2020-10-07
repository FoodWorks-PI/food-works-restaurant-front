// @flow strict

import React from 'react';
import type {Node} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    background: 'none',
    backgroundColor: '#7EA8EF',
    color: '#fff',
    lineHeight: 1.5,
    border: 'none',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    padding: 8,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat',
    margin: '5px 0 5px 0',
    cursor: 'pointer',
  },
});

type Props = {
  onClick: (e: SyntheticMouseEvent<>) => mixed,
  children: Node,
  className?: string,
};

function Button(props: Props): Node {
  const classes = useStyles();

  return (
    <button className={clsx(classes.root, props.className)} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
