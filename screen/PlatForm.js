import React, {useEffect} from 'react';
import {View, Text, Platform, StyleSheet} from 'react-native';
import {Dimensions, useWindowDimensions} from 'react-native';
const App = () => {
  const Component = Platform.select({
    native: () => require('ComponentForNative'),
    default: () => require('ComponentForWeb'),
  })();
  if (Platform.Version === 25) {
    console.log('Running on Nougat!');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
      <Component />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    height: Platform.OS === 'ios' ? 200 : 100,
  },
  container2: {
    // Platform.select -> 'ios' | 'android' | 'native' | 'default',if not android or ios it returns native first then default
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'green',
      },
      default: {
        // other platforms, web for example
        backgroundColor: 'blue',
      },
    }),
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default App;
