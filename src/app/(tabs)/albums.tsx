import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Album, Query, requestPermissionsAsync } from "expo-media-library";
import { Colors } from "../../theme/colors";
import AlbumCard from "../../components/AlbumCard";

interface AlbumData {
  id: string;
  title: string;
  count: number;
  image: string | null;
}

export default function Albums() {
  const [albums, setAlbums] = useState<AlbumData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const { status } = await requestPermissionsAsync();
        if (status !== "granted") return;

        const mediaAlbums = await Album.getAll();

        const albumsWithCovers = await Promise.all(
          mediaAlbums.map(async (album) => {
            const title = await album.getTitle();

            // Try to get a cover image using Query
            const coverAssets = await new Query().album(album).limit(1).exe();
            const coverAsset = coverAssets[0];
            const image = coverAsset ? await coverAsset.getUri() : null;

            // Get all assets to get the count
            const allAssets = await album.getAssets();
            const count = allAssets.length;

            return {
              id: album.id,
              title,
              count,
              image,
            };
          }),
        );

        // Filter out albums with 0 items
        const validAlbums = albumsWithCovers.filter((a) => a.count > 0);

        setAlbums(validAlbums);
      } catch (error) {
        console.error("Failed to fetch albums", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={albums}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <AlbumCard
            title={item.title}
            count={item.count}
            image={
              item.image ||
              "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600"
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    padding: 16,
    paddingTop: 24,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
