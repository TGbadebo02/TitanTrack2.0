import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './src/context/UserOnboardingContext';
import IntroScreen from "./src/screens/IntroScreen";
import AdvertPage1 from "./src/screens/advertPage1";
import AdvertPage2 from './src/screens/advertPage2';
import AbtYourself from './src/screens/aboutYourself';
import reportScreen from './src/screens/reportScreen';
import AgeScreen   from './src/screens/AgeScreen';
import WeightScreen from './src/screens/weightScreen';
import fitnessScrn from './src/screens/fitnessLvl';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import goalScreen from './src/screens/goalScreen';
import profileScreen from './src/screens/profileScreen';
import homeScreen from './src/screens/homeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabIcons = {
  Home: require('./src/assets/icons/Home.png'),
  Profile: require('./src/assets/icons/Profile.png'),
  Report: require('./src/assets/icons/Bar Chart.png'),
};

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => (
          <Image
            source={tabIcons[route.name]}
            style={[styles.tabIcon, !focused && styles.tabIconInactive]}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={homeScreen} />
      <Tab.Screen name="Profile" component={profileScreen} />
      <Tab.Screen name="Report" component={reportScreen} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="IntroScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name = "Tabs" component={Tabs} options={{headerShown:false}}/>
          <Stack.Screen name="IntroScreen" component={IntroScreen} />
          <Stack.Screen name="AdvertisingPage" component={AdvertPage1} />
          <Stack.Screen name="AdvertisingPage2" component={AdvertPage2}/>
          <Stack.Screen name="AbtYourself" component={AbtYourself}/>
          <Stack.Screen name="AgeScreen" component={AgeScreen}/>
          <Stack.Screen name="WeightScreen" component={WeightScreen}/>
          <Stack.Screen name= "FitnsScreen" component={fitnessScrn}/>
          <Stack.Screen name= "goalScreen"  component={goalScreen}/>
          <Stack.Screen name= "LoginScreen" component={LoginScreen}/>
          <Stack.Screen name= "SignupScreen" component={SignupScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#2a2426',
    borderTopWidth: 0,
    height: 78,
    paddingTop: 12,
    paddingBottom: 12,
  },
  tabIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  tabIconInactive: {
    opacity: 0.85,
  },
});
