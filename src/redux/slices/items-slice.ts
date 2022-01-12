import { removeCategory } from '@redux/actions/categories-actions';
import { addItem, addItemsToStock, removeItem, removeItemsFromStock, setItemQuantity, updateItem } from '@redux/actions/items-actions';
import { createSlice } from '@reduxjs/toolkit';
import { merge, remove } from 'lodash';

export type Item = {
  id: string;
  label: string;
  categoryId: string;
  sku: string;
  quantity: number;
};

export type ItemsState = {
  byId: string[];
  entities: Record<string, Item>;
};

const initialState: ItemsState = {
  byId: ['pepsi', 'coca-cola', 'fanta'],
  entities: {
    pepsi: { id: 'pepsi', label: 'Pepsi', categoryId: 'fridge', sku: '1', quantity: 5 },
    fanta: { id: 'fanta', label: 'Fanta', categoryId: 'fridge', sku: '6662137', quantity: 2 },
    'coca-cola': { id: 'coca-cola', label: 'Coca-Cola', categoryId: 'basement', sku: '3', quantity: 69 },
  },
};

const removeItemFromState = (state: ItemsState, itemId: string) => {
  remove(state.byId, listId => listId === itemId);
  delete state.entities[itemId];
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addItem, (state, { payload }) => {
      state.byId.push(payload.id);
      state.entities[payload.id] = { ...payload };
    });
    builder.addCase(updateItem, (state, { payload }) => {
      merge(state.entities[payload.id], payload);
    });
    builder.addCase(removeItem, (state, { payload: { id } }) => {
      removeItemFromState(state, id);
    });
    builder.addCase(removeCategory, (state, { payload: { id } }) => {
      const itemIdsToRemove = Object.values(state.entities)
        .filter(item => item.categoryId === id)
        .map(item => item.id);
      itemIdsToRemove.forEach(itemId => {
        remove(state.byId, itemId);
        delete state.entities[itemId];
      });
    });
    builder.addCase(setItemQuantity, (state, { payload: { sku, quantity } }) => {
      const item = Object.values(state.entities).find(entity => entity.sku === sku);
      if (item) {
        state.entities[item.id].quantity = quantity;
      }
    });
    builder.addCase(addItemsToStock, (state, { payload: { sku, quantity } }) => {
      const item = Object.values(state.entities).find(entity => entity.sku === sku);
      if (!item) return;
      state.entities[item.id].quantity += quantity;
    });
    builder.addCase(removeItemsFromStock, (state, { payload: { sku, quantity } }) => {
      const item = Object.values(state.entities).find(entity => entity.sku === sku);
      if (!item) return;
      state.entities[item.id].quantity -= quantity;
      if (state.entities[item.id].quantity > 0) return;
      removeItemFromState(state, item.id);
    });
  },
});

export const { actions: itemsActions, reducer: itemsReducer } = itemsSlice;
