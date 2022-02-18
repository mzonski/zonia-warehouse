import React, { FunctionComponent } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useFocusEffect } from '@react-navigation/native';

export const FadeInView: FunctionComponent = ({ children }) => {
  const currentOpacity = useSharedValue(0);

  const config = {
    duration: 225,
    easing: Easing.bezierFn(0.42, 0, 0.58, 1),
  };

  const style = useAnimatedStyle(() => ({
    flex: 1,
    opacity: withTiming(currentOpacity.value, config),
  }));

  useFocusEffect(() => {
    currentOpacity.value = 1;

    return () => {
      currentOpacity.value = 0;
    };
  });

  return <Animated.View style={style}>{children}</Animated.View>;
};
