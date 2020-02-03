import React from 'react';

import { NavigationNativeContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/Home';
import ConfigScreen from './screens/Config';

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default () => (
  <NavigationNativeContainer
  // screenOptions={({ route }) => ({
  //   tabBarIcon: ({ focused, color, size }) => {
  //     let iconName;

  //     if (route.name === 'Home') {
  //       iconName = focused
  //         ? 'ios-information-circle'
  //         : 'ios-information-circle-outline';
  //     } else if (route.name === 'Settings') {
  //       iconName = focused ? 'ios-list-box' : 'ios-list';
  //     }

  //     // You can return any component that you like here!
  //     return <Ionicons name={iconName} size={size} color={color} />;
  //   },
  // })}
  // tabBarOptions={{
  //   activeTintColor: 'tomato',
  //   inactiveTintColor: 'gray',
  // }}
  >
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Config" component={ConfigScreen} />
    </Tab.Navigator>
  </NavigationNativeContainer>
);
