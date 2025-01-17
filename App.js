import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TextAnimatorScreen from './screen/TextAnimated';
import AnimatedDemo from './screen/AnimationDemo';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AnimatedSensor from './screen/AnimatedSensor';
import LayOutAnimationDemo from './screen/LayOutAnimationDemo';
import Layout from './screen/CustomLayoutAnimated';
import RollingBoxes from './screen/RollingBoxes';
import GetLocationOnGestureEvent from './screen/GetLocationOnGestureEvent';
import ChuyenDongVOCuc from './screen/ChuyenDongVOCuc';
import KeyframeExample from './screen/AnimationKeyFrameDemo';
import EnteringExample from './screen/CustomAnimate';
import JumpGame from './screen/JumpGame';
import OnBoardingAnitmated from './screen/OnBoardingAnitmated';
import CustomScrollEventByUseEvent from './screen/CustomScrollEventByUseEvent';
import TiktokMessageAnimted from './screen/TiktokMessageAnimted';
import AnimatedVerticalFlatList from './screen/AnimatedVerticalFlatlist';
import RankAnimated from './screen/RankAnimated';

// Screen 1
const screens = [
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'AnimatedDemo',
    component: AnimatedDemo,
  },
  {
    name: 'TextAnimator',
    component: TextAnimatorScreen,
  },
  {
    name: 'AnimatedSensor',
    component: AnimatedSensor,
  },
  {
    name: 'KeyframeExample',
    component: KeyframeExample,
  },
  {
    name: 'LayOutAnimationDemo',
    component: LayOutAnimationDemo,
  },
  {
    name: 'EnteringExample',
    component: EnteringExample,
  },
  {
    name: 'Customize Layout',
    component: Layout,
  },
  {
    name: 'RollingBoxes',
    component: RollingBoxes,
  },
  {
    name: 'GetLocationOnGestureEvent',
    component: GetLocationOnGestureEvent,
  },
  {
    name: 'ChuyenDongVOCuc',
    component: ChuyenDongVOCuc,
  },
  {
    name: 'JumpGame',
    component: JumpGame,
  },
  {
    name: 'OnBoardingAnitmated',
    component: OnBoardingAnitmated,
  },
  {
    name: 'CustomScrollEventByUseEvent',
    component: CustomScrollEventByUseEvent,
  },
  {
    name: 'TiktokMessageAnimted',
    component: TiktokMessageAnimted,
  },
  {
    name: 'AnimatedVerticalFlatList',
    component: AnimatedVerticalFlatList,
  },
  {
    name: 'RankAnimated',
    component: RankAnimated,
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

// Create a Stack Navigator
const Stack = createStackNavigator();
export default function App() {
  return (
    <GestureHandlerRootView>
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
    </GestureHandlerRootView>
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
