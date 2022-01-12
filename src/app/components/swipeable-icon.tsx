import React, { FunctionComponent } from 'react';
import Col from 'react-native-col';

import FAIcon from 'react-native-vector-icons/FontAwesome';

type SwipeableIconProps = {
  backgroundColor?: string | undefined;
  color?: string | undefined;
  name: string;
};

const SwipeableIcon: FunctionComponent<SwipeableIconProps> = ({ backgroundColor, color, name }) => {
  return (
    <Col.C style={{ backgroundColor, width: 72 }}>
      <FAIcon name={name} size={32} color={color} />
    </Col.C>
  );
};

export default SwipeableIcon;
