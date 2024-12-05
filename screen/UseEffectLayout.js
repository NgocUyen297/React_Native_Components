import React, {useState, useLayoutEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
const UseEffectLayOut = ({navigation}) => {
  const viewRef = useRef(null);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Updated Title', // The title is updated before the ui is render
    });
  }, [navigation]);

  //get the size off the component before it render to UI
  useLayoutEffect(() => {
    if (viewRef.current) {
      viewRef.current.measure((x, y, width, height) => {
        setDimensions({width, height});
      });
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
      <View ref={viewRef} style={styles.box}>
        <Text>Box dimensions:</Text>
        <Text>{`Width: ${dimensions.width}, Height: ${dimensions.height}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default UseEffectLayOut;
