import { get } from 'lodash';

export enum NavigationStack {
  App = 'app',
  StockTool = 'stockTool',
}

export enum AppStackRoute {
  Configuration = 'app/configuration',
  StockTool = 'app/stockTool',
}

export enum StockToolRoute {
  Find = 'app/stockTool/find',
  Storage = 'app/stockTool/storage',
  StockIn = 'app/stockTool/in',
  StockOut = 'app/stockTool/out',
}

export enum StorageStackRoute {
  CategoryList = 'app/stockTool/storage/category/list',
  CategoryAdd = 'app/stockTool/storage/category/add',
  CategoryEdit = 'app/stockTool/storage/category/edit',
  ItemList = 'app/stockTool/storage/item/list',
  ItemAdd = 'app/stockTool/storage/item/add',
  ItemEdit = 'app/stockTool/storage/item/edit',
}

export type NavigationStackParams = {
  [NavigationStack.App]: undefined;
};

export type AppStackScreenParams = {
  [AppStackRoute.StockTool]: undefined;
};

export type StockToolTabsScreenParams = {
  [StockToolRoute.Find]: undefined;
  [StockToolRoute.Storage]: undefined;
  [StockToolRoute.StockIn]: undefined;
  [StockToolRoute.StockOut]: undefined;
};

export type StorageStackScreenParams = {
  [StorageStackRoute.CategoryList]: undefined;
  [StorageStackRoute.CategoryAdd]: undefined;
  [StorageStackRoute.CategoryEdit]: { categoryId: string };
  [StorageStackRoute.ItemList]: { categoryId: string };
  [StorageStackRoute.ItemEdit]: { itemId: string };
  [StorageStackRoute.ItemAdd]: { categoryId: string };
};

const routeMap = {
  [NavigationStack.App]: {
    [AppStackRoute.Configuration]: AppStackRoute.Configuration,
    [AppStackRoute.StockTool]: {
      [StockToolRoute.Find]: StockToolRoute.Find,
      [StockToolRoute.Storage]: {
        [StorageStackRoute.CategoryList]: StorageStackRoute.CategoryList,
        [StorageStackRoute.CategoryAdd]: StorageStackRoute.CategoryAdd,
        [StorageStackRoute.CategoryEdit]: StorageStackRoute.CategoryEdit,
        [StorageStackRoute.ItemList]: StorageStackRoute.ItemList,
        [StorageStackRoute.ItemAdd]: StorageStackRoute.ItemAdd,
        [StorageStackRoute.ItemEdit]: StorageStackRoute.ItemEdit,
      },
      [StockToolRoute.StockIn]: StockToolRoute.StockIn,
      [StockToolRoute.StockOut]: StockToolRoute.StockOut,
    },
  },
};

const initRoutePaths = get(routeMap, '', []);
initRoutePaths.push(AppStackRoute.StockTool);

export const getInitialRouteName: <Return>(arg1: string, b?: Return) => Return | undefined = (navigatorName, defaultRoute) => {
  const indexInPath = initRoutePaths.indexOf(navigatorName);

  if (indexInPath === -1) {
    return defaultRoute;
  }

  return initRoutePaths[indexInPath - 1] as keyof typeof defaultRoute;
};
