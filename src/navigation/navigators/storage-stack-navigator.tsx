import React from 'react';

import StorageCategoryListActions from '@feature/storage/components/storage-category-list-actions';
import StorageItemListActions from '@feature/storage/components/storage-item-list-actions';
import CategoryAddScreen from '@feature/storage/screens/category-add-screen';
import CategoryEditScreen from '@feature/storage/screens/category-edit-screen';
import CategoryListScreen from '@feature/storage/screens/category-list-screen';
import ItemAddScreen from '@feature/storage/screens/item-add-screen';
import ItemEditScreen from '@feature/storage/screens/item-edit-screen';
import ItemListScreen from '@feature/storage/screens/item-list-screen';
import { RightHeaderProps } from '@navigation/navigators/stock-tool-tabs-navigator';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types';
import { ZoniaColors } from '@util/theme/zoniaColors';

import { StorageStackRoute, StorageStackScreenParams } from '../app-routes';

const Stack = createStackNavigator<StorageStackScreenParams>();

const storageAppBarActions = (props: RightHeaderProps) => <StorageCategoryListActions {...props} />;
const storageItemsActions = (props: RightHeaderProps) => <StorageItemListActions {...props} />;

export const defaultStackScreenOptions: StackNavigationOptions = {
  headerShown: true,
  animationEnabled: true,
  headerPressColor: '#fff',
  headerPressOpacity: 1,
  headerTintColor: '#ffffff',
  headerStyle: { backgroundColor: ZoniaColors.primary.main },
  headerTitleStyle: { color: '#fff' },
};

export const StorageStackNavigator = () => (
  <Stack.Navigator
    initialRouteName={StorageStackRoute.CategoryList}
    screenOptions={{ ...defaultStackScreenOptions, ...TransitionPresets.SlideFromRightIOS }}
  >
    <Stack.Screen
      name={StorageStackRoute.CategoryList}
      component={CategoryListScreen}
      options={{ title: 'Storage', headerRight: storageAppBarActions }}
    />
    <Stack.Screen name={StorageStackRoute.CategoryAdd} component={CategoryAddScreen} options={{ headerTitle: 'Add category' }} />
    <Stack.Screen name={StorageStackRoute.CategoryEdit} component={CategoryEditScreen} options={{ headerTitle: 'Edit category' }} />
    <Stack.Screen name={StorageStackRoute.ItemAdd} component={ItemAddScreen} options={{ headerTitle: 'Add item' }} />
    <Stack.Screen name={StorageStackRoute.ItemEdit} component={ItemEditScreen} options={{ headerTitle: 'Edit item' }} />
    <Stack.Screen name={StorageStackRoute.ItemList} component={ItemListScreen} options={{ headerRight: storageItemsActions }} />
  </Stack.Navigator>
);
