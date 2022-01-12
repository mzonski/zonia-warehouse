import { AppState } from '@redux/app-state';

export const getItemIds = (store: AppState) => store.items.byId;
export const getItems = (store: AppState) => store.items.entities;
export const getItem = (id: string) => (store: AppState) => store.items.entities[id];
