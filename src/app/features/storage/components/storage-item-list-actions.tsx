import React, { useCallback } from 'react';
import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Row } from 'react-native-col';

import { StorageStackRoute } from '@navigation/app-routes';
import { StorageNavigationProps, useStorageNavigation } from '@navigation/hooks/useStorageNavigation';
import { RightHeaderProps } from '@navigation/navigators/stock-tool-tabs-navigator';
import { Button } from '@rneui/themed';
import { get } from 'lodash';
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

const getCategoryId = (storageNavigation: StorageNavigationProps): string | undefined => {
  const naviState = storageNavigation.getState();
  const route = naviState.routes[naviState.index];
  if (route.name === StorageStackRoute.ItemList) {
    return get(route.params, 'categoryId');
  }
  return undefined;
};

const StorageItemListActions: React.FunctionComponent<FindAppBarActionsProps & RightHeaderProps> = ({ tintColor }) => {
  const { navigation, goToAddItem } = useStorageNavigation();

  const handleAddNewItem = useCallback(() => {
    if (!navigation) return;
    const categoryId = getCategoryId(navigation);
    if (categoryId) {
      goToAddItem(categoryId);
    }
  }, [navigation, goToAddItem]);

  return (
    <Row.C style={styles.container}>
      <Button
        type="clear"
        icon={<FAIcon name="plus" size={28} color={tintColor} />}
        containerStyle={styles.iconContainer}
        iconPosition="left"
        background={TouchableNativeFeedback.SelectableBackground(16)}
        onPress={handleAddNewItem}
      />
    </Row.C>
  );
};
export default StorageItemListActions;
