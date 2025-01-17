/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeOut,
  FadeOutLeft,
  FadeOutUp,
  interpolateColor,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
const AnimatedPressale = Animated.createAnimatedComponent(Pressable);

// CONSTANT
const _SPACING = 10;
const _BUTTON_HEIGHT = 42;
const _LAYOUT_TRANSITION = LinearTransition.springify()
  .damping(100)
  .stiffness(200);
const _DOT_CONTAINER = 24;
const _DOT_SIZE = _DOT_CONTAINER / 3;
const _Active_DOT = '#fff';
const _IN_Active_DOT = '#aaa';
const ButtonCustom = ({children, style, ...rest}) => {
  return (
    <AnimatedPressale
      style={[
        style,
        {
          height: _BUTTON_HEIGHT,
          borderRadius: _BUTTON_HEIGHT / 2,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: _SPACING * 2,
        },
      ]}
      layout={_LAYOUT_TRANSITION}
      {...rest}>
      {children}
    </AnimatedPressale>
  );
};
const Dot = ({index, animation}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animation.value,
        [index - 1, index, index + 1],
        [_IN_Active_DOT, _Active_DOT, _Active_DOT],
      ),
    };
  });
  return (
    <View
      style={{
        width: _DOT_CONTAINER,
        height: _DOT_CONTAINER,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.View
        style={[
          {
            backgroundColor: 'black',
            width: _DOT_SIZE,
            height: _DOT_SIZE,
            borderRadius: _DOT_SIZE,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};
const PanigationIndication = ({animated}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {width: _DOT_CONTAINER + _DOT_CONTAINER * animated.value};
  });
  return (
    <Animated.View
      style={[
        {
          backgroundColor: 'green',
          height: _DOT_CONTAINER,
          width: _DOT_CONTAINER,
          borderRadius: _DOT_CONTAINER,
          position: 'absolute',
          top: 0,
          left: 0,
        },
        animatedStyle,
      ]}
    />
  );
};
const Panigation = ({selectedIndex, total}) => {
  const animated = useDerivedValue(() => {
    return withSpring(selectedIndex, {damping: 80, stiffness: 200});
  });
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row'}}>
        <PanigationIndication animated={animated} />
        {[...Array(total).keys()].map(index => {
          return (
            <Dot key={index.toString()} index={index} animation={animated} />
          );
        })}
      </View>
    </View>
  );
};
const OnBoarding = ({total, selectedIndex, onIndexChange}) => {
  return (
    <View>
      <Panigation total={total} selectedIndex={selectedIndex} />
      <View style={{flexDirection: 'row', gap: _SPACING}}>
        {selectedIndex > 0 && (
          <ButtonCustom
            entering={FadeInLeft.springify().damping(100).stiffness(200)}
            exiting={FadeOutLeft.springify().damping(100).stiffness(200)}
            style={{backgroundColor: 'green'}}
            onPress={() => {
              if (selectedIndex <= 0) {
                return;
              }
              onIndexChange(selectedIndex - 1);
            }}>
            <Animated.Text style={{color: 'white'}} layout={_LAYOUT_TRANSITION}>
              Back
            </Animated.Text>
          </ButtonCustom>
        )}
        <ButtonCustom
          entering={FadeInLeft.springify().damping(100).stiffness(200)}
          exiting={FadeOutLeft.springify().damping(100).stiffness(200)}
          style={{backgroundColor: 'blue', flex: 1}}
          onPress={() => {
            if (total - 1 === selectedIndex) {
              return;
            }
            onIndexChange(selectedIndex + 1);
          }}>
          {selectedIndex === total - 1 ? (
            <Animated.Text
              key={'Finish'}
              style={{color: 'white'}}
              layout={_LAYOUT_TRANSITION}
              entering={FadeInDown.springify().damping(100).stiffness(200)}
              exiting={FadeOutUp.springify().damping(100).stiffness(200)}>
              Finish
            </Animated.Text>
          ) : (
            <Animated.Text
              key={'Continue'}
              style={{color: 'white'}}
              layout={_LAYOUT_TRANSITION}
              entering={FadeInDown.springify().damping(100).stiffness(200)}
              exiting={FadeOutUp.springify().damping(100).stiffness(200)}>
              Continue
            </Animated.Text>
          )}
        </ButtonCustom>
      </View>
    </View>
  );
};
export default function OnBoardingAnitmated() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View style={styles.container}>
      <OnBoarding
        total={4}
        selectedIndex={selectedIndex}
        onIndexChange={index => {
          setSelectedIndex(index);
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    color: 'black',
    justifyContent: 'center',
    padding: _SPACING,
  },
});
