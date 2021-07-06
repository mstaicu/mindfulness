import React from 'react';
import { Pressable } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen, ConfigScreen } from './screens';
import { HomeIcon, ConfigIcon } from './components';

import { useAppState } from './context';

const Tab = createBottomTabNavigator();

const App = () => {
  const [{ active }] = useAppState();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          showLabel: false,
          style: {
            height: 72,
            backgroundColor: '#fcf8f3',
            borderTopColor: 'transparent',
            /**
             * Elevation removes the top border / shadow of the bottom tab navigator on Android
             */
            elevation: 0,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ size }) => (
              <HomeIcon
                fill={active ? '#698474' : '#ffd3b6'}
                width={size * 1.5}
                height={size * 1.5}
              />
            ),
            tabBarButton: (props) => <Pressable {...props} />,
          }}
        />
        <Tab.Screen
          name="Config"
          component={ConfigScreen}
          options={{
            tabBarIcon: ({ size }) => (
              <ConfigIcon
                fill={active ? '#698474' : '#ffd3b6'}
                width={size * 1.5}
                height={size * 1.5}
              />
            ),
            tabBarButton: (props) => <Pressable {...props} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
