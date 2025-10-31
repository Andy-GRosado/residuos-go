import { Text, View } from "react-native";

export type ColorTypes = 
  | "blue" | "lightblue" | "darkblue"
  | "yellow" | "lightyellow" | "gold"
  | "orange" | "lightorange" | "darkorange"
  | "red" | "lightred" | "darkred"
  | "green" | "lightgreen" | "darkgreen"
  | "purple" | "pink" | "brown"
  | "gray" | "black";

const colors = {
  blue: { background: "#3B82F6", text: "#FFFFFF" },
  lightblue: { background: "#93C5FD", text: "#000000" },
  darkblue: { background: "#1E40AF", text: "#FFFFFF" },
  
  yellow: { background: "#F59E0B", text: "#000000" },
  lightyellow: { background: "#FDE68A", text: "#000000" },
  gold: { background: "#D97706", text: "#FFFFFF" },
  
  orange: { background: "#F97316", text: "#FFFFFF" },
  lightorange: { background: "#FDBA74", text: "#000000" },
  darkorange: { background: "#EA580C", text: "#FFFFFF" },
  
  red: { background: "#EF4444", text: "#FFFFFF" },
  lightred: { background: "#FCA5A5", text: "#000000" },
  darkred: { background: "#DC2626", text: "#FFFFFF" },
  
  green: { background: "#10B981", text: "#FFFFFF" },
  lightgreen: { background: "#86EFAC", text: "#000000" },
  darkgreen: { background: "#059669", text: "#FFFFFF" },
  
  purple: { background: "#8B5CF6", text: "#FFFFFF" },
  pink: { background: "#EC4899", text: "#FFFFFF" },
  brown: { background: "#92400E", text: "#FFFFFF" },
  
  gray: { background: "#6B7280", text: "#FFFFFF" },
  black: { background: "#000000", text: "#FFFFFF" }
};

interface TagProps {
  color: ColorTypes;
  text?: string;
}

export default function Tag({ color, text }: TagProps) {
  return (
    <View
      style={{
        backgroundColor: colors[color].background,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        alignSelf: 'flex-start',
      }}
    >
      <Text
        style={{
          color: colors[color].text,
          fontSize: 12,
          fontWeight: '600',
        }}
      >
        {text || color}
      </Text>
    </View>
  );
}
