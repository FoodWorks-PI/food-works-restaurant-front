// @flow strict

import type {Node} from 'react';

import React from 'react';

import {IconButton} from '@material-ui/core';
import {PhotoCamera} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

import Button from 'components/shared/Button.react';
import FlexLayout from './FlexLayout.react';

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: 'none',
  },
  show: {
    display: 'flex',
  },
  root: {
    zIndex: 99,
  },
  successButton: {
    color: 'white',
    backgroundColor: theme.palette.success.main,
    fontSize: 12,
    margin: '0 3px',
  },
  cancelButton: {
    color: 'white',
    backgroundColor: theme.palette.error.main,
    fontSize: 12,
    margin: '0 3px',
  },
}));

type Props = {
  fileChange: (inputFile: File, inputURL: string) => void,
  cancelImage: () => void,
  uploadImage: () => void,
  file?: ?File,
  id: number,
};

function FileInput({fileChange, uploadImage, file, cancelImage, id}: Props): Node {
  const classes = useStyles();

  function handleInputChange(e: SyntheticInputEvent<>) {
    const inputFile = e.target.files[0];
    const inputURL = inputFile ? URL.createObjectURL(inputFile) : '';
    fileChange(inputFile, inputURL);
  }

  function handleUpload() {
    uploadImage();
  }
  function handleCancel() {
    cancelImage();
  }

  return (
    <FlexLayout className={classes.root} align="center">
      <input
        accept="image/*"
        className={classes.hidden}
        id={`image-selector-input-${id}`}
        type="file"
        onChange={handleInputChange}
      />
      <label htmlFor={`image-selector-input-${id}`}>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      <Button
        className={clsx(
          file && classes.show,
          !file && classes.hidden,
          classes.successButton,
        )}
        onClick={handleUpload}
      >
        Enviar
      </Button>
      <Button
        className={clsx(
          file && classes.show,
          !file && classes.hidden,
          classes.cancelButton,
        )}
        onClick={handleCancel}
      >
        Cancelar
      </Button>
    </FlexLayout>
  );
}

export default FileInput;
