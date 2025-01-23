import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {addTracks, setupPlayer} from './services/musicPlayerService';
import ControlCenter from './components/ControlCenter';
import TrackPlayer, {
  State,
  Track,
  usePlaybackState,
} from 'react-native-track-player';
import SongInfo from './components/SongInfo';
import SongSlider from './components/SongSlider';

const App = () => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playbackState = usePlaybackState();
  const [currentTrack, setCurrentTrack] = useState<Track | null>();

  const handlePlayerSetup = async () => {
    const isSetup = await setupPlayer();

    if (isSetup) {
      await addTracks();
    }

    setIsPlayerReady(isSetup);
  };

  useEffect(() => {
    handlePlayerSetup();
  }, []);

  const handleGetCurrentTrack = async () => {
    const activeTrack = await TrackPlayer.getActiveTrack();
    setCurrentTrack(activeTrack);
  };

  useEffect(() => {
    if (
      isPlayerReady &&
      playbackState.state !== State.Paused &&
      playbackState.state !== State.Playing
    ) {
      handleGetCurrentTrack();
    }
  }, [isPlayerReady, playbackState]);

  if (!isPlayerReady)
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.container}>
      <SongInfo track={currentTrack} />
      <SongSlider />
      <ControlCenter />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
