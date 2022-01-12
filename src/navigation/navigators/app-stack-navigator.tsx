import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { appNavigationRef } from '../app-navigation-ref';
import { AppStackRoute, NavigationStack, NavigationStackParams } from '../app-routes';

import { StockToolNavigation } from './stock-tool-tabs-navigator';

const Stack = createStackNavigator<NavigationStackParams>();

export const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName={NavigationStack.App} screenOptions={{ headerShown: false }}>
      <Stack.Screen key={NavigationStack.App} name={NavigationStack.App} component={StockToolNavigation} />
    </Stack.Navigator>
  );
};

export const AppNavigator = (props: any) => {
  return (
    <NavigationContainer ref={appNavigationRef} {...props}>
      <AppStack />
    </NavigationContainer>
  );
};

const exitRoutes = [AppStackRoute.StockTool];
export const canExit = (routeName: AppStackRoute) => exitRoutes.includes(routeName);
