import { categoriesReducer } from '@redux/slices/categories-slice';
import { configurationReducer } from '@redux/slices/configuration-slice';
import { itemsReducer } from '@redux/slices/items-slice';
import { combineReducers, configureStore, Middleware, StoreEnhancer } from '@reduxjs/toolkit';

const appReducer = combineReducers({
  categories: categoriesReducer,
  items: itemsReducer,
  configuration: configurationReducer,
});

const enhancers: StoreEnhancer[] = [];
const middlewares: Middleware[] = [];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

export const appStore = configureStore({
  reducer: appReducer,
  middleware: defaultMiddleware => [...defaultMiddleware({ serializableCheck: false }), ...middlewares],
  enhancers,
});
