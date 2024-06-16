import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setPermission(status === 'granted');
      if (status !== 'granted') {
        alert('Permission to access media library is required!');
        return;
      }
    })();

    // Fetch videos from AsyncStorage (replace with actual fetching logic)
    async function fetchVideos() {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const videoKeys = keys.filter(key => key.startsWith('video_'));
        const videoURIs = await AsyncStorage.multiGet(videoKeys);
        setVideos(videoURIs.map(item => item[1]));
      } catch (err) {
        console.log(err);
      }
    }
    fetchVideos();
  }, []);

  const downloadVideo = async (uri) => {
    try {
      const fileUri = FileSystem.documentDirectory + uri.split('/').pop();
      await FileSystem.downloadAsync(uri, fileUri);
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync('Download', asset, false);
      alert('Video saved to gallery!');
    } catch (error) {
      console.log(error);
      alert('Failed to save video!');
    }
  };

  if (permission === null) {
    return <Text>Requesting for media library permissions...</Text>;
  }

  if (permission === false) {
    return <Text>Permission to access media library is required!</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.videoContainer}>
            <Video
              source={{ uri: item }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={styles.video}
            />
            <Button title="Download" onPress={() => downloadVideo(item)} />
          </View>
        )}
      />
      <Text style={styles.title}>Video Gallery</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  video: {
    width: 300,
    height: 200,
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
});
