import React from 'react';
import { LogBox } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { Provider as PaperProvider } from 'react-native-paper';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { AppNavigator } from '@navigation/navigators/app-stack-navigator';
import { appStore } from '@redux/app-store';
import { nativeElementsTheme } from '@util/theme/nativeElementsTheme';
import { paperTheme } from '@util/theme/paperTheme';

import ErrorBoundary from '@component/error-boundary';

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
          <ThemeProvider theme={nativeElementsTheme}>
            <PaperProvider theme={paperTheme}>
              <AppNavigator />
            </PaperProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </Provider>
    </ErrorBoundary>
  );
};
