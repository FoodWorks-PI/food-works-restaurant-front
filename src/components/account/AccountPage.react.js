// @flow strict

import type {Node} from 'react';
import type {Owner, Restaurant, OwnerProfile} from 'constants/ResourcesTypes';

import React, {useState} from 'react';

import {makeStyles} from '@material-ui/core/styles';

import Alert from 'components/shared/Alert.react';
import Sidebar from 'components/shared/Sidebar.react';
import FlexLayout from 'components/shared/FlexLayout.react';
import AccountMainPanel from 'components/account/AccountMainPanel.react';
import AccountSidePanel from 'components/account/AccountSidePanel.react';
import ErrorPage from 'components/shared/ErrorPage.react';
import LoadingPage from 'components/shared/LoadingPage.react';

import {useQuery, useMutation} from '@apollo/client';
import {GET_CURRENT_COMPLETE_OWNER} from 'services/apollo/queries';
import {
  UPDATE_RESTAURANT,
  UPDATE_OWNER,
  UPLOAD_RESTAURANT_IMAGE,
} from 'services/apollo/mutations';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: '0 0 33.333%',
  },
  content: {
    flexGrow: 1,
    marginLeft: 20,
    padding: '8px',
  },
  fab: {
    position: 'fixed',
    bottom: '5%',
    right: '5%',
    color: 'white',
  },
  mainPanel: {
    [theme.breakpoints.down('md')]: {
      flex: '0 0 100%',
    },
    flex: `0 0 80%`,
  },
  alert: {
    margin: 0,
  },
}));

function AccountPage(): Node {
  const classes = useStyles();
  const [alertOpen, setAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertType, setAlertType] = useState('warning');

  const {loading, error, data, refetch} = useQuery(GET_CURRENT_COMPLETE_OWNER);
  const [updateRestaurant] = useMutation(UPDATE_RESTAURANT);
  const [updateOwner] = useMutation(UPDATE_OWNER);
  const [uploadImage] = useMutation(UPLOAD_RESTAURANT_IMAGE);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage>Error con la API</ErrorPage>;

  function setAlertState(alert: {isOpen: boolean, text: string, type: ?string}) {
    setAlert(alert.isOpen);
    setAlertText(alert.text);
    const type = alert.type ? alert.type : 'warning';
    setAlertType(type);
  }

  function handleRestaurantEdit(restaurant: Restaurant) {
    updateRestaurant({
      variables: {
        input: {
          name: restaurant.name,
          description: restaurant.description,
          address: {
            longitude: restaurant.address.longitude,
            latitude: restaurant.address.latitude,
            streetLine: restaurant.address.streetLine,
          },
          tags: restaurant.tags,
        },
      },
    })
      .then((result) => {
        console.log(result);
        setAlertState({
          isOpen: true,
          text: 'Restaurante Editado exitosamente',
          type: 'success',
        });
        refetch();
      })
      .catch((error) => {
        console.log(error);
        setAlertState({
          isOpen: true,
          text: 'Error al editar restaurante',
          type: 'error',
        });
        refetch();
      });
  }
  function handleOwnerEdit(owner: OwnerProfile) {
    updateOwner({
      variables: {
        input: {
          name: owner.name,
          lastName: owner.lastName,
          phone: owner.phone,
        },
      },
    })
      .then((result) => {
        console.log(result);
        setAlertState({
          isOpen: true,
          text: 'Dueño/a Editado exitosamente',
          type: 'success',
        });
        refetch();
      })
      .catch((error) => {
        console.log(error);
        setAlertState({
          isOpen: true,
          text: 'Error al editar dueño/a',
          type: 'error',
        });
        refetch();
      });
  }

  function handleImageUpload(file: File, ID: number) {
    console.log(file);
    uploadImage({
      variables: {
        input: {
          ID: ID,
          file: file,
        },
      },
    })
      .then((result) => {
        console.log(result);
        setAlertState({
          isOpen: true,
          text: 'Imagen agregada',
          type: 'success',
        });
        refetch();
      })
      .catch((error) => {
        console.log(error);
        setAlertState({
          isOpen: true,
          text: 'Error al agregar imagen',
          type: 'error',
        });
        refetch();
      });
  }

  const ownerData: Owner = data.getCurrentRestaurantOwner;
  const currentOwner = {
    ID: ownerData.ID,
    name: ownerData.name,
    lastName: ownerData.lastName,
    email: ownerData.email,
    phone: ownerData.phone,
  };
  const currentRestaurant = {
    ID: ownerData.restaurant.ID,
    name: ownerData.restaurant.name,
    description: ownerData.restaurant.description,
    tags: ownerData.restaurant.tags,
    address: ownerData.restaurant.address,
    products: ownerData.restaurant.products,
    orders: ownerData.restaurant.orders,
    image: ownerData.restaurant.image,
  };
  return (
    <FlexLayout>
      <Sidebar />
      <FlexLayout className={classes.content}>
        <AccountSidePanel
          restaurant={currentRestaurant}
          uploadImage={handleImageUpload}
        />
        <FlexLayout direction="vertical" className={classes.mainPanel}>
          <Alert
            severity={alertType}
            open={alertOpen}
            setOpen={setAlert}
            className={classes.alert}
          >
            {alertText}
          </Alert>
          <AccountMainPanel
            restaurant={currentRestaurant}
            editRestaurant={handleRestaurantEdit}
            owner={currentOwner}
            editOwner={handleOwnerEdit}
            setAlertState={setAlertState}
          />
        </FlexLayout>
      </FlexLayout>
    </FlexLayout>
  );
}

export default AccountPage;
