import React from 'react';
import { Text, View, Button } from 'react-native';

import { useConfig } from '../config/ConfigProvider';

export default ({ navigation }) => {
  const [config, setConfig] = useConfig();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Config Screen</Text>
      <Button
        title="Save and go home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};
