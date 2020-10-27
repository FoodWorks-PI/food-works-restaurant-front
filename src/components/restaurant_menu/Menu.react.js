// @flow strict

import type {Node} from 'react';

import React, {useState, useEffect} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Sidebar from 'components/shared/Sidebar.react';
import FlexLayout from 'components/shared/FlexLayout.react';
import ProductCard from 'components/restaurant_menu/ProductCard.react';

import {useLazyQuery} from '@apollo/client';
import {GET_ALL_RESTAURANT_PRODUCTS} from 'services/apollo/queries';
import ErrorPage from 'components/shared/ErrorPage.react';

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

  const [owner, setData] = useState(null);
  const [getAllProducts, {loading, data, error}] = useLazyQuery(
    GET_ALL_RESTAURANT_PRODUCTS,
  );

  useEffect(() => {
    const local = localStorage.getItem('owner');
    const owner = local ? JSON.parse(local) : null;
    setData(owner);
  }, []);

  useEffect(() => {
    if (owner) {
      getAllProducts({
        variables: {
          input: {
            restaurantID: owner.restaurant.ID,
            productFilterConfig: {
              includeInactive: true,
            },
          },
        },
      });
    }
  }, [owner, getAllProducts]);

  if (loading) return 'Loading...';

  if (error) return <ErrorPage>Error con la API</ErrorPage>;

  function handleProduct(e: SyntheticMouseEvent<>) {
    console.log(e);
  }

  if (data) {
    return (
      <FlexLayout>
        <Sidebar />
        <FlexLayout direction="vertical" className={classes.content}>
          {data.getProductsByRestaurantID.map((product) => (
            <ProductCard
              product={product}
              key={product.ID}
              handleClick={handleProduct}
            />
          ))}
        </FlexLayout>
      </FlexLayout>
    );
  }

  return 'Loading...';
}

export default Menu;
