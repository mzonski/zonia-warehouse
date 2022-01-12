import { createAction, nanoid } from '@reduxjs/toolkit';

export const addCategory = createAction('category/add', (label: string) => ({
  payload: {
    id: nanoid(),
    label,
  },
}));

export const removeCategory = createAction('category/remove', (id: string) => ({
  payload: {
    id,
  },
}));

export const updateCategory = createAction('category/update', (id: string, label: string) => ({
  payload: {
    id,
    label,
  },
}));
