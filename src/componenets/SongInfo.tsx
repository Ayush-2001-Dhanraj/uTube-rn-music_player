import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Track} from 'react-native-track-player';

type SongInfoProps = {
  track: Track | null | undefined;
};

const SongInfo = ({track}: SongInfoProps) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.artwork}
        source={{uri: track?.artwork?.toString()}}
      />
      <View>
        <Text style={[styles.txt, styles.title]}>{track?.title}</Text>
        <Text style={styles.txt}>
          {track?.artist} . {track?.album}
        </Text>
      </View>
    </View>
  );
};

export default SongInfo;

const styles = StyleSheet.create({
  txt: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  container: {
    flex: 1,
    gap: 20,
  },
  artwork: {
    width: '100%',
    height: 500,
    flex: 1,
  },
});
