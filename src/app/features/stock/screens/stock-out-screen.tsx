import React, { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import Snackbar from 'react-native-snackbar';

import { StockQtyForm } from '@feature/stock/components/stock-qty-form';
import { StockQtyFormProps } from '@feature/stock/types/stock-qty-form-props';
import { StockToolRoute, StockToolTabsScreenParams } from '@navigation/app-routes';
import { StackScreenProps } from '@react-navigation/stack/src/types';
import { removeItemsFromStock } from '@redux/actions/items-actions';
import { useAppDispatch } from '@redux/app-redux-hooks';

import { FadeInView } from '@component/fade-in-view';

const StockOutScreen: FunctionComponent<StackScreenProps<StockToolTabsScreenParams, StockToolRoute.StockOut>> = () => {
  const dispatch = useAppDispatch();

  const form = useForm<StockQtyFormProps>();

  const onSubmit = async ({ sku, quantity }: StockQtyFormProps) => {
    await dispatch(removeItemsFromStock(sku, quantity));
    Snackbar.show({
      text: 'Item quantity decreased',
      duration: Snackbar.LENGTH_LONG,
    });
  };

  return (
    <FadeInView>
      <StockQtyForm form={form} submitText="Decrease" onSubmit={onSubmit} />
    </FadeInView>
  );
};

export default StockOutScreen;
