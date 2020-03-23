import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { ConfigScreenOptions } from '../ConfigScreenOptions';

const Stack = createStackNavigator();

export const ConfigScreenNavigator = () => (
  <Stack.Navigator initialRouteName='Options' headerMode='none'>
    <Stack.Screen name='Options' component={ConfigScreenOptions} />
  </Stack.Navigator>
);
