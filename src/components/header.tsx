import { View, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
}

export default function Header({ title }: Props) {
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingBottom: 12
  },
  title: {
    fontSize: 32,
    color: "#000"
  }
});
