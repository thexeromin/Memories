import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/theme/colors";
import SearchBar from "@/components/SearchBar";
import SearchAssetGrid from "@/components/SearchAssetGrid";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClear={() => setSearchQuery("")}
      />

      <View style={styles.content}>
        <SearchAssetGrid />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
  },
});
