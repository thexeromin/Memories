import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../theme/colors";

export default function PhotoDetailScreen() {
  const router = useRouter();
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
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialDesignIcons
            name="arrow-left"
            size={28}
            color={Colors.text}
          />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.title}>{formattedDate}</Text>
          <Text style={styles.subtitle}>San Francisco</Text>
        </View>

        <View style={styles.rightPlaceholder} />
      </View>

      <View style={styles.imageContainer}>
        {uri ? (
          <Image source={{ uri }} style={styles.image} resizeMode="cover" />
        ) : null}
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.iconButton}>
          <MaterialDesignIcons
            name="export-variant"
            size={26}
            color={Colors.textMuted}
          />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <MaterialDesignIcons
            name="heart-outline"
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  subtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  rightPlaceholder: {
    width: 44,
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
