/* eslint-disable no-unused-expressions */
// @flow strict

import type {Node} from 'react';

import React from 'react';
import {useRef, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

type Props = $ReadOnly<{
  children: Node,
  onFocusChange: (boolean) => void,
}>;

// Detects focus within its children
export default function FocusWithin({children, onFocusChange}: Props): Node {
  // To set the listeners here
  const ref = useRef<?HTMLDivElement>(null);
  const classes = useStyles();

  useEffect(() => {
    function handleFocusIn() {
      onFocusChange(true);
    }

    function handleFocusOut() {
      onFocusChange(false);
    }

    const refCopy = ref.current;

    // focusin occurs when a child is focused
    refCopy?.addEventListener('focusin', handleFocusIn);
    // focusin occurs when a child is unfocused, or blurred
    refCopy?.addEventListener('focusout', handleFocusOut);

    return () => {
      refCopy?.removeEventListener('focusin', handleFocusIn);
      refCopy?.removeEventListener('focusout', handleFocusOut);
    };
  }, [ref, onFocusChange]);

  return (
    <div className={classes.root} ref={ref}>
      {children}
    </div>
  );
}
