import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';
import {useProgress} from 'react-native-track-player';

const SongSlider = () => {
  const {position, duration} = useProgress();

  return (
    <View>
      <Slider
        style={{width: '100%', height: 40}}
        value={position}
        minimumValue={0}
        maximumValue={duration}
        maximumTrackTintColor="#000000"
        thumbTintColor="#000000"
      />
      <View style={styles.durationContainer}>
        <Text>{new Date(position * 1000).toISOString().substring(15, 19)}</Text>
        <Text>
          {new Date((duration - position) * 1000)
            .toISOString()
            .substring(15, 19)}
        </Text>
      </View>
    </View>
  );
};

export default SongSlider;

const styles = StyleSheet.create({
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
