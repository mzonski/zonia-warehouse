import { CategoriesState } from '@redux/slices/categories-slice';
import { ConfigurationState } from '@redux/slices/configuration-slice';
import { ItemsState } from '@redux/slices/items-slice';

export type AppState = {
  categories: CategoriesState;
  configuration: ConfigurationState;
  items: ItemsState;
};
