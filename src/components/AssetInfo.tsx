import { View, Text, StyleSheet, Animated } from "react-native";

interface AssetInfoProps {
  filename: string;
  width: number;
  height: number;
  opacity: Animated.Value;
  scale: Animated.Value;
}

function truncateMiddle(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  const charsToShow = maxLength - 3; // for "..."
  const front = Math.ceil(charsToShow / 2);
  const back = Math.floor(charsToShow / 2);

  return text.slice(0, front) + "..." + text.slice(text.length - back);
}

export default function AssetInfo({
  filename,
  width,
  height,
  opacity,
  scale,
}: AssetInfoProps) {
  const truncatedName = truncateMiddle(filename, 20);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [
            {
              translateX: -125,
            },
            { translateY: -50 },
            {
              scale,
            },
          ],
        },
      ]}
    >
      <View style={styles.row}>
        <Text style={styles.label}>Name</Text>
        <View style={styles.nameValueWrapper}>
          <Text style={styles.value} numberOfLines={1} ellipsizeMode="tail">
            {truncatedName}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Width</Text>
        <Text style={styles.value}>{width}px</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Height</Text>
        <Text style={styles.value}>{height}px</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 100,
    position: "absolute",
    zIndex: 2,
    top: "50%",
    left: "50%",
    transform: [],
    backgroundColor: "#F1F3F5",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  label: {
    color: "#888888",
    fontSize: 12,
    fontWeight: "500",
  },
  nameValueWrapper: {
    flexDirection: "row",
    flexShrink: 1,
    marginLeft: 8,
    justifyContent: "flex-end",
  },
  value: {
    color: "#333333",
    fontSize: 13,
    fontWeight: "600",
    flexShrink: 1,
    textAlign: "right",
  },
});
