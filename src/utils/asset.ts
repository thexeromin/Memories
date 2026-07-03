import { MediaAsset } from "../types";
import { formatDateGroup } from "./date";

export interface AssetSection {
  title: string;
  data: MediaAsset[][];
}

export function groupAssetsIntoSections(
  assets: MediaAsset[],
  columns: number = 3,
): AssetSection[] {
  // Sort by date descending (newest first)
  const sorted = [...assets].sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
  );

  const groups: Map<string, MediaAsset[]> = new Map();

  sorted.forEach((asset) => {
    const title = formatDateGroup(asset.updatedAt);
    if (!groups.has(title)) {
      groups.set(title, []);
    }
    groups.get(title)!.push(asset);
  });

  const sections: AssetSection[] = [];
  for (const [title, groupAssets] of groups.entries()) {
    const rows: MediaAsset[][] = [];
    for (let i = 0; i < groupAssets.length; i += columns) {
      rows.push(groupAssets.slice(i, i + columns));
    }
    sections.push({ title, data: rows });
  }

  return sections;
}
