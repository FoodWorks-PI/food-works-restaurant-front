// @flow strict

import type {Node} from 'react';
import type {Product, NewProduct} from 'constants/ResourcesTypes';

import React, {useState, useEffect} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Fab} from '@material-ui/core';
import {Add} from '@material-ui/icons';
import Sidebar from 'components/shared/Sidebar.react';
import FlexLayout from 'components/shared/FlexLayout.react';
import ProductCard from 'components/restaurant_menu/ProductCard.react';
import ErrorPage from 'components/shared/ErrorPage.react';
import LoadingPage from 'components/shared/LoadingPage.react';
import CreateProductDialog from 'components/create_product/CreateProductDialog.react';
import ProductEditDialog from 'components/restaurant_menu/ProductEditDialog.react';

import {useMutation, useQuery} from '@apollo/client';
import {GET_ALL_RESTAURANT_PRODUCTS} from 'services/apollo/queries';
import {
  TOGGLE_PRODUCT_STATUS,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  NEW_PRODUCT,
  UPLOAD_PRODUCT_IMAGE,
} from 'services/apollo/mutations';

const useStyles = makeStyles({
  root: {
    display: 'flex',
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
});

function Menu(): Node {
  const classes = useStyles();
  const [restaurantID, setID] = useState(null);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [currentProduct, setProduct] = useState<?Product>(null);

  const {loading, data, error, refetch} = useQuery(GET_ALL_RESTAURANT_PRODUCTS);
  const [toggleProductStatus] = useMutation(TOGGLE_PRODUCT_STATUS);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [createProduct] = useMutation(NEW_PRODUCT);
  const [uploadImage] = useMutation(UPLOAD_PRODUCT_IMAGE);

  useEffect(() => {
    if (data) {
      setID(data.getCurrentRestaurantOwner.restaurant.ID);
    }
  }, [data]);

  if (loading) return <LoadingPage />;

  if (error) {
    console.log(error);
    return <ErrorPage>Error con la API</ErrorPage>;
  }

  function handleProductDelete(ID: number) {
    deleteProduct({
      variables: {
        input: ID,
      },
    })
      .then((result) => {
        console.log(result);
        refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleProductEdit(product: Product) {
    updateProduct({
      variables: {
        input: {
          ID: product.ID,
          name: product.name,
          description: product.description,
          active: product.active,
          cost: product.cost,
          tags: product.tags,
        },
      },
    })
      .then((result) => {
        console.log(result);
        closeEditDialog();
        refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleProductCreation(product: NewProduct) {
    createProduct({
      variables: {
        input: {
          restaurantID: restaurantID,
          name: product.name,
          description: product.description,
          active: product.active,
          cost: parseInt(product.cost * 100),
          tags: product.tags,
        },
      },
    })
      .then((result) => {
        console.log('Created product successfully');
        console.log(result);
        setCreateOpen(false);
        refetch();
      })
      .catch((error) => {
        console.log('Error creating product');
        console.log(error);
      });
  }
  function handleImageUpload(file: File, ID: number) {
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
        refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function toggleStatus(ID: number) {
    toggleProductStatus({
      variables: {
        input: ID,
      },
    })
      .then((result) => {
        console.log(result);
        refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function openEditDialog(product: Product) {
    // Set values for form edit
    const formattedProduct = {
      ID: product.ID,
      name: product.name,
      description: product.description,
      active: product.active,
      cost: product.cost / 100,
      tags: product.tags,
      image: '',
    };
    setProduct(formattedProduct);
    setEditOpen(true);
  }
  function closeEditDialog() {
    setProduct(null);
    setEditOpen(false);
  }

  function openCreateDialog() {
    setCreateOpen(true);
  }
  function closeCreateDialog() {
    setCreateOpen(false);
  }

  return (
    <FlexLayout>
      <Sidebar />
      <FlexLayout direction="vertical" className={classes.content}>
        {data.getCurrentRestaurantOwner.restaurant.products.length === 0 && (
          <h1>No tienes productos</h1>
        )}
        {data.getCurrentRestaurantOwner.restaurant.products.map((product) => (
          <ProductCard
            product={product}
            key={product.ID}
            deleteProduct={handleProductDelete}
            editProduct={openEditDialog}
            toggleStatus={toggleStatus}
            uploadImage={handleImageUpload}
          />
        ))}
        <Fab
          color="primary"
          aria-label="add"
          size="medium"
          className={classes.fab}
          onClick={openCreateDialog}
        >
          <Add />
        </Fab>
        {currentProduct && (
          <ProductEditDialog
            isOpen={isEditOpen}
            closeDialog={closeEditDialog}
            currentProduct={currentProduct}
            updateProduct={handleProductEdit}
          />
        )}
        <CreateProductDialog
          isOpen={isCreateOpen}
          closeDialog={closeCreateDialog}
          createProduct={handleProductCreation}
        />
      </FlexLayout>
    </FlexLayout>
  );
}

export default Menu;
