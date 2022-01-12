import { Item } from '@redux/slices/items-slice';
import { createAction } from '@reduxjs/toolkit';

export const addItem = createAction('item/add', (item: Item) => ({
  payload: item,
}));

export const removeItem = createAction('item/remove', (id: string, categoryId: string) => ({
  payload: {
    id,
    categoryId,
  },
}));

export const updateItem = createAction('item/update', (item: Item) => ({
  payload: item,
}));

export const setItemQuantity = createAction('item/quantity/set', (sku: string, quantity: number) => ({
  payload: { sku, quantity },
}));

export const addItemsToStock = createAction('item/quantity/increase', (sku: string, quantity: number) => ({
  payload: { sku, quantity },
}));

export const removeItemsFromStock = createAction('item/quantity/decrease', (sku: string, quantity: number) => ({
  payload: { sku, quantity },
}));
