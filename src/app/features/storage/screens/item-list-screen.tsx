import React, { FunctionComponent, useLayoutEffect } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { Divider } from 'react-native-elements';

import { StorageStackRoute, StorageStackScreenParams } from '@navigation/app-routes';
import { useStorageNavigation } from '@navigation/hooks/useStorageNavigation';
import { StackScreenProps } from '@react-navigation/stack/src/types';
import { removeItem } from '@redux/actions/items-actions';
import { useAppDispatch, useAppSelector } from '@redux/app-redux-hooks';
import { getCategory } from '@redux/selectors/categories-selectors';
import { getItem } from '@redux/selectors/items-selectors';

import { FadeInView } from '@component/fade-in-view';
import { ListItem } from '@component/list-item';
import SwipeableIcon from '@component/swipeable-icon';

type ItemListItemProps = { itemId: string; categoryId: string };

const ItemListItem: FunctionComponent<ItemListItemProps> = ({ itemId, categoryId }) => {
  const dispatch = useAppDispatch();
  const item = useAppSelector(getItem(itemId));
  const { goToEditItem } = useStorageNavigation();

  const handleEditItem = () => {
    goToEditItem(itemId);
  };
  const handleRemoveItem = () => {
    dispatch(removeItem(itemId, categoryId));
  };

  return (
    <ListItem
      key={itemId}
      title={item.label}
      subtitle={item.sku}
      onSwipeLeft={handleRemoveItem}
      onSwipeRight={handleEditItem}
      LeftSwipeableComponent={<SwipeableIcon backgroundColor="#8a0000" color="white" name="trash" />}
      RightSwipeableComponent={<SwipeableIcon backgroundColor="#00178a" color="white" name="edit" />}
    />
  );
};

const ItemListScreen: FunctionComponent<StackScreenProps<StorageStackScreenParams, StorageStackRoute.ItemList>> = ({
  route: {
    params: { categoryId },
  },
}) => {
  const { label, items } = useAppSelector(getCategory(categoryId));
  const { navigation } = useStorageNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: label });
  }, [label, navigation]);

  const renderListItem: ListRenderItem<string> = ({ item }) => <ItemListItem itemId={item} categoryId={categoryId} />;

  return (
    <FadeInView>
      <FlatList
        style={{ borderRadius: 8 }}
        data={items}
        renderItem={renderListItem}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={<ListItem key="empty" subtitle="List doesn't contain any items" />}
      />
    </FadeInView>
  );
};

export default ItemListScreen;
