import * as React from 'react';
import {StatusBar, View, StyleSheet, Text, Animated, Alert} from 'react-native';
import Constants from 'expo-constants';
import {ZoomInEasyDown} from 'react-native-reanimated';

class TextAnimator extends React.Component {
  animatedValues = [];
  constructor(props) {
    super(props);
    const textArr = props.content.trim().split(' ');
    textArr.forEach((_, i) => {
      this.animatedValues[i] = new Animated.Value(0);
    });
    this.textArr = textArr;
  }
  componentDidMount() {
    this.animated();
  }
  animated = (toValue = 1) => {
    const animations = this.textArr.map((_, i) => {
      return Animated.timing(this.animatedValues[i], {
        toValue,
        duration: this.props.duration,
        useNativeDriver: true,
      });
    });
    Animated.stagger(
      this.props.duration / 5,
      toValue === 0 ? animations.reverse() : animations,
    ).start(() => {
      setTimeout(() => {
        this.animated(toValue === 0 ? 1 : 0);
      }, 1000);
      if (this.props.onFinish) {
        this.props.onFinish();
      }
    });
  };
  render() {
    return (
      <View style={[this.props.style, styles.textWrapper]}>
        {this.textArr.map((word, index) => {
          return (
            <Animated.Text
              key={`${word}-${index}`}
              style={[
                this.props.textStyle,
                {
                  opacity: this.animatedValues[index],
                  transform: [
                    {
                      translateY: Animated.multiply(
                        this.animatedValues[index],
                        new Animated.Value(-5),
                      ),
                    },
                  ],
                },
              ]}>
              {word}
              {`${index < this.textArr.length ? ' ' : ''}`}
            </Animated.Text>
          );
        })}
      </View>
    );
  }
}

export default function TextAnimatorScreen() {
  const _onFinish = () => {
    // Alert.alert('Thong bao', 'DONE');
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <TextAnimator
        content="For the things we have to learn before we can do them, we learn by doing them."
        textStyle={styles.textStyle}
        style={styles.containerStyle}
        duration={300}
        onFinish={_onFinish}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  containerStyle: {},
  textStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Menlo',
    marginBottom: 10, // Corrected marginBottom value (added a number)
  },
  textWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
