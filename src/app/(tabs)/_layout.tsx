import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { Colors } from "@/theme/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: "center",
        tabBarStyle: {
          backgroundColor: Colors.tabBackground,
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Photos",
          tabBarIcon: ({ color }) => (
            <MaterialDesignIcons
              size={28}
              name="image-multiple"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="albums"
        options={{
          title: "Albums",
          tabBarIcon: ({ color }) => (
            <MaterialDesignIcons size={28} name="folder-open" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <MaterialDesignIcons size={28} name="magnify" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.background,
    elevation: 0,
  },
  headerTitle: {
    fontWeight: "500",
  },
});
