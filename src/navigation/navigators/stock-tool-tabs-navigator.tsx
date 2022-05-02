/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import FindScreen from '@feature/find/screens/find-screen';
import StockInScreen from '@feature/stock/screens/stock-in-screen';
import StockOutScreen from '@feature/stock/screens/stock-out-screen';
import { StorageStackNavigator } from '@navigation/navigators/storage-stack-navigator';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialBottomTabNavigationOptions } from '@react-navigation/material-bottom-tabs/lib/typescript/src/types';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types';
import { Icon } from '@rneui/themed';
import { ZoniaColors } from '@util/theme/zoniaColors';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

import { AppStackRoute, AppStackScreenParams, StockToolRoute, StockToolTabsScreenParams } from '../app-routes';

const Stack = createStackNavigator<AppStackScreenParams>();
const Tabs = createMaterialBottomTabNavigator<StockToolTabsScreenParams>();

export const defaultStackScreenOptions: StackNavigationOptions = {
  headerShown: false,
  headerBackTitleVisible: false,
  headerBackImage: () => <Icon name="entypo-cog" type="ionicon" color="#ff0" size={30} />,
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
};

export const stockToolTabScreenOptions: MaterialBottomTabNavigationOptions = {
  tabBarColor: '#fff',
};

export type RightHeaderProps = {
  tintColor?: string;
  pressColor?: string;
  pressOpacity?: number;
};

const tabBarCustomIcon = (name: string) => (props: { focused: boolean; color: string }) => <FAIcon name={name} {...props} size={19} />;

export const StockToolTabs = () => {
  return (
    <Tabs.Navigator
      initialRouteName={StockToolRoute.Storage}
      screenOptions={stockToolTabScreenOptions}
      labeled
      sceneAnimationEnabled
      inactiveColor="#cacaca"
      activeColor={ZoniaColors.primary.main}
    >
      <Tabs.Screen
        key={StockToolRoute.Find}
        name={StockToolRoute.Find}
        component={FindScreen}
        options={{ tabBarIcon: tabBarCustomIcon('search'), tabBarLabel: 'Search' }}
      />
      <Tabs.Screen
        key={StockToolRoute.Storage}
        name={StockToolRoute.Storage}
        component={StorageStackNavigator}
        options={{ tabBarIcon: tabBarCustomIcon('warehouse'), tabBarLabel: 'Storage' }}
      />
      <Tabs.Screen
        key={StockToolRoute.StockIn}
        name={StockToolRoute.StockIn}
        component={StockInScreen}
        options={{ tabBarIcon: tabBarCustomIcon('arrow-down'), tabBarLabel: 'Stock in' }}
      />
      <Tabs.Screen
        key={StockToolRoute.StockOut}
        name={StockToolRoute.StockOut}
        component={StockOutScreen}
        options={{ tabBarLabel: 'Stock out', tabBarIcon: tabBarCustomIcon('arrow-up') }}
      />
    </Tabs.Navigator>
  );
};

export const StockToolNavigation = () => (
  <Stack.Navigator screenOptions={defaultStackScreenOptions} initialRouteName={AppStackRoute.StockTool}>
    <Stack.Screen name={AppStackRoute.StockTool} component={StockToolTabs} options={{ headerShown: false }} />
  </Stack.Navigator>
);
