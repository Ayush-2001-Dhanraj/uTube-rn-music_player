import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const ControlCenter = () => {
  const playbackState = usePlaybackState();

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };
  const togglePlayback = async (playState: State) => {
    const currentTrack = await TrackPlayer.getActiveTrack();
    console.log('currentTRack', currentTrack);

    if (currentTrack) {
      if (playState === State.Paused || playState === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={skipToPrevious}>
        <MaterialIcon size={40} name="skip-previous" color="#000" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          togglePlayback(playbackState.state as State);
        }}>
        <MaterialIcon
          size={75}
          name={playbackState.state === State.Playing ? 'pause' : 'play-arrow'}
          color="#000"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={skipToNext}>
        <MaterialIcon size={40} name="skip-next" color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default ControlCenter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
