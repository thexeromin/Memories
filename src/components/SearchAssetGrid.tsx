import { View, StyleSheet, FlatList, Text, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Colors } from "@/theme/colors";

const { width } = Dimensions.get("window");
const COLUMN_COUNT = 3;
const SPACING = 8;
const PADDING_HORIZONTAL = 16;
const ITEM_SIZE =
  (width - PADDING_HORIZONTAL * 2 - SPACING * (COLUMN_COUNT - 1)) /
  COLUMN_COUNT;

// TODO: remove this
// Mock data to visualize the grid
const MOCK_ASSETS = Array.from({ length: 30 }).map((_, i) => ({
  id: `mock-${i}`,
  uri: `https://picsum.photos/seed/${i + 100}/300/300`,
}));

export default function SearchAssetGrid() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Recent</Text>
      <FlatList
        data={MOCK_ASSETS}
        keyExtractor={(item) => item.id}
        numColumns={COLUMN_COUNT}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.uri }}
              style={styles.image}
              contentFit="cover"
              transition={200}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  listContent: {
    paddingBottom: 24,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  columnWrapper: {
    gap: SPACING,
    marginBottom: SPACING,
  },
  imageContainer: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: Colors.border,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
