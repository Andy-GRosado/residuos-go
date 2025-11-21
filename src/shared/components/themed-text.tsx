import { ThemeConfigType } from '@/src/store/theme';
import { StyleSheet, Text, type TextProps } from 'react-native';
import { useThemeColors } from '../hooks/use-theme-color';

export type ThemedTextBarProps = TextProps & {
  type?: 'caption' | 'body' | 'bodyBold' | 'subtitle' | 'title' | 'display' | 'link';
};

export default function ThemedText({
  style,
  type = 'body',
  ...rest
}: ThemedTextBarProps) {
  const themeColors = useThemeColors() as ThemeConfigType;

  return (
    <Text
      style={[
        { color: themeColors.text.default },
        type === 'caption' ? styles.caption : undefined,
        type === 'body' ? styles.body : undefined,
        type === 'bodyBold' ? styles.bodyBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'link' ? {...styles.link, color: themeColors.tint} : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  caption: {
    fontSize: 12,
    lineHeight: 20,
  },
  captionBold: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '600',
  },
  body: {
    fontSize: 14,
    lineHeight: 24,
  },
  bodyBold: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '600',
  },
  
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  
  link: {
    fontSize: 16,
    lineHeight: 24,
    textDecorationLine: 'underline',
  },
});
