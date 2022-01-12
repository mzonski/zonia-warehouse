import React, { FunctionComponent, useCallback, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';

import { ItemForm } from '@feature/storage/components/item-form';
import { StorageStackRoute, StorageStackScreenParams } from '@navigation/app-routes';
import { useStorageNavigation } from '@navigation/hooks/useStorageNavigation';
import { StackScreenProps } from '@react-navigation/stack/src/types';
import { updateItem } from '@redux/actions/items-actions';
import { useAppDispatch, useAppSelector } from '@redux/app-redux-hooks';
import { getItem } from '@redux/selectors/items-selectors';
import { Item } from '@redux/slices/items-slice';

import { FadeInView } from '@component/fade-in-view';

const ItemEditScreen: FunctionComponent<StackScreenProps<StorageStackScreenParams, StorageStackRoute.ItemEdit>> = ({
  route: {
    params: { itemId },
  },
}) => {
  const { navigation } = useStorageNavigation();
  const dispatch = useAppDispatch();
  const defaultValues = useAppSelector(getItem(itemId));
  const form = useForm<Item>({ defaultValues });

  useLayoutEffect(() => {
    navigation.setOptions({ title: defaultValues.label });
  }, [defaultValues.label, navigation]);

  const onSubmit = useCallback(
    async (item: Item) => {
      await dispatch(updateItem(item));
      navigation.goBack();
    },
    [dispatch, navigation]
  );

  return (
    <FadeInView>
      <ItemForm form={form} onSubmit={onSubmit} submitText="Update" />
    </FadeInView>
  );
};

export default ItemEditScreen;
