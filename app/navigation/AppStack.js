import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MainMenuScreen from '../screens/MainMenuScreen';
import ProfileScreen from '../screens/ProfileScreen';

const RootStack = createStackNavigator();

export default function AppStack() {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Self Quest" component={MainMenuScreen} />
      <RootStack.Screen name="Profile" component={ProfileScreen} />
    </RootStack.Navigator>
  );
}
