import React from 'react';
import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Row } from 'react-native-col';

import { useStorageNavigation } from '@navigation/hooks/useStorageNavigation';
import { RightHeaderProps } from '@navigation/navigators/stock-tool-tabs-navigator';
import { Button } from '@rneui/themed';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

type FindAppBarActionsProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    flex: 1,
    padding: 8,
  },
  iconContainer: {
    borderRadius: 32,
    width: 64,
    height: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const StorageCategoryListActions: React.FunctionComponent<FindAppBarActionsProps & RightHeaderProps> = ({ tintColor }) => {
  const { goToAddCategory } = useStorageNavigation();

  const handleAddNewCategoryClick = () => {
    goToAddCategory();
  };

  return (
    <Row.C style={styles.container}>
      <Button
        type="clear"
        icon={<FAIcon name="plus" size={28} color={tintColor} />}
        containerStyle={styles.iconContainer}
        iconPosition="left"
        background={TouchableNativeFeedback.SelectableBackground(16)}
        onPress={handleAddNewCategoryClick}
      />
    </Row.C>
  );
};
export default StorageCategoryListActions;
