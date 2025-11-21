/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/src/store/theme';
import { useColorScheme } from 'react-native';

export function useThemeColors() {
  const theme = useColorScheme() ?? 'light';
  const themeColors = Colors[theme];  
  return themeColors;
}
