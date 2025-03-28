import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from "./src/screens/IntroScreen";
import AdvertPage1 from "./src/screens/advertPage1";
import AdvertPage2 from './src/screens/advertPage2';
import AbtYourself from './src/screens/aboutYourself';

const Stack = createNativeStackNavigator();


export default function App() {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="IntroScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="IntroScreen" component={IntroScreen} />
          <Stack.Screen name="AdvertisingPage" component={AdvertPage1} />
          <Stack.Screen name="AdvertisingPage2" component={AdvertPage2}/>
          <Stack.Screen name="AbtYourself" component={AbtYourself}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }