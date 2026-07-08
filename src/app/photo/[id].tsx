import {
  Animated,
  View,
  StyleSheet,
  Pressable,
  Image,
  TouchableWithoutFeedback,
  Easing,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { shareAsync } from "expo-sharing";
import ScreenHeader from "@/components/ScreenHeader";
import { Colors } from "@/theme/colors";
import { Asset, type AssetInfo as AssetInfoType } from "expo-media-library";
import AssetInfo from "@/components/AssetInfo";
import { useState, useEffect, useRef } from "react";

export default function PhotoDetailScreen() {
  const { id, uri, date } = useLocalSearchParams<{
    id: string;
    uri: string;
    date: string;
  }>();
  const insets = useSafeAreaInsets();

  const [info, setInfo] = useState<AssetInfoType>();
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  useEffect(() => {
    const getInfo = async () => {
      const asset = new Asset(id);

      const info = await asset.getInfo();
      setInfo(info);
    };

    getInfo();
  }, [id]);

  const showInfoView = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        tension: 120,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideInfoView = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.8,
        duration: 250,
        easing: Easing.in(Easing.ease), // accelerate out, feels natural for exits
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScreenHeader title={formattedDate} />

      {info && <AssetInfo {...info} opacity={opacity} scale={scale} />}

      <TouchableWithoutFeedback onPress={hideInfoView}>
        <View style={styles.imageContainer}>
          {uri ? (
            <Image source={{ uri }} style={styles.image} resizeMode="contain" />
          ) : null}
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.footer}>
        <Pressable style={styles.iconButton} onPress={() => shareAsync(uri)}>
          <MaterialDesignIcons
            name="export-variant"
            size={26}
            color={Colors.textMuted}
          />
        </Pressable>
        <Pressable style={styles.iconButton} onPress={showInfoView}>
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
