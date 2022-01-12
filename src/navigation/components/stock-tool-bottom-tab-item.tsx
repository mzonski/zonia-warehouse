import React, { FunctionComponent, memo } from 'react';
import { Text } from 'react-native';
import Col from 'react-native-col';

import { BottomTabBarIconProps } from '@navigation/navigation-utils';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

export const StockToolBottomTabItemFc: FunctionComponent<BottomTabBarIconProps & { name: string; label: string }> = ({
  focused,
  color,
  size,
  name,
  label,
}) => {
  return (
    <Col.C>
      <FAIcon name={name} color={color} size={focused ? size + size * 0.4 : size} />
      {!focused && (
        <Text
          style={{
            height: focused ? 0 : 16,
            marginVertical: 2,
            fontSize: 12,
          }}
        >
          {label}
        </Text>
      )}
    </Col.C>
  );
};

export const StockToolBottomTabItem = memo(StockToolBottomTabItemFc, (prev, next) => prev.focused !== next.focused);
