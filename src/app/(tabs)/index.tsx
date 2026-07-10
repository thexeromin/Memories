import { View, StyleSheet, SectionList } from "react-native";
import { useMemo } from "react";
import { PhotoRow } from "@/components/PhotoRow";
import { SectionHeader } from "@/components/SectionHeader";
import { groupAssetsIntoSections, AssetSection } from "@/utils/asset";
import { Colors } from "@/theme/colors";
import { useAssets } from "@/hooks";

export default function Photos() {
  const assets = useAssets();

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
