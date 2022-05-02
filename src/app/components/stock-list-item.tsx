import React, { FunctionComponent } from 'react';

import { Text } from '@rneui/themed';

import { ListItem } from '@component/list-item';

export type FindStockListItemProps = {
  label: string;
  sku: string;
  quantity: number;
};

export const StockListItem: FunctionComponent<FindStockListItemProps> = ({ label, sku, quantity }) => {
  return <ListItem title={label} subtitle={sku} EndAdornmentComponent={<Text>{quantity} pcs</Text>} />;
};
