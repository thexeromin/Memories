import { Text, StyleSheet, View } from "react-native";

interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff", // assuming white background, otherwise transparent
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6b5e55", // matching the brownish grey from design
  },
});
