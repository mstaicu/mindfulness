import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { css } from '@emotion/native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen, ConfigScreenNavigator } from './screens';
import { HomeIcon, ConfigIcon, BoldText } from './components';

const Tab = createBottomTabNavigator();

export default () => (
  <NavigationContainer>
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: () => <View></View>,
          tabBarIcon: ({ size }) => (
            <HomeIcon fill='#fab39d' width={size} height={size} />
          ),
          tabBarButton: props => <TouchableOpacity {...props} />
        }}
      />
      <Tab.Screen
        name='Config'
        component={ConfigScreenNavigator}
        options={{
          tabBarLabel: () => <View></View>,
          tabBarIcon: ({ size }) => (
            <ConfigIcon fill='#fab39d' width={size} height={size} />
          ),
          tabBarButton: props => <TouchableOpacity {...props} />
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);
