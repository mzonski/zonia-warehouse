import { createTheme } from '@rneui/themed';
import { ZoniaColors } from '@util/theme/zoniaColors';

export const nativeElementsTheme = createTheme({
  lightColors: {
    primary: ZoniaColors.primary.main,
    secondary: ZoniaColors.secondary.main,
    success: ZoniaColors.success.main,
    warning: ZoniaColors.warning.main,
    error: ZoniaColors.error.main,
  },
});
