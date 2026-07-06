import { Stack } from "expo-router";
import { MediaPermissionGate } from "@/components/MediaPermissionGate";

export default function RootLayout() {
  return (
    <MediaPermissionGate>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="photo/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="photos/[album_title]"
          options={{ headerShown: false }}
        />
      </Stack>
    </MediaPermissionGate>
  );
}
