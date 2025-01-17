import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedRef,
  getRelativeCoords,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const GetLocationOnGestureEvent = () => {
  const animatedRef = useAnimatedRef();
  const [coords, setCoords] = useState({x: 0, y: 0});
  const tapGesture = Gesture.Tap().onEnd(event => {
    const relativeCoords = getRelativeCoords(
      animatedRef,
      event.absoluteX,
      event.absoluteY,
    );
    runOnJS(setCoords)(relativeCoords);
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.coordsData, {color: 'black'}]}>
        Relative coordinates to parent:
      </Text>
      <Text style={[styles.coordsData, styles.coords, {color: 'black'}]}>
        x={coords.x.toFixed()} y=
        {coords.y.toFixed()}
      </Text>

      <GestureDetector gesture={tapGesture}>
        <Animated.View ref={animatedRef} style={styles.innerView}>
          <Text style={styles.text}>Tap anywhere inside.</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerView: {
    width: 300,
    height: 300,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    cursor: 'pointer',
  },
  coordsData: {
    fontSize: 20,
    color: 'green',
  },
  coords: {
    marginBottom: 16,
    fontWeight: '500',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default GetLocationOnGestureEvent;
