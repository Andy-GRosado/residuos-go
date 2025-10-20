/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#ffffff";

export const Colors = {
    light: {
        bar_background: "#0a7ea4",
        bar_background_100: "#0d9ac9",
        bar_background_200: "#0a7ea4",
        bar_background_300: "#075b77",

        bar_text: "#e4e4e4",
        bar_text_100: "#ffffff",
        bar_text_200: "#e4e4e4",
        bar_text_300: "#c7c7c7",

        text: "#313638",
        text_100: "#5f6163",
        text_200: "#313638",
        text_300: "#11181C",

        background: "#e4e4e4",
        background_100: "#ffffff",
        background_200: "#e4e4e4",
        background_300: "#c7c7c7",

        tint: tintColorLight,
        icon: "#687076",
        tabIconDefault: "#687076",
        tabIconSelected: tintColorLight,
    },
    dark: {
        bar_background: "#043546ff",
        bar_background_100: "#07536dff",
        bar_background_200: "#043546ff",
        bar_background_300: "#06232cff",
        
        bar_text: "#e4e4e4",
        bar_text_100: "#ffffff",
        bar_text_200: "#e4e4e4",
        bar_text_300: "#c7c7c7",
        
        background: "#313638",
        background_100: "#5f6163",
        background_200: "#313638",
        background_300: "#11181C",

        text: "#e4e4e4",
        text_100: "#ffffff",
        text_200: "#e4e4e4",
        text_300: "#c7c7c7",

        tint: tintColorDark,
        icon: "#9BA1A6",
        tabIconDefault: "#9BA1A6",
        tabIconSelected: tintColorDark,
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
