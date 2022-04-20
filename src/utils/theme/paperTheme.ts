import { DefaultTheme } from 'react-native-paper';

import { ZoniaColors } from '@util/theme/zoniaColors';

export const paperTheme: ReactNativePaper.Theme = {
  dark: false,
  roundness: 4,
  colors: {
    primary: ZoniaColors.primary.main,
    accent: ZoniaColors.secondary.main,
    background: '#f6f6f6',
    surface: '#fafafa',
    error: ZoniaColors.error.main,
    text: '#000',
    onSurface: '#000',
    disabled: DefaultTheme.colors.disabled,
    placeholder: DefaultTheme.colors.placeholder,
    backdrop: DefaultTheme.colors.backdrop,
    notification: ZoniaColors.info.main,
  },
  fonts: DefaultTheme.fonts,
  animation: {
    scale: 1.0,
  },
};
