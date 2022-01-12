import './src/utils/wydr.ts';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';

import { AppRegistry } from 'react-native';
import codePush from 'react-native-code-push';

import { name } from './app.json';
import { Root } from './src/root.tsx';

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
};

const App = __DEV__ ? Root : codePush(codePushOptions)(Root);

AppRegistry.registerComponent(name, () => App);
