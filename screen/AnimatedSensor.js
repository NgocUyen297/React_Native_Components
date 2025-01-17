/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  useColorScheme,
  Image,
  BackHandler,
} from 'react-native';
import Animated, {
  useAnimatedSensor,
  SensorType,
  useDerivedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
export default function AnimatedSensor() {
  const rotation = useAnimatedSensor(SensorType.ROTATION, {
    interval: 20,
  });
  const foregroundStyle = useAnimatedStyle(() => {
    const {pitch, roll, yaw} = rotation.sensor.value;
    return {
      transform: [
        {translateX: withSpring(-roll * 50, {damping: 200})},
        {translateY: withSpring(-pitch * 50, {damping: 2000})},
      ],
    };
  });
  useDerivedValue(() => {
    const {pitch, roll, yaw} = rotation.sensor.value;
    console.log(rotation.sensor.value);
  });
  const backgroundStyle = useAnimatedStyle(() => {
    const {pitch, roll, yaw} = rotation.sensor.value;
    return {
      transform: [
        {translateX: withSpring(-roll * 25, {damping: 200})},
        {translateY: withSpring(-pitch * 25, {damping: 2000})},
      ],
    };
  });
  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.background, backgroundStyle]}
        source={require('../assets/image/a.jpg')}
      />
      <Animated.Image
        style={[styles.foreGround, foregroundStyle]}
        source={require('../assets/image/b.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foreGround: {
    position: 'absolute',
    bottom: -100,
  },
  background: {
    width: '130%',
    height: '130%',
  },
});
