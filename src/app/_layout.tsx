import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Colors } from "@/constants/themes";

export default function RootLayout() {
  const colors = Colors["light"];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}
    >
      <NativeTabs.Trigger name="photos">
        <NativeTabs.Trigger.Label>Photos</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="photo.fill" md="photo" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
