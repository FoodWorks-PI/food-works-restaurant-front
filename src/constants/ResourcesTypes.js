// @flow strict

export type Product = {
  ID: number,
  name: string,
  description: string,
  active: boolean,
  cost: number,
  tags: string[],
  image: string,
};

export type NewProduct = {
  restaurantID: ?number,
  name: string,
  description: string,
  active: boolean,
  cost: number,
  tags: string[],
};

export type Address = {
  latitude: number,
  longitude: number,
  streetLine: string,
};

export type Order = {
  ID: number,
  quantity: number,
  updatedAt: number,
  orderState: string,
  product: Product,
  customer: {
    name: string,
  },
};

export type Restaurant = {
  ID: number,
  name: string,
  description: string,
  tags: string[],
  address: Address,
  products: Product[],
  orders: Order[],
  image: string,
};

export type Owner = {
  ID: number,
  email: string,
  name: string,
  lastName: string,
  phone: string,
  restaurant: Restaurant,
};

export type OwnerProfile = {
  ID: number,
  email: string,
  name: string,
  lastName: string,
  phone: string,
};

export const BASE_URL = 'https://127.0.0.1:4455/api/media';
