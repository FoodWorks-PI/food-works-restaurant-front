// @flow strict

import type {Node} from 'react';

import React from 'react';
import {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import FlexLayout from 'components/shared/FlexLayout.react';
import FocusWithin from 'components/shared/FocusWithin.react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  focusRingContainer: {
    width: '100%',
    position: 'relative',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'rgb(0,0,0,0.2)',
    borderRadius: 6,
    borderStyle: 'solid',
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 6,
    paddingTop: 6,
    width: '100%',
  },
  // Reset the styles of input
  input: {
    width: '100%',
    backgroundColor: 'transparent',
    border: 0,
    margin: 0,
    outline: 'none',
    textOverflow: 'ellipsis',
    fontFamily: theme.typography.fontFamily,
    fontSize: 14,
  },
  focusRing: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    borderRadius: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgb(0,0,0,0.2)',
    // To avoid overlap with the input container's focus
    pointerEvents: 'none',
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: theme.transitions.duration.shortest,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
  focusRingActive: {
    opacity: 1,
    borderColor: '#6b9cef',
  },
}));

type TextInputType = 'text' | 'password' | 'email' | 'tel' | 'search';

type Props = $ReadOnly<{
  className?: ?string,
  inputId?: string,
  label: string,
  errorMessage?: ?string,
  onChange?: (e: SyntheticInputEvent<>) => mixed,
  placeholder?: ?string,
  type?: TextInputType,
  value?: ?string,
}>;

export default function TextInput({
  className,
  errorMessage,
  inputId,
  label,
  onChange,
  type = 'text',
  value,
  ...inputProps
}: Props): Node {
  const [focused, setFocused] = useState(false);
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <FlexLayout direction="vertical">
        <FlexLayout direction="vertical">
          <label htmlFor={inputId}>
            <Typography variant="subtitle2">{label}</Typography>
          </label>
          {errorMessage !== null ? (
            <Typography color="error" variant="body2">
              {errorMessage}
            </Typography>
          ) : null}
        </FlexLayout>
        <FocusWithin onFocusChange={setFocused}>
          <div className={classes.focusRingContainer}>
            <div className={classes.inputContainer}>
              <input
                {...inputProps}
                className={classes.input}
                id={inputId}
                type={type}
                value={value}
                onChange={onChange}
              />
            </div>
            <div
              className={clsx(classes.focusRing, {
                [classes.focusRingActive]: focused,
              })}
            />
          </div>
        </FocusWithin>
      </FlexLayout>
    </div>
  );
}
