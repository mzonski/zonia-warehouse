import { useCallback } from 'react';

import { StockToolRoute, StockToolTabsScreenParams } from '@navigation/app-routes';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type StockToolNavigationProps = StackNavigationProp<StockToolTabsScreenParams, StockToolRoute.Storage>;

export const useStockToolNavigation = () => {
  const navigation = useNavigation<StockToolNavigationProps>();

  const goToStorage = useCallback(() => {
    navigation.replace(StockToolRoute.Storage);
  }, [navigation]);

  const goToFind = useCallback(() => {
    navigation.replace(StockToolRoute.Find);
  }, [navigation]);

  const goToStockIn = useCallback(() => {
    navigation.replace(StockToolRoute.StockIn);
  }, [navigation]);

  const goToStockOut = useCallback(() => {
    navigation.replace(StockToolRoute.StockOut);
  }, [navigation]);

  return {
    navigation,
    goToFind,
    goToStorage,
    goToStockIn,
    goToStockOut,
  };
};
