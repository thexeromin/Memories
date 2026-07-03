import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import {
  AssetField,
  MediaType,
  Query,
  requestPermissionsAsync,
} from "expo-media-library";
import { useEffect, useState } from "react";
import { MediaAsset } from "../../types";

export default function Photos() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);

  useEffect(() => {
    const queryAssets = async () => {
      const { status } = await requestPermissionsAsync();

      if (status !== "granted") return;

      const queryResult = await new Query()
        .eq(AssetField.MEDIA_TYPE, MediaType.IMAGE)
        .orderBy(AssetField.MODIFICATION_TIME)
        .exe();

      const processedAssets = await Promise.all(
        queryResult.map(async (a) => {
          const timestamp = await a.getModificationTime();
          return {
            id: a.id,
            uri: await a.getUri(),
            updatedAt: new Date((timestamp ? timestamp : 0) * 1000),
          };
        }),
      );

      setAssets(processedAssets);
    };

    queryAssets();
  }, []);

  return (
    <View style={styles.container}>
      <Text>This is photos page</Text>

      <FlatList
        data={assets}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.image} />
        )}
        keyExtractor={(item) => item.id}
        style={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  listContainer: {
    flexDirection: "column",
  },
});
