import { Text, View, StyleSheet } from "react-native";

export default function Search() {
  return (
    <View style={styles.container}>
      <Text>This is search page.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
