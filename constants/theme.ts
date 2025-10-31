/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#ffffff";

export const primaryColors = {
    50: "#e3f2fd",
    100: "#bbdefb",
    200: "#90caf9",
    300: "#64b5f6",
    400: "#42a5f5",
    500: "#0a7ea4",
    600: "#07698aff",
    700: "#054f67ff",
    800: "#05394aff",
    900: "#021f29ff",
};

export const neutralColors = {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#6d6c6cff",
    800: "#4c4c4c",
    900: "#212121",
};

export type ShortColorRangeType = Record<
    "default" | 100 | 200 | 300 | 400 | 500,
    string
>;
export type LongColorRangeType = Record<
    "default" | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
    string
>;

export type ThemeConfigType = {
    tint: string;
    bar: {
        background: ShortColorRangeType;
        text: ShortColorRangeType;
    };
    text: ShortColorRangeType;
    background: ShortColorRangeType;
    semantic: {
        success: ShortColorRangeType;
        info: ShortColorRangeType;
        warning: ShortColorRangeType;
        error: ShortColorRangeType;
    };
};

export const semanticColorScales = {
    success: {
        50: "#e8f5e9",
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
        50: "#fff3e0",
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
        50: "#ffebee",
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
        50: "#e3f2fd",
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

export const Colors: Record<"light" | "dark", ThemeConfigType> = {
    light: {
        tint: tintColorLight,
        bar: {
            background: {
                default: primaryColors[500],
                100: primaryColors[400],
                200: primaryColors[500],
                300: primaryColors[600],
                400: primaryColors[700],
                500: primaryColors[800],
            },
            text: {
                default: neutralColors[200],
                100: neutralColors[100],
                200: neutralColors[200],
                300: neutralColors[300],
                400: neutralColors[400],
                500: neutralColors[500],
            },
        },
        text: {
            default: neutralColors[900],
            100: neutralColors[900],
            200: neutralColors[800],
            300: neutralColors[700],
            400: neutralColors[600],
            500: neutralColors[500],
        },
        background: {
            default: neutralColors[50],
            100: neutralColors[50],
            200: neutralColors[100],
            300: neutralColors[200],
            400: neutralColors[300],
            500: neutralColors[400],
        },
        semantic: {
            success: {
                default: semanticColorScales.success[500],
                100: semanticColorScales.success[100],
                200: semanticColorScales.success[300],
                300: semanticColorScales.success[500],
                400: semanticColorScales.success[700],
                500: semanticColorScales.success[900],
            },
            info: {
                default: semanticColorScales.info[500],
                100: semanticColorScales.info[100],
                200: semanticColorScales.info[300],
                300: semanticColorScales.info[500],
                400: semanticColorScales.info[700],
                500: semanticColorScales.info[900],
            },
            warning: {
                default: semanticColorScales.warning[500],
                100: semanticColorScales.warning[100],
                200: semanticColorScales.warning[300],
                300: semanticColorScales.warning[500],
                400: semanticColorScales.warning[700],
                500: semanticColorScales.warning[900],
            },
            error: {
                default: semanticColorScales.error[500],
                100: semanticColorScales.error[100],
                200: semanticColorScales.error[300],
                300: semanticColorScales.error[500],
                400: semanticColorScales.error[700],
                500: semanticColorScales.error[900],
            },
        },
    },
    dark: {
        tint: tintColorDark,
        bar: {
            background: {
                default: primaryColors[700],
                100: primaryColors[500],
                200: primaryColors[600],
                300: primaryColors[700],
                400: primaryColors[800],
                500: primaryColors[900],
            },
            text: {
                default: neutralColors[200],
                100: neutralColors[100],
                200: neutralColors[200],
                300: neutralColors[300],
                400: neutralColors[400],
                500: neutralColors[500],
            },
        },
        text: {
            default: neutralColors[100],
            100: neutralColors[200],
            200: neutralColors[100],
            300: neutralColors[50],
            400: neutralColors[300],
            500: neutralColors[400],
        },
        background: {
            default: neutralColors[900],
            100: neutralColors[500],
            200: neutralColors[600],
            300: neutralColors[700],
            400: neutralColors[800],
            500: neutralColors[900],
        },
        semantic: {
            success: {
                default: semanticColorScales.success[500],
                100: semanticColorScales.success[100],
                200: semanticColorScales.success[300],
                300: semanticColorScales.success[500],
                400: semanticColorScales.success[700],
                500: semanticColorScales.success[900],
            },
            info: {
                default: semanticColorScales.info[500],
                100: semanticColorScales.info[100],
                200: semanticColorScales.info[300],
                300: semanticColorScales.info[500],
                400: semanticColorScales.info[700],
                500: semanticColorScales.info[900],
            },
            warning: {
                default: semanticColorScales.warning[500],
                100: semanticColorScales.warning[100],
                200: semanticColorScales.warning[300],
                300: semanticColorScales.warning[500],
                400: semanticColorScales.warning[700],
                500: semanticColorScales.warning[900],
            },
            error: {
                default: semanticColorScales.error[500],
                100: semanticColorScales.error[100],
                200: semanticColorScales.error[300],
                300: semanticColorScales.error[500],
                400: semanticColorScales.error[700],
                500: semanticColorScales.error[900],
            },
        },
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
