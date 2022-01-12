import { useCallback } from 'react';

import { StorageStackRoute, StorageStackScreenParams } from '@navigation/app-routes';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type StorageNavigationProps = StackNavigationProp<StorageStackScreenParams, StorageStackRoute.CategoryList>;

export const useStorageNavigation = () => {
  const navigation = useNavigation<StorageNavigationProps>();

  const goToCategories = useCallback(() => {
    navigation.replace(StorageStackRoute.CategoryList);
  }, [navigation]);

  const goToAddCategory = useCallback(() => {
    navigation.push(StorageStackRoute.CategoryAdd);
  }, [navigation]);

  const goToEditCategory = useCallback(
    (categoryId: string) => {
      navigation.push(StorageStackRoute.CategoryEdit, { categoryId });
    },
    [navigation]
  );

  const goToItems = useCallback(
    (categoryId: string) => {
      navigation.push(StorageStackRoute.ItemList, { categoryId });
    },
    [navigation]
  );
  const goToAddItem = useCallback(
    (categoryId: string) => {
      navigation.push(StorageStackRoute.ItemAdd, { categoryId });
    },
    [navigation]
  );
  const goToEditItem = useCallback(
    (itemId: string) => {
      navigation.push(StorageStackRoute.ItemEdit, { itemId });
    },
    [navigation]
  );

  return {
    navigation,
    goToCategories,
    goToItems,
    goToAddCategory,
    goToEditCategory,
    goToAddItem,
    goToEditItem,
  };
};
