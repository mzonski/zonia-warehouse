import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import { BarcodeScanner } from '@feature/stock/components/barcode-scanner';
import { StockQtyForm } from '@feature/stock/components/stock-qty-form';
import { useStockInOutForm } from '@feature/stock/hooks/useStockInOutForm';
import { StockToolRoute, StockToolTabsScreenParams } from '@navigation/app-routes';
import { StackScreenProps } from '@react-navigation/stack/src/types';

const StockInScreen: FunctionComponent<StackScreenProps<StockToolTabsScreenParams, StockToolRoute.StockIn>> = () => {
  const { form, setSku, handleSubmitIncrease } = useStockInOutForm();

  return (
    <View>
      <BarcodeScanner onRead={setSku} />
      <StockQtyForm form={form} submitText="Increase" onSubmit={handleSubmitIncrease} />
    </View>
  );
};

export default StockInScreen;
