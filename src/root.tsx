import React from 'react';
import { LogBox } from 'react-native';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { appStore } from '@redux/app-store';

import ErrorBoundary from '@component/error-boundary';

import { AppNavigator } from './navigation/navigators/app-stack-navigator';

LogBox.ignoreLogs([
  'Warning: Function components cannot be given refs.',
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
  "EventEmitter.removeListener('keyboardDidHide', ...): Method has been deprecated. Please instead use `remove()` on the subscription returned by `EventEmitter.addListener`.",
]);

export const Root: React.FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={appStore}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <AppNavigator />
        </SafeAreaProvider>
      </Provider>
    </ErrorBoundary>
  );
};
