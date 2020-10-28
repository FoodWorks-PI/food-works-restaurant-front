// @flow strict

export type Product = {
  ID: number,
  name: string,
  description: string,
  isActive: boolean,
  cost: number,
  tags: string[],
};

export type NewProduct = {
  restaurantID: ?number,
  name: string,
  description: string,
  isActive: boolean,
  cost: number,
  tags: string[],
};

export type Owner = {
  ID: number,
  email: string,
  name: string,
  restaurant: {
    ID: number,
    name: string,
  },
};
