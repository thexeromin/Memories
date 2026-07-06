import { View, StyleSheet, SectionList, Pressable, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  AssetField,
  MediaType,
  Query,
  Album,
  requestPermissionsAsync,
} from "expo-media-library";
import { useEffect, useState, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { MediaAsset } from "../../types";
import { groupAssetsIntoSections, AssetSection } from "../../utils/asset";
import { PhotoRow } from "../../components/PhotoRow";
import { SectionHeader } from "../../components/SectionHeader";
import { Colors } from "../../theme/colors";

export default function AlbumPhotos() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { album_title } = useLocalSearchParams<{ album_title: string }>();

  const [assets, setAssets] = useState<MediaAsset[]>([]);

  useEffect(() => {
    const queryAssets = async () => {
      const { status } = await requestPermissionsAsync();

      if (status !== "granted") return;

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
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialDesignIcons
            name="arrow-left"
            size={28}
            color={Colors.text}
          />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.title}>{album_title}</Text>
        </View>

        <View style={styles.rightPlaceholder} />
      </View>

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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "500",
    color: Colors.text,
  },
  rightPlaceholder: {
    width: 44,
  },
  listContainer: {
    paddingBottom: 24,
  },
});
