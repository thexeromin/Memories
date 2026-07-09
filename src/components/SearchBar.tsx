import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { Colors } from "@/theme/colors";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  onClear,
  placeholder = "Search photos, places, dates...",
}: Props) {
  return (
    <View style={styles.container}>
      <MaterialDesignIcons
        name="magnify"
        size={24}
        color={Colors.textMuted}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <Pressable onPress={onClear} style={styles.clearButton} hitSlop={10}>
          <MaterialDesignIcons
            name="close-circle"
            size={20}
            color={Colors.textMuted}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.border + "80", // slightly transparent border color as background
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    height: "100%",
  },
  clearButton: {
    padding: 4,
  },
});
