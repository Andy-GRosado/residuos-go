/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useThemeColors(
  props?: { light: string; dark: string }
) {
  const theme = useColorScheme() ?? 'light';

  if (props) {
    return props[theme];
  } else {
    const colorValue = Colors[theme];  
    return colorValue;
  }
}
