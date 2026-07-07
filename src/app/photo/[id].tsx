import { View, StyleSheet, Pressable, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { shareAsync } from "expo-sharing";
import ScreenHeader from "@/components/ScreenHeader";
import { Colors } from "@/theme/colors";

export default function PhotoDetailScreen() {
  const { uri, date } = useLocalSearchParams<{
    id: string;
    uri: string;
    date: string;
  }>();
  const insets = useSafeAreaInsets();

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScreenHeader title={formattedDate} />

      <View style={styles.imageContainer}>
        {uri ? (
          <Image source={{ uri }} style={styles.image} resizeMode="contain" />
        ) : null}
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.iconButton} onPress={() => shareAsync(uri)}>
          <MaterialDesignIcons
            name="export-variant"
            size={26}
            color={Colors.textMuted}
          />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <MaterialDesignIcons
            name="information-outline"
            size={26}
            color={Colors.textMuted}
          />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <MaterialDesignIcons
            name="trash-can-outline"
            size={26}
            color={Colors.textMuted}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imageContainer: {
    flex: 1,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  iconButton: {
    padding: 8,
  },
});
