import React from 'react';
import { TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen, ConfigScreen } from './screens';
import { HomeIcon, ConfigIcon } from './components';

const Tab = createBottomTabNavigator();

export default () => (
  <NavigationContainer>
    <Tab.Navigator
      initialRouteName='Home'
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 72,
          backgroundColor: '#fcf8f3',
          borderTopColor: 'transparent',
          /**
           * Elevation removes the top border / shadow of the bottom tab navigator on Android
           */
          elevation: 0
        }
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <HomeIcon fill='#fab39d' width={size * 1.5} height={size * 1.5} />
          ),
          tabBarButton: props => <TouchableOpacity {...props} />
        }}
      />
      <Tab.Screen
        name='Config'
        component={ConfigScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <ConfigIcon fill='#fab39d' width={size * 1.5} height={size * 1.5} />
          ),
          tabBarButton: props => <TouchableOpacity {...props} />
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);
