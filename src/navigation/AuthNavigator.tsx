import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IntroScreen from '../screens/IntroScreen';
import AdvertPage1 from '../screens/advertPage1';
import AdvertPage2 from '../screens/advertPage2';
import AboutYourself from '../screens/aboutYourself';
import AgeScreen from '../screens/AgeScreen';
import WeightScreen from '../screens/weightScreen';
import FitnessLevelScreen from '../screens/fitnessLvl';
import GoalScreen from '../screens/GoalScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="IntroScreen" component={IntroScreen} />
      <Stack.Screen name="AdvertisingPage" component={AdvertPage1} />
      <Stack.Screen name="AdvertisingPage2" component={AdvertPage2} />
      <Stack.Screen name="AbtYourself" component={AboutYourself} />
      <Stack.Screen name="AgeScreen" component={AgeScreen} />
      <Stack.Screen name="WeightScreen" component={WeightScreen} />
      <Stack.Screen
        name="FitnessLevelScreen"
        component={FitnessLevelScreen}
      />
      <Stack.Screen name="GoalScreen" component={GoalScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  );
}
