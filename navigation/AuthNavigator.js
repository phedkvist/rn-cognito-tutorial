import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/authentication/Welcome';
import SignInScreen from '../screens/authentication/SignIn';
import SignUpScreen from '../screens/authentication/SignUp';
import ForgetPasswordScreen from '../screens/authentication/ForgetPassword';
import Confirmation from '../screens/authentication/Confirmation';

const AuthStack = createStackNavigator();
const AuthModalStack = createStackNavigator();

const AuthNavigator = ({ signIn }) => (
  <AuthModalStack.Navigator mode="modal" headerMode="none">
    <AuthModalStack.Screen name="AuthPages">
      {() => (
        <AuthStack.Navigator>
          <AuthStack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
          <AuthStack.Screen name="SignUp" component={SignUpScreen} />
          <AuthStack.Screen name="SignIn">
            {({ navigation }) => <SignInScreen signIn={signIn} navigation={navigation} />}
          </AuthStack.Screen>
          <AuthStack.Screen
            name="ForgetPassword"
            component={ForgetPasswordScreen}
          />
        </AuthStack.Navigator>
      )}
    </AuthModalStack.Screen>
    <AuthModalStack.Screen options={{ headerShown: false }} name="Confirmation" component={Confirmation} />
  </AuthModalStack.Navigator>
);

export default AuthNavigator;
