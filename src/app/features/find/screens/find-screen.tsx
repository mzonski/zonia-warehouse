import React, { useCallback, useMemo, useState } from 'react';
import { View, TextInputSubmitEditingEventData, NativeSyntheticEvent, FlatList, ListRenderItem } from 'react-native';
import { Divider, SearchBar } from 'react-native-elements';

import { useAppSelector } from '@redux/app-redux-hooks';
import { getItems } from '@redux/selectors/items-selectors';
import { fullObjectTextSearch } from '@util/forms/form-filtering';
import { debounce } from 'lodash';

import { FadeInView } from '@component/fade-in-view';
import { StockListItem, FindStockListItemProps } from '@component/stock-list-item';

type SearchBarComponentProps = {};

const FindScreen: React.FunctionComponent<SearchBarComponentProps> = () => {
  const [searchPhrase, setSearchPhrase] = useState<string>();
  const items = useAppSelector(getItems);

  const debouncedSetSearchPage = useMemo(() => debounce(setSearchPhrase, 225), [setSearchPhrase]);
  const filteredData = useMemo(
    () => fullObjectTextSearch(Object.values(items), searchPhrase, ['categoryId', 'id', 'quantity']),
    [items, searchPhrase]
  );

  const onSubmit = useCallback(
    ({ nativeEvent: { text } }: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      debouncedSetSearchPage(text);
    },
    [debouncedSetSearchPage]
  );

  const renderListItem: ListRenderItem<FindStockListItemProps> = ({ item }) => (
    <StockListItem label={item.label} sku={item.sku} quantity={item.quantity} />
  );

  const stickySearchHeader = useCallback(
    () => (
      <View>
        <SearchBar
          platform="android"
          placeholder="Search for id, sku, name"
          onChangeText={debouncedSetSearchPage}
          onSubmitEditing={onSubmit}
        />
        <Divider width={1} />
      </View>
    ),
    [debouncedSetSearchPage, onSubmit]
  );

  return (
    <FadeInView>
      <FlatList
        data={filteredData}
        renderItem={renderListItem}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={stickySearchHeader}
        ItemSeparatorComponent={Divider}
      />
    </FadeInView>
  );
};

export default FindScreen;
