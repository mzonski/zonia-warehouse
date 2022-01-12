import React, { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';

import { ItemForm } from '@feature/storage/components/item-form';
import { StorageStackRoute, StorageStackScreenParams } from '@navigation/app-routes';
import { useStorageNavigation } from '@navigation/hooks/useStorageNavigation';
import { StackScreenProps } from '@react-navigation/stack/src/types';
import { addItem } from '@redux/actions/items-actions';
import { useAppDispatch } from '@redux/app-redux-hooks';
import { Item } from '@redux/slices/items-slice';
import { v4 } from 'uuid';

import { FadeInView } from '@component/fade-in-view';

const ItemAddScreen: FunctionComponent<StackScreenProps<StorageStackScreenParams, StorageStackRoute.ItemAdd>> = ({
  route: {
    params: { categoryId },
  },
}) => {
  const { navigation } = useStorageNavigation();
  const dispatch = useAppDispatch();

  const form = useForm<Item>({ defaultValues: { id: v4(), quantity: 1, categoryId } });

  const onSubmit = async (item: Item) => {
    await dispatch(addItem(item));
    navigation.goBack();
  };

  return (
    <FadeInView>
      <ItemForm form={form} submitText="Create" onSubmit={onSubmit} />
    </FadeInView>
  );
};

export default ItemAddScreen;
