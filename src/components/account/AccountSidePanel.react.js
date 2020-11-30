// @flow strict

import type {Node} from 'react';
import type {Restaurant} from 'constants/ResourcesTypes';

import React, {useState} from 'react';
import {
  Hidden,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Paper,
  Typography,
  Divider,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import FlexLayout from 'components/shared/FlexLayout.react';
import FileInput from 'components/shared/FileInput.react';

import placeholderImg from 'assets/placeholder.png';
import {BASE_MEDIA_URL} from 'constants/ResourcesTypes';

const useStyles = makeStyles({
  root: {
    flex: '0 0 20.0%',
  },
  img: {
    height: 130,
    width: '100%',
    objectFit: 'cover',
  },
  list: {
    width: '100%',
  },
  chip: {
    color: 'white',
  },
  imageInput: {
    position: 'fixed',
  },
});

type Props = {
  restaurant: Restaurant,
  uploadImage: (file: File, ID: number) => void,
};

function AccountSidePanel({restaurant, uploadImage}: Props): Node {
  const classes = useStyles();
  const [fileURL, setFileURL] = useState(() => {
    return restaurant.image !== '' ? `${BASE_MEDIA_URL}/${restaurant.image}` : placeholderImg;
  });
  const [file, setFile] = useState<?File>(null);

  const totalProducts = restaurant.products.length;
  const totalOrders = restaurant.orders.length;

  function handleInputChange(inputFile: File, inputURL: string) {
    setFileURL(inputURL);
    setFile(inputFile);
  }

  function handleImageUpload() {
    if (file) {
      uploadImage(file, restaurant.ID);
      setFile(null);
    } else {
      window.alert('Selecciona un archivo');
    }
  }
  function handleImageCancel() {
    const newImg = restaurant.image ? `${BASE_MEDIA_URL}/${restaurant.image}` : placeholderImg;
    setFileURL(newImg);
    setFile(null);
  }

  console.log(restaurant.image);

  return (
    <Hidden mdDown>
      <Paper className={classes.root} elevation={3}>
        <FlexLayout direction="vertical" align="center">
          <FlexLayout direction="vertical">
            <img
              src={fileURL ? fileURL : placeholderImg}
              alt="Product Main"
              className={classes.img}
            />
            <div className={classes.imageInput}>
              <FileInput
                fileChange={handleInputChange}
                cancelImage={handleImageCancel}
                uploadImage={handleImageUpload}
                file={file}
                id={restaurant.ID}
              />
            </div>
          </FlexLayout>
          <Typography variant="h5">{restaurant.name}</Typography>
          <List className={classes.list}>
            <ListItem>
              <ListItemText primary="Mis productos" />
              <ListItemSecondaryAction>
                <Chip color="primary" label={totalProducts} className={classes.chip} />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Mis ordenes" />
              <ListItemSecondaryAction>
                <Chip color="primary" label={totalOrders} className={classes.chip} />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </FlexLayout>
      </Paper>
    </Hidden>
  );
}

export default AccountSidePanel;
