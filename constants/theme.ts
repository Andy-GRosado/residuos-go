/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#ffffff";

const primaryColors = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: tintColorLight, // "#0a7ea4"
  600: "#07698aff",
  700: "#054f67ff",
  800: "#05394aff",
  900: "#021f29ff",
};

const neutralColors = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
};

export const semanticColorScales = {
  success: {
    50:  "#e8f5e9",
    100: "#c8e6c9",
    200: "#a5d6a7",
    300: "#81c784",
    400: "#66bb6a",
    500: "#4caf50",
    600: "#43a047",
    700: "#388e3c",
    800: "#2e7d32",
    900: "#1b5e20",
  },
  warning: {
    50:  "#fff3e0",
    100: "#ffe0b2",
    200: "#ffcc80",
    300: "#ffb74d",
    400: "#ffa726",
    500: "#ff9800",
    600: "#fb8c00",
    700: "#f57c00",
    800: "#ef6c00",
    900: "#e65100",
  },
  error: {
    50:  "#ffebee",
    100: "#ffcdd2",
    200: "#ef9a9a",
    300: "#e57373",
    400: "#ef5350",
    500: "#f44336",
    600: "#e53935",
    700: "#d32f2f",
    800: "#c62828",
    900: "#b71c1c",
  },
  info: {
    50:  "#e3f2fd",
    100: "#bbdefb",
    200: "#90caf9",
    300: "#64b5f6",
    400: "#42a5f5",
    500: "#2196f3",
    600: "#1e88e5",
    700: "#1976d2",
    800: "#1565c0",
    900: "#0d47a1",
  },
} as const;

export const Colors = {
  light: {
    // Primary colors
    primary: primaryColors,
    
    // Bar colors
    bar_background: primaryColors[500],
    bar_background_100: primaryColors[400],
    bar_background_200: primaryColors[500],
    bar_background_300: primaryColors[600],
    bar_background_400: primaryColors[700],
    bar_background_500: primaryColors[800],

    bar_text: neutralColors[200],
    bar_text_100: neutralColors[100],
    bar_text_200: neutralColors[200],
    bar_text_300: neutralColors[300],
    bar_text_400: neutralColors[400],
    bar_text_500: neutralColors[500],

    // Text colors
    text: neutralColors[900],
    text_100: neutralColors[900],
    text_200: neutralColors[800],
    text_300: neutralColors[700],
    text_400: neutralColors[600],
    text_500: neutralColors[500],

    // Background colors
    background: neutralColors[50],
    background_100: neutralColors[50],
    background_200: neutralColors[100],
    background_300: neutralColors[200],
    background_400: neutralColors[300],
    background_500: neutralColors[400],

    // UI element colors
    tint: tintColorLight,
    icon: neutralColors[600],
    tabIconDefault: neutralColors[600],
    tabIconSelected: tintColorLight,
    
    // Border colors
    border: neutralColors[300],
    border_light: neutralColors[200],
    border_dark: neutralColors[400],

    messages: {
        success: {
            default: semanticColorScales.success[500], 
            100: semanticColorScales.success[100],
            300: semanticColorScales.success[300],
            500: semanticColorScales.success[500],
            600: semanticColorScales.success[700],
            700: semanticColorScales.success[900],
        },
        info: {
            default: semanticColorScales.info[500], 
            100: semanticColorScales.info[100],
            300: semanticColorScales.info[300],
            500: semanticColorScales.info[500],
            600: semanticColorScales.info[700],
            700: semanticColorScales.info[900],
        },
        warning: {
            default: semanticColorScales.warning[500], 
            100: semanticColorScales.warning[100],
            300: semanticColorScales.warning[300],
            500: semanticColorScales.warning[500],
            600: semanticColorScales.warning[700],
            700: semanticColorScales.warning[900],
        },
        error: {
            default: semanticColorScales.error[500], 
            100: semanticColorScales.error[100],
            300: semanticColorScales.error[300],
            500: semanticColorScales.error[500],
            600: semanticColorScales.error[700],
            700: semanticColorScales.error[900],
        },
    }
  },
  dark: {
    // Primary colors
    primary: primaryColors,
    
    // Bar colors
    bar_background: primaryColors[700],
    bar_background_100: primaryColors[500],
    bar_background_200: primaryColors[600],
    bar_background_300: primaryColors[700],
    bar_background_400: primaryColors[800],
    bar_background_500: primaryColors[900],

    bar_text: neutralColors[200],
    bar_text_100: neutralColors[100],
    bar_text_200: neutralColors[200],
    bar_text_300: neutralColors[300],
    bar_text_400: neutralColors[400],
    bar_text_500: neutralColors[500],

    // Background colors
    background: "#11181C",
    background_100: neutralColors[700],
    background_200: neutralColors[800],
    background_300: neutralColors[900],
    background_400: "#11181C",
    background_500: "#0a0f12",

    // Text colors
    text: neutralColors[100],
    text_100: neutralColors[200],
    text_200: neutralColors[100],
    text_300: neutralColors[50],
    text_400: neutralColors[300],
    text_500: neutralColors[400],

    // UI element colors
    tint: tintColorDark,
    icon: neutralColors[400],
    tabIconDefault: neutralColors[400],
    tabIconSelected: tintColorDark,
    
    // Border colors
    border: neutralColors[700],
    border_light: neutralColors[600],
    border_dark: neutralColors[800],

    messages: {
        success: {
            default: semanticColorScales.success[500], 
            100: semanticColorScales.success[100],
            300: semanticColorScales.success[300],
            500: semanticColorScales.success[500],
            600: semanticColorScales.success[700],
            700: semanticColorScales.success[900],
        },
        info: {
            default: semanticColorScales.info[500], 
            100: semanticColorScales.info[100],
            300: semanticColorScales.info[300],
            500: semanticColorScales.info[500],
            600: semanticColorScales.info[700],
            700: semanticColorScales.info[900],
        },
        warning: {
            default: semanticColorScales.warning[500], 
            100: semanticColorScales.warning[100],
            300: semanticColorScales.warning[300],
            500: semanticColorScales.warning[500],
            600: semanticColorScales.warning[700],
            700: semanticColorScales.warning[900],
        },
        error: {
            default: semanticColorScales.error[500], 
            100: semanticColorScales.error[100],
            300: semanticColorScales.error[300],
            500: semanticColorScales.error[500],
            600: semanticColorScales.error[700],
            700: semanticColorScales.error[900],
        },
    }
  },
};

export const Fonts = Platform.select({
    ios: {
        /** iOS `UIFontDescriptorSystemDesignDefault` */
        sans: "system-ui",
        /** iOS `UIFontDescriptorSystemDesignSerif` */
        serif: "ui-serif",
        /** iOS `UIFontDescriptorSystemDesignRounded` */
        rounded: "ui-rounded",
        /** iOS `UIFontDescriptorSystemDesignMonospaced` */
        mono: "ui-monospace",
    },
    default: {
        sans: "normal",
        serif: "serif",
        rounded: "normal",
        mono: "monospace",
    },
    web: {
        sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        serif: "Georgia, 'Times New Roman', serif",
        rounded:
            "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
        mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
});

