import React, { FunctionComponent } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { Divider } from 'react-native-elements';

import { useStorageNavigation } from '@navigation/hooks/useStorageNavigation';
import { removeCategory } from '@redux/actions/categories-actions';
import { useAppDispatch, useAppSelector } from '@redux/app-redux-hooks';
import { getCategory, getCategoryIds } from '@redux/selectors/categories-selectors';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import { FadeInView } from '@component/fade-in-view';
import { ListItem } from '@component/list-item';
import SwipeableIcon from '@component/swipeable-icon';

type CategoryListItemProps = { categoryId: string };

const CategoryListItem: FunctionComponent<CategoryListItemProps> = ({ categoryId }) => {
  const category = useAppSelector(getCategory(categoryId));
  const { goToItems, goToEditCategory } = useStorageNavigation();
  const dispatch = useAppDispatch();

  const handleCategoryPress = () => {
    goToItems(categoryId);
  };
  const handleRemoveCategory = () => {
    dispatch(removeCategory(categoryId));
  };
  const handleEditCategory = () => {
    goToEditCategory(categoryId);
  };

  return (
    <ListItem
      key={categoryId}
      title={category.label}
      subtitle={`${category.items.length} items`}
      EndAdornmentComponent={<FAIcon name="chevron-right" size={16} color="#900" />}
      onPress={handleCategoryPress}
      onSwipeLeft={handleRemoveCategory}
      onSwipeRight={handleEditCategory}
      LeftSwipeableComponent={<SwipeableIcon backgroundColor="#8a0000" color="white" name="trash" />}
      RightSwipeableComponent={<SwipeableIcon backgroundColor="#00178a" color="white" name="edit" />}
    />
  );
};

const CategoryListScreen = () => {
  const categories = useAppSelector(getCategoryIds);

  const renderListItem: ListRenderItem<string> = ({ item }) => <CategoryListItem categoryId={item} />;

  return (
    <FadeInView>
      <FlatList style={{ borderRadius: 8 }} data={categories} renderItem={renderListItem} ItemSeparatorComponent={Divider} />
    </FadeInView>
  );
};

export default CategoryListScreen;
