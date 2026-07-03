import { View, StyleSheet, SectionList } from "react-native";
import {
  AssetField,
  MediaType,
  Query,
  requestPermissionsAsync,
} from "expo-media-library";
import { useEffect, useState, useMemo } from "react";
import { MediaAsset } from "../../types";
import { groupAssetsIntoSections, AssetSection } from "../../utils/asset";
import { PhotoRow } from "../../components/PhotoRow";
import { SectionHeader } from "../../components/SectionHeader";

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
            updatedAt: new Date(timestamp ? timestamp : 0),
          };
        }),
      );

      setAssets(processedAssets);
    };

    queryAssets();
  }, []);

  const sections: AssetSection[] = useMemo(() => {
    return groupAssetsIntoSections(assets);
  }, [assets]);

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item[0]?.id || index.toString()}
        renderItem={({ item }) => <PhotoRow rowAssets={item} />}
        renderSectionHeader={({ section }) => (
          <SectionHeader title={section.title} />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingBottom: 24,
  },
});
