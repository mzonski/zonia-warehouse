import React, { PropsWithChildren } from 'react';
import { Alert } from 'react-native';

class ErrorBoundary extends React.Component<PropsWithChildren<{}>> {
  errorShown: any;

  componentDidCatch(error: Error) {
    if (__DEV__) {
      return;
    }
    // to prevent multiple alerts shown to your users
    if (this.errorShown) {
      return;
    }
    this.errorShown = true;

    Alert.alert(error.name, 'An unexpected error has occurred. Please restart to continue.');
  }

  static getDerivedStateFromError(error: any) {
    // eslint-disable-next-line no-console
    console.log('derived state from error', error);
    return { hasError: true };
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary;
