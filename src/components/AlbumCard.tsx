import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import { Colors } from "@/theme/colors";

interface AlbumCardProps {
  title: string;
  count: number;
  image: string;
  onPress?: () => void;
}

export default function AlbumCard({
  title,
  count,
  image,
  onPress,
}: AlbumCardProps) {
  const { width } = useWindowDimensions();
  // 2 columns with 16px gap and 16px padding on sides (total 48px to subtract)
  const cardWidth = (width - 48) / 2;

  return (
    <Pressable
      style={[{ width: cardWidth }, styles.container]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={image}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.count}>{count.toLocaleString()} items</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#E0E0E0",
    marginBottom: 8,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 2,
  },
  count: {
    fontSize: 14,
    color: Colors.textMuted,
  },
});
