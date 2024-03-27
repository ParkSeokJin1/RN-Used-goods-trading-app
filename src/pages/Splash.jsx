import React, {useEffect, useState} from 'react';
import {View, Text, Linking, Platform} from 'react-native';

const Splash = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainTab');
    }, 2000);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;
