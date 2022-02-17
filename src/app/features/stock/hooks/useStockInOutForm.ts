import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Snackbar from 'react-native-snackbar';

import { StockQtyFormProps } from '@feature/stock/types/stock-qty-form-props';
import { addItemsToStock } from '@redux/actions/items-actions';
import { useAppDispatch } from '@redux/app-redux-hooks';
import { first } from 'lodash';

export const useStockInOutForm = () => {
  const dispatch = useAppDispatch();
  const form = useForm<StockQtyFormProps>({ defaultValues: { quantity: 1 } });

  const setSku = useCallback(
    (barcode: string[]) => {
      const code = first(barcode);
      if (code) {
        form.setValue('sku', code);
        form.setFocus('quantity');
      }
    },
    [form]
  );

  const handleSubmitIncrease = async ({ sku, quantity }: StockQtyFormProps) => {
    await dispatch(addItemsToStock(sku, quantity));
    Snackbar.show({
      text: 'Item quantity increased',
      duration: Snackbar.LENGTH_LONG,
    });
  };
  const handleSubmitDecrease = async ({ sku, quantity }: StockQtyFormProps) => {
    await dispatch(addItemsToStock(sku, quantity));
    Snackbar.show({
      text: 'Item quantity increased',
      duration: Snackbar.LENGTH_LONG,
    });
  };

  return { form, setSku, handleSubmitIncrease, handleSubmitDecrease };
};
