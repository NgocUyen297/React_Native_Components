import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Dimensions, useWindowDimensions} from 'react-native';

// React Hook được gọi đầu component và component phải sử dụng dưới dạng <Componnent />
// Chứ không phải function dạng component()
const ReactHook = ({someProp}) => {
  useEffect(() => {
    console.log('useEffect chạy');
    // Cleanup function - sẽ được gọi khi component unmount hoặc dependencies thay đổi
    return () => {
      console.log('Cleanup function được gọi');
      // Dọn dẹp, hủy bỏ các tác vụ phụ
      // connection.disconnect();
      // Called when component unmounted
    };
  }, [someProp]); // Mảng dependencies
  // useEffect called [someProp] run when the someProp change value.
  //[] useEffect called only in the first time the component mounted.
  // If there is no array the useEffect is called every time the component reload.
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
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

export default ReactHook;
