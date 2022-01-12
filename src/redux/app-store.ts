import { categoriesReducer } from '@redux/slices/categories-slice';
import { configurationReducer } from '@redux/slices/configuration-slice';
import { itemsReducer } from '@redux/slices/items-slice';
import { combineReducers, configureStore, StoreEnhancer } from '@reduxjs/toolkit';
import Reactotron from '@util/reactotron';

const appReducer = combineReducers({
  categories: categoriesReducer,
  items: itemsReducer,
  configuration: configurationReducer,
});

const enhancers = [Reactotron?.createEnhancer?.()] as StoreEnhancer[];

export const appStore = configureStore({
  reducer: appReducer,
  middleware: defaultMiddleware => defaultMiddleware({ serializableCheck: false }),
  enhancers,
});
