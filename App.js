import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TextAnimatorScreen from './screen/TextAnimated';
// Screen 1
const screens = [
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'Details',
    component: DetailsScreen,
  },
  {
    name: 'TextAnimator',
    component: TextAnimatorScreen,
  },
];
function HomeScreen({navigation}) {
  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={screens}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.itemScreen}
            onPress={() => navigation.navigate(item.name)}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Screen 2
function DetailsScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.text}>This is the Details Screen</Text>
    </View>
  );
}

// Create a Stack Navigator
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {screens.map((screen, index) => (
          <Stack.Screen
            key={index}
            name={screen.name}
            component={screen.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemScreen: {
    padding: 10,
    backgroundColor: 'lightgray',
    marginVertical: 10,
  },
});
