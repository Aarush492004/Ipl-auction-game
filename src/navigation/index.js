import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import SignInscreen from '../screens/SignInscreen';
import SignUpscreen from '../screens/SignUpscreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import MultiPlayerScreen from '../screens/MultiplayerScreen/MultiPlayerScreen';
import Tutorialscreen from '../screens/TutorialScreen/Tutorialscreen';
import EightPlayerMode from '../screens/TutorialScreen/EightPlayerMode';
import FourPlayerMode from '../screens/TutorialScreen/FourPlayerMode';

const Stack = createNativeStackNavigator();

// Auth Stack for SignIn, SignUp, ForgotPassword
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignInscreen} />
    <Stack.Screen name="SignUp" component={SignUpscreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

// App Stack for HomeScreen and MultiplayerScreen
const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} /> 
    <Stack.Screen name="MultiPlayerScreen" component={MultiPlayerScreen}/>
    <Stack.Screen name="Tutorialscreen" component={Tutorialscreen} />
    <Stack.Screen name="EightPlayerMode" component={EightPlayerMode} />
  </Stack.Navigator>
);

const Navigation = () => {
  const [user, setUser] = useState(undefined);

  const checkUser = async () => {
    try {
      const authUser = auth().currentUser;
      if (authUser && authUser.emailVerified) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    } catch (e) {
      console.log('Failed to fetch auth user:', e);
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();

    const subscriber = auth().onAuthStateChanged(authUser => {
      if (authUser && authUser.emailVerified) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => subscriber(); // Unsubscribe on unmount
  }, []);

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;