import './src/utils/wydr.ts';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';

import { AppRegistry } from 'react-native';

import { name } from './app.json';
import { Root } from './src/root.tsx';

AppRegistry.registerComponent(name, () => Root);
