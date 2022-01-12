import { addCategory, removeCategory, updateCategory } from '@redux/actions/categories-actions';
import { addItem, removeItem } from '@redux/actions/items-actions';
import { createSlice } from '@reduxjs/toolkit';
import { remove } from 'lodash';

export type Category = {
  id: string;
  label: string;
  items: string[];
};

export type CategoriesState = {
  byId: string[];
  entities: Record<string, Category>;
};

const initialState: CategoriesState = {
  byId: ['fridge', 'basement'],
  entities: {
    fridge: { id: 'fridge', label: 'Fridge', items: ['pepsi', 'fanta'] },
    basement: { id: 'basement', label: 'Basement', items: ['coca-cola'] },
  },
};
export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addCategory, (state, { payload: { id, label } }) => {
      state.byId.push(id);
      state.entities[id] = { id, label, items: [] };
    });
    builder.addCase(removeCategory, (state, { payload: { id } }) => {
      remove(state.byId, listId => listId === id);
      delete state.entities[id];
    });
    builder.addCase(updateCategory, (state, { payload: { id, label } }) => {
      state.entities[id].label = label;
    });
    builder.addCase(addItem, (state, { payload }) => {
      state.entities[payload.categoryId].items.push(payload.id);
    });
    builder.addCase(removeItem, (state, { payload: { id, categoryId } }) => {
      remove(state.entities[categoryId].items, listId => listId === id);
    });
  },
});

export const { actions: categoriesActions, reducer: categoriesReducer } = categoriesSlice;
