import { View, StyleSheet, SectionList } from "react-native";
import { AssetField, MediaType, Query } from "expo-media-library";
import { useEffect, useState, useMemo } from "react";
import { PhotoRow } from "@/components/PhotoRow";
import { SectionHeader } from "@/components/SectionHeader";
import { groupAssetsIntoSections, AssetSection } from "@/utils/asset";
import { Colors } from "@/theme/colors";
import { MediaAsset } from "@/types";

export default function Photos() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);

  useEffect(() => {
    const queryAssets = async () => {
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
    backgroundColor: Colors.white,
  },
  listContainer: {
    paddingBottom: 24,
  },
});
