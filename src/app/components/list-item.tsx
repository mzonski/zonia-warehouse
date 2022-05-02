import React, { createRef, FunctionComponent, ReactNode, useCallback } from 'react';
import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import Col, { Row } from 'react-native-col';
import { Swipeable } from 'react-native-gesture-handler';

import { Text } from '@rneui/themed';

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
  },
  barcode: {
    fontSize: 14,
  },
  container: {
    paddingHorizontal: 4,
    marginVertical: 8,
    backgroundColor: 'white',
    minHeight: 64,
  },
  wrapper: {
    backgroundColor: 'white',
    minHeight: 64,
    flex: 1,
    padding: 16,
  },
});

export type SwipeableProps = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;

  LeftSwipeableComponent?: ReactNode;
  RightSwipeableComponent?: ReactNode;
};

export type ListItemProps = {
  title?: string;
  subtitle?: string;
  onPress?: () => void;

  EndAdornmentComponent?: ReactNode;
} & SwipeableProps;

export const ListItem: FunctionComponent<ListItemProps> = ({
  title,
  subtitle,
  onPress,
  EndAdornmentComponent,
  onSwipeLeft,
  onSwipeRight,
  LeftSwipeableComponent,
  RightSwipeableComponent,
}) => {
  const swipeableRef = createRef<Swipeable>();

  const handleSwipeLeft = useCallback(() => {
    onSwipeLeft?.();
    swipeableRef.current?.close();
  }, [swipeableRef, onSwipeLeft]);

  const handleSwipeRight = useCallback(() => {
    onSwipeRight?.();
    swipeableRef.current?.close();
  }, [swipeableRef, onSwipeRight]);

  return (
    <Swipeable
      ref={swipeableRef}
      overshootLeft={false}
      overshootRight={false}
      onSwipeableLeftOpen={handleSwipeLeft}
      onSwipeableRightOpen={handleSwipeRight}
      renderLeftActions={() => LeftSwipeableComponent}
      renderRightActions={() => RightSwipeableComponent}
    >
      <TouchableNativeFeedback
        background={onPress ? TouchableNativeFeedback.Ripple('rgb(215,215,215)', false) : undefined}
        style={styles.container}
        onPress={onPress}
      >
        <Row.LR style={styles.wrapper}>
          <Col.TBL>
            {!!title && <Text style={styles.name}>{title}</Text>}
            {!!subtitle && <Text style={styles.barcode}>{subtitle}</Text>}
          </Col.TBL>
          {!!EndAdornmentComponent && <Col.TBR>{EndAdornmentComponent}</Col.TBR>}
        </Row.LR>
      </TouchableNativeFeedback>
    </Swipeable>
  );
};
