import { useEffect } from "react";
import * as MediaLibrary from "expo-media-library";

export function useMediaLibraryPermission() {
  // TODO: add granular permission
  const [permission, requestPermission] = MediaLibrary.usePermissions();

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
