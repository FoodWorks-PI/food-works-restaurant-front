// @flow strict

import type {Node} from 'react';
import type {Product} from 'constants/ResourcesTypes';

import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {Typography, Paper, Chip, Checkbox, FormControlLabel} from '@material-ui/core';

import FlexLayout from 'components/shared/FlexLayout.react';
import Button from 'components/shared/Button.react';
import FileInput from 'components/shared/FileInput.react';
import placeholderImg from 'assets/placeholder.png';

import {BASE_MEDIA_URL} from 'constants/ResourcesTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '10px 0',
  },
  img: ({img}) => ({
    flex: '0 0 33.333%',
    height: 200,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${img})`,
  }),
  title: {
    fontWeight: 'bold',
    width: '100%',
  },
  content: {
    flex: '0 0 66.666%',
    width: '100%',
    padding: '8px',
  },
  fullRow: {
    width: '100%',
  },
  chip: {
    marginRight: 2,
    color: 'white',
    fontWeight: 'bold',
  },
  checkbox: {
    marginRight: 0,
  },
  buttons: {
    width: '100%',
    flexGrow: 3,
    alignItems: 'flex-end',
  },
  buttonEdit: {
    backgroundColor: theme.palette.secondary.main,
    marginRight: 8,
    fontSize: 13,
  },
  buttonDelete: {
    backgroundColor: theme.palette.error.main,
    fontSize: 13,
  },
}));

type Props = {
  product: Product,
  deleteProduct: (ID: number) => mixed,
  toggleStatus: (ID: number) => void,
  editProduct: (product: Product) => void,
  uploadImage: (file: File, ID: number) => void,
};

function ProductCard({
  product,
  deleteProduct,
  toggleStatus,
  editProduct,
  uploadImage,
}: Props): Node {
  const [fileURL, setFileURL] = useState(() => {
    return product.image !== '' ? `${BASE_MEDIA_URL}/${product.image}` : placeholderImg;
  });
  const [file, setFile] = useState<?File>(null);
  const img = fileURL ? fileURL : placeholderImg;
  const classes = useStyles({img});

  function handleDelete(e: SyntheticMouseEvent<>) {
    e.preventDefault();
    const confirmDeletion = window.confirm('¿Seguro que deseas eliminar el producto?');
    if (!confirmDeletion) {
      return;
    } else {
      deleteProduct(product.ID);
    }
  }

  function handleEdit(e: SyntheticMouseEvent<>) {
    editProduct(product);
  }

  function handleInputChange(inputFile: File, inputURL: string) {
    setFileURL(inputURL);
    setFile(inputFile);
  }
  function handleImageUpload() {
    if (file) {
      uploadImage(file, product.ID);
      setFile(null);
    } else {
      window.alert('Selecciona un archivo');
    }
  }
  function handleImageCancel() {
    const newImg = product.image ? product.image : placeholderImg;
    setFileURL(newImg);
    setFile(null);
  }

  return (
    <Paper elevation={3} className={classes.root} square>
      <FlexLayout wrap="wrap" align="stretch">
        <FlexLayout className={classes.img}>
          <FileInput
            fileChange={handleInputChange}
            cancelImage={handleImageCancel}
            uploadImage={handleImageUpload}
            file={file}
            id={product.ID}
          />
        </FlexLayout>
        <FlexLayout className={classes.content} direction="vertical">
          <Typography variant="h4" className={classes.title}>
            {product.name}
          </Typography>
          <FlexLayout align="center" justify="between" className={classes.fullRow}>
            <Typography variant="subtitle1" align="justify">
              {product.description}
            </Typography>
            <FormControlLabel
              className={classes.checkbox}
              control={
                <Checkbox
                  checked={product.active}
                  name="active"
                  color="primary"
                  onClick={() => toggleStatus(product.ID)}
                />
              }
              label="Activo"
            />
          </FlexLayout>
          <FlexLayout align="center" justify="between" className={classes.fullRow}>
            <FlexLayout>
              {product.tags.map((tag, ndx) => (
                <Chip
                  label={tag}
                  key={ndx}
                  color="primary"
                  size="small"
                  className={classes.chip}
                />
              ))}
            </FlexLayout>
            <Typography variant="h6" color="primary" align="right">
              ${product.cost / 100}
            </Typography>
          </FlexLayout>
          <FlexLayout justify="end" className={classes.buttons}>
            <Button className={classes.buttonEdit} onClick={handleEdit}>
              Editar
            </Button>
            <Button className={classes.buttonDelete} onClick={handleDelete}>
              Eliminar
            </Button>
          </FlexLayout>
        </FlexLayout>
      </FlexLayout>
    </Paper>
  );
}

export default ProductCard;
