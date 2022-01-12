import React from 'react';
import { Icon } from 'react-native-elements';

import FindScreen from '@feature/find/screens/find-screen';
import StockInScreen from '@feature/stock/screens/stock-in-screen';
import StockOutScreen from '@feature/stock/screens/stock-out-screen';
import { StockToolBottomTabItem } from '@navigation/components/stock-tool-bottom-tab-item';
import { BottomTabBarIconProps } from '@navigation/navigation-utils';
import { StorageStackNavigator } from '@navigation/navigators/storage-stack-navigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs/src/types';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types';

import { AppStackRoute, AppStackScreenParams, StockToolRoute, StockToolTabsScreenParams } from '../app-routes';

const Stack = createStackNavigator<AppStackScreenParams>();
const Tabs = createBottomTabNavigator<StockToolTabsScreenParams>();

export const defaultStackScreenOptions: StackNavigationOptions = {
  headerShown: false,
  headerBackTitleVisible: false,
  headerBackImage: () => <Icon name="entypo-cog" type="ionicon" color="#ff0" size={30} />,
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
};

export const stockToolTabScreenOptions: BottomTabNavigationOptions = {
  headerShown: true,
  tabBarShowLabel: false,
  lazy: true,
  tabBarHideOnKeyboard: true,
  unmountOnBlur: true,
  headerPressColor: '#fff',
  headerPressOpacity: 1,
  headerTintColor: '#000',
  headerStyle: { backgroundColor: '#2360bd' },
  headerTitleStyle: { color: '#fff' },
  tabBarStyle: { height: 64 },
};

export type RightHeaderProps = {
  tintColor?: string;
  pressColor?: string;
  pressOpacity?: number;
};

const tabBarCustomIcon = (name: string, label: string) => (props: BottomTabBarIconProps) =>
  <StockToolBottomTabItem name={name} label={label} {...props} />;

export const StockToolTabs = () => {
  return (
    <Tabs.Navigator initialRouteName={StockToolRoute.Storage} screenOptions={stockToolTabScreenOptions}>
      <Tabs.Screen
        key={StockToolRoute.Find}
        name={StockToolRoute.Find}
        component={FindScreen}
        options={{ tabBarIcon: tabBarCustomIcon('search', 'Search'), headerTitle: 'Search' }}
      />
      <Tabs.Screen
        key={StockToolRoute.Storage}
        name={StockToolRoute.Storage}
        component={StorageStackNavigator}
        options={{ tabBarIcon: tabBarCustomIcon('warehouse', 'Storage'), headerShown: false }}
      />
      <Tabs.Screen
        key={StockToolRoute.StockIn}
        name={StockToolRoute.StockIn}
        component={StockInScreen}
        options={{ tabBarIcon: tabBarCustomIcon('arrow-down', 'Stock in'), headerTitle: 'Stock in' }}
      />
      <Tabs.Screen
        key={StockToolRoute.StockOut}
        name={StockToolRoute.StockOut}
        component={StockOutScreen}
        options={{ tabBarIcon: tabBarCustomIcon('arrow-up', 'Stock out'), headerTitle: 'Stock out' }}
      />
    </Tabs.Navigator>
  );
};

export const StockToolNavigation = () => (
  <Stack.Navigator screenOptions={defaultStackScreenOptions} initialRouteName={AppStackRoute.StockTool}>
    <Stack.Screen name={AppStackRoute.StockTool} component={StockToolTabs} options={{ headerShown: false }} />
  </Stack.Navigator>
);
