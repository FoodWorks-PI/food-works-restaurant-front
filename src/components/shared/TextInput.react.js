// @flow strict

import React from 'react';
import type {Node} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import FlexLayout from 'components/shared/FlexLayout.react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
}));

type TextInputType = 'text' | 'password' | 'email' | 'tel' | 'search' | 'number';

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
      </FlexLayout>
    </div>
  );
}
