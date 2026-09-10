import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WorkoutScreen from '../screens/workoutScreen';
import MainTabs from './MainTabs';
import type { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AuthenticatedNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={MainTabs} />
      <Stack.Screen
        name="WorkoutScreen"
        component={WorkoutScreen}
      />
    </Stack.Navigator>
  );
}