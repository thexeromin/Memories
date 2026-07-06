import { View, Text, Linking, StyleSheet, Pressable } from "react-native";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { Colors } from "@/theme/colors";

interface Props {
  canAskAgain: boolean;
  onRequest: () => void;
}

export function PermissionRequiredScreen({ canAskAgain, onRequest }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialDesignIcons
            name="lock-outline"
            size={64}
            color={Colors.primary}
          />
        </View>
        <Text style={styles.title}>Access Required</Text>
        <Text style={styles.description}>
          This app needs access to your photo library to help you manage and
          view your memories.
        </Text>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={canAskAgain ? onRequest : () => Linking.openSettings()}
        >
          <Text style={styles.buttonText}>
            {canAskAgain ? "Grant Permission" : "Open Settings"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: `${Colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: Colors.textMuted,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  footer: {
    paddingBottom: 32,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
});
