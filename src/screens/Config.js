import React from 'react';

import {
  Text,
  View,
  Button
} from 'react-native';

export default ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Config Screen</Text>
    <Button
      title="Save and go home"
      onPress={() => navigation.navigate('Home')}
    />
  </View>
);