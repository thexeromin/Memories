import { View, StyleSheet, Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { Colors } from "@/theme/colors";

interface Props {
  title: string;
}

export default function ScreenHeader({ title }: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <MaterialDesignIcons name="arrow-left" size={28} color={Colors.text} />
      </Pressable>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.rightPlaceholder} />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
