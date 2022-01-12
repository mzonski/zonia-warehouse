import AsyncStorage from '@react-native-async-storage/async-storage';
import { clear } from '@util/async-storage';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.configure({
  name: 'Stock Tool' || require('../../package.json').name,
  host: 'localhost',
})
  .setAsyncStorageHandler?.(AsyncStorage)
  .useReactNative({
    asyncStorage: true,
    storybook: true,
  })
  .use(reactotronRedux({}))
  .connect();

reactotron?.onCustomCommand({
  title: 'Clear Async Storage',
  description: 'Clear Async Storage',
  command: 'resetStore',
  handler: () => {
    clear();
  },
});

reactotron?.clear?.();

export default reactotron;
