import React, { FunctionComponent } from 'react';

import { BarcodeScanner } from '@feature/stock/components/barcode-scanner';
import { StockQtyForm } from '@feature/stock/components/stock-qty-form';
import { useStockInOutForm } from '@feature/stock/hooks/useStockInOutForm';
import { StockToolRoute, StockToolTabsScreenParams } from '@navigation/app-routes';
import { StackScreenProps } from '@react-navigation/stack/src/types';

import { FadeInView } from '@component/fade-in-view';

const StockOutScreen: FunctionComponent<StackScreenProps<StockToolTabsScreenParams, StockToolRoute.StockOut>> = () => {
  const { form, setSku, handleSubmitDecrease } = useStockInOutForm();

  return (
    <FadeInView>
      <BarcodeScanner onRead={setSku} />
      <StockQtyForm form={form} submitText="Decrease" onSubmit={handleSubmitDecrease} />
    </FadeInView>
  );
};

export default StockOutScreen;
