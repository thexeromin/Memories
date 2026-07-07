import { useEffect } from "react";
import * as MediaLibrary from "expo-media-library";

export function useMediaLibraryPermission() {
  const [permission, requestPermission] = MediaLibrary.usePermissions({
    writeOnly: false,
    granularPermissions: ["photo"],
  });

  useEffect(() => {
    if (!permission?.granted && permission?.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  return {
    isLoading: permission === null,
    granted: permission?.granted ?? false,
    canAskAgain: permission?.canAskAgain ?? true,
    requestPermission,
  };
}
