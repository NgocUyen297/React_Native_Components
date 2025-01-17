/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  generateMessage,
  MAX_MESSAGE,
} from '../Components/fakerDateForChatTiktokMessage';
import {cloneElement, useEffect, useRef, useState} from 'react';
import Animated, {
  interpolate,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
const chatSpeed = {
  slow: [1000, 100],
  medium: [500, 500],
  fast: [250, 250],
  insane: [50, 100],
};
const AnimatedItem = ({index, children}) => {
  const newIndex = useDerivedValue(() => {
    return withSpring(index, {damping: 80, stiffness: 200});
  });

  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(newIndex.value, [0, 1], [1, 1 - 1 / MAX_MESSAGE]),
    };
  });
  return <Animated.View style={stylez}>{children}</Animated.View>;
};
const TikTokMessage = ({renderItemCustom, ...rest}) => {
  return (
    <Animated.FlatList
      {...rest}
      inverted
      itemLayoutAnimation={LinearTransition.springify()
        .damping(80)
        .stiffness(200)}
      renderItem={item => {
        return (
          <AnimatedItem index={item.index}>
            {renderItemCustom(item)}
          </AnimatedItem>
        );
      }}
    />
  );
};
export default function TiktokMessageAnimted() {
  const [message, setMessage] = useState(
    [...Array(10).keys()].map(generateMessage),
  );
  const timeOut = useRef(null);
  const [speed, setPeed] = useState('slow');
  const generateData = () => {
    clearTimeout(timeOut.current);
    const selectedSpeed = chatSpeed[`${speed}`];
    const timer = Math.random() * selectedSpeed[0] + selectedSpeed[[1]];
    timeOut.current = setTimeout(() => {
      const newMessage = generateMessage();
      setMessage([newMessage, ...message]);
      generateData();
    }, timer);
  };
  useEffect(() => {
    generateData();
  }, [speed, message]);
  return (
    <View style={styles.container}>
      <TikTokMessage
        data={message}
        renderItemCustom={item => {
          return (
            <View style={styles.messageItem}>
              {/* Row for Avatar and Username */}
              <View style={styles.userRow}>
                <Image
                  source={{uri: item.item.user.avatar}}
                  style={styles.avatar}
                />
                <Text style={styles.username}>{item.item.user.name}</Text>
              </View>
              {/* Message Content */}
              <Text style={styles.messageContent}>{item.item.content}</Text>
            </View>
          );
        }}
      />
      <View style={styles.controlContainer}>
        {Object.keys(chatSpeed).map((item, index) => {
          return (
            <TouchableOpacity
              key={index.toString()}
              style={[
                styles.controlItem,
                item === speed ? styles.activeItem : 'null',
              ]}
              onPress={() => setPeed(`${item}`)}>
              <Text style={styles.controlItemText}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  messageItem: {
    marginBottom: 15,
    padding: 10,
    width: '100%',
    paddingLeft: 30,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageContent: {
    fontSize: 14,
    width: '100%',
    padding: 15,
    color: 'black',
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  controlContainer: {
    width: '90%',
    position: 'absolute',
    zIndex: 1,
    bottom: 50,
    left: 30,
    backgroundColor: 'white',
    borderRadius: 50,
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 10,
  },
  controlItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
  },
  controlItemText: {
    textAlign: 'center',
    fontSize: 16,
  },
  activeItem: {
    backgroundColor: '#ccc',
    borderRadius: 50,
  },
});
