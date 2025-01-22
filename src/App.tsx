import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {addTracks, setupPlayer} from './services/musicPlayerService';

const App = () => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

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

  if (!isPlayerReady)
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );

  return (
    <SafeAreaView>
      <StatusBar />
      <Text>App</Text>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
