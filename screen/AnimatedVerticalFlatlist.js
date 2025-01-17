/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Dimensions, StyleSheet, Image, View, Text} from 'react-native';
import data from '../Components/animatedVerticalFaker';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  scrollTo,
  useAnimatedRef,
} from 'react-native-reanimated';

//CONSTANT
const {height} = Dimensions.get('window');
const _SPACING = 4;
const _itemSize = height * 0.72;
const _itemFullSize = _itemSize + _SPACING * 2;
const VerticalList = ({data}) => {
  const animatedRef = useAnimatedRef();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y / _itemFullSize;
    },
  });
  return (
    <Animated.FlatList
      ref={animatedRef}
      data={data}
      snapToInterval={_itemFullSize}
      decelerationRate={'fast'}
      contentContainerStyle={{
        paddingVertical: (height - _itemFullSize) / 2,
        paddingHorizontal: _SPACING * 8,
        gap: _SPACING * 2,
      }}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => {
        return <AnimatedCard item={item} index={index} scrollY={scrollY} />;
      }}
      onScroll={onScroll}
      scrollEventThrottle={100}
    />
  );
};

const AnimatedCard = ({item, index, scrollY}) => {
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [0.3, 1, 0.3],
      ),
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [index - 1, index, index + 1],
            [0.92, 1, 0.92],
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          backgroundColor: 'white',
          flex: 1,
          height: _itemSize,
          padding: _SPACING * 2,
          borderRadius: 8,
        },
        stylez,
      ]}>
      <Image
        source={{uri: item.image}}
        style={[StyleSheet.absoluteFillObject, {borderRadius: 12}]}
        blurRadius={50}
      />
      <Image
        source={{uri: item.image}}
        style={{flex: 1, height: _itemSize * 0.4}}
      />
      <View style={{gap: _SPACING}}>
        <Text style={{fontSize: 24, fontWeight: '700', color: 'white'}}>
          {item.title}
        </Text>
        <Text numberOfLines={3} style={{color: '#ddd'}}>
          {item.description}
        </Text>
      </View>
      <View style={{flexDirection: 'row', gap: _SPACING, alignItems: 'center'}}>
        <Image
          source={{uri: item.author.avatar}}
          style={{
            width: 24,
            aspectRatio: 1,
            borderRadius: 12,
          }}
        />
        <Text style={{fontSize: 14, color: '#ddd'}}>{item.author.name}</Text>
      </View>
    </Animated.View>
  );
};
export default function AnimatedVerticalFlatList() {
  return (
    <View style={styles.container}>
      <VerticalList data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});
