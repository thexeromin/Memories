import { View, Image, StyleSheet } from "react-native";
import { MediaAsset } from "../types";

interface PhotoRowProps {
  rowAssets: MediaAsset[];
  columns?: number;
}

export function PhotoRow({ rowAssets, columns = 3 }: PhotoRowProps) {
  // Pad the row if it has fewer items than columns, so flex: 1 doesn't stretch them
  const items = [...rowAssets];
  while (items.length < columns) {
    items.push({ id: `empty-${items.length}`, uri: "", updatedAt: new Date() });
  }

  return (
    <View style={styles.row}>
      {items.map((asset, index) => {
        if (!asset.uri) {
          return <View key={asset.id} style={styles.emptyItem} />;
        }
        return (
          <Image
            key={asset.id}
            source={{ uri: asset.uri }}
            style={styles.image}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 8,
    gap: 8,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: "#f0f0f0", // placeholder color
  },
  emptyItem: {
    flex: 1,
    aspectRatio: 1,
    // invisible
  },
});
