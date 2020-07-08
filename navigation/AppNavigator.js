import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';

const AppStack = createStackNavigator();

export default function App({ signOut }) {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home">
        {() => <Home signOut={signOut} />}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
}
