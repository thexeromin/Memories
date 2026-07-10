import { ReactNode } from "react";
import { useMediaLibraryPermission } from "@/hooks";
import { PermissionRequiredScreen } from "./PermissionRequiredScreen";

interface Props {
  children: ReactNode;
  loadingFallback?: ReactNode;
}

export function MediaPermissionGate({
  children,
  loadingFallback = null,
}: Props) {
  const { isLoading, granted, canAskAgain, requestPermission } =
    useMediaLibraryPermission();

  if (isLoading) return <>{loadingFallback}</>;

  if (!granted) {
    return (
      <PermissionRequiredScreen
        canAskAgain={canAskAgain}
        onRequest={requestPermission}
      />
    );
  }

  return <>{children}</>;
}
