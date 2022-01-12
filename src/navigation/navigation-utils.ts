import { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler } from 'react-native';

import { PartialState, NavigationState, createNavigationContainerRef } from '@react-navigation/native';
import { load, save } from '@util/async-storage';

export const navigationRef = createNavigationContainerRef();

export function getActiveRouteName(state: NavigationState | PartialState<NavigationState>): string | undefined {
  if (state.index) {
    const route = state.routes[state.index];

    if (!route.state) return route.name;

    return getActiveRouteName(route.state);
  }

  return undefined;
}

export function useBackButtonHandler(canExit: (routeName: string) => boolean) {
  const canExitRef = useRef(canExit);

  useEffect(() => {
    canExitRef.current = canExit;
  }, [canExit]);

  useEffect(() => {
    const onBackPress = () => {
      if (!navigationRef.isReady()) {
        return false;
      }
      // grab the current route
      const routeName = getActiveRouteName(navigationRef.getRootState());

      if (!routeName) {
        throw new Error('Route name is empty');
      }

      if (canExitRef.current(routeName)) {
        return false;
      }

      if (navigationRef.canGoBack()) {
        navigationRef.goBack();
        return true;
      }

      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);
}

export function useNavigationPersistence(persistenceKey: string) {
  const [initialNavigationState, setInitialNavigationState] = useState();

  const [isRestored, setIsRestored] = useState(!__DEV__);

  const routeNameRef = useRef<string | undefined>();

  const onNavigationStateChange = useCallback(
    (state: any) => {
      const previousRouteName = routeNameRef.current;
      const currentRouteName = getActiveRouteName(state);

      if (previousRouteName !== currentRouteName) {
        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.log(currentRouteName);
        }
      }

      routeNameRef.current = currentRouteName;

      save(persistenceKey, state);
    },
    [persistenceKey]
  );

  const restoreState = useCallback(async () => {
    try {
      const state = await load(persistenceKey);
      if (state) setInitialNavigationState(state);
    } finally {
      setIsRestored(true);
    }
  }, [persistenceKey]);

  useEffect(() => {
    if (!isRestored) {
      restoreState();
    }
  }, [isRestored, restoreState]);

  return {
    onNavigationStateChange,
    restoreState,
    isRestored,
    initialNavigationState,
  };
}

export function navigate(name: any, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function resetRoot(params = { index: 0, routes: [] }) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(params);
  }
}

export type BottomTabBarIconProps = { focused: boolean; color: string; size: number };
