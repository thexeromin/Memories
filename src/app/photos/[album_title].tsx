import { View, StyleSheet, SectionList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { AssetField, MediaType, Query, Album } from "expo-media-library";
import { useEffect, useState, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MediaAsset } from "@/types";
import { groupAssetsIntoSections, AssetSection } from "@/utils/asset";
import { PhotoRow } from "@/components/PhotoRow";
import { SectionHeader } from "@/components/SectionHeader";
import ScreenHeader from "@/components/ScreenHeader";
import { Colors } from "@/theme/colors";

export default function AlbumPhotos() {
  const insets = useSafeAreaInsets();
  const { album_title } = useLocalSearchParams<{ album_title: string }>();

  const [assets, setAssets] = useState<MediaAsset[]>([]);

  useEffect(() => {
    const queryAssets = async () => {
      const album = await Album.get(album_title);

      if (!album) return;

      const queryResult = await new Query()
        .album(album)
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
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScreenHeader title={album_title} />

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
