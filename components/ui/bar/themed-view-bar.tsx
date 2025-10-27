import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewBarProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedViewBar({ style, lightColor, darkColor, ...otherProps }: ThemedViewBarProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'bar_background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
