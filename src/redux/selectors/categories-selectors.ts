import { AppState } from '@redux/app-state';

export const getCategoryIds = (store: AppState) => store.categories.byId;
export const getCategories = (store: AppState) => store.categories.entities;
export const getCategory = (id: string) => (store: AppState) => store.categories.entities[id];
