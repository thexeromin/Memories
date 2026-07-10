import { AssetField, MediaType, Query } from "expo-media-library";
import { useEffect, useState } from "react";
import { MediaAsset } from "@/types";

export function useAssets(limit?: number) {
  const [assets, setAssets] = useState<MediaAsset[]>([]);

  useEffect(() => {
    const queryAssets = async () => {
      let query = new Query()
        .eq(AssetField.MEDIA_TYPE, MediaType.IMAGE)
        .orderBy(AssetField.MODIFICATION_TIME);

      if (limit) {
        query = query.limit(limit);
      }

      const queryResult = await query.exe();

      const processedAssets = await Promise.all(
        queryResult.map(async (a) => {
          const timestamp = await a.getModificationTime();
          return {
            id: a.id,
            uri: await a.getUri(),
            updatedAt: new Date(timestamp ? timestamp : 0),
          };
        }),
      );

      setAssets(processedAssets);
    };

    queryAssets();
  }, [limit]);

  return assets;
}
