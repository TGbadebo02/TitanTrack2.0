import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';

import {
  initialUserInfo,
  UserContext,
  UserProvider,
} from './src/context/UserOnboardingContext';
import { auth } from './src/firebase/config';
import { getUserProfile } from './src/firebase/userService';
import IntroScreen from './src/screens/IntroScreen';
import AdvertPage1 from './src/screens/advertPage1';
import AdvertPage2 from './src/screens/advertPage2';
import AbtYourself from './src/screens/aboutYourself';
import reportScreen from './src/screens/reportScreen';
import AgeScreen from './src/screens/AgeScreen';
import WeightScreen from './src/screens/weightScreen';
import fitnessScrn from './src/screens/fitnessLvl';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import GoalScreen from './src/screens/GoalScreen';
import profileScreen from './src/screens/profileScreen';
import homeScreen from './src/screens/homeScreen';
import WorkoutScreen from './src/screens/workoutScreen';

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
            source={tabIcons[route.name as keyof typeof tabIcons]}
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

function AppNavigator() {
  const { setUserInfo } = useContext(UserContext);
  const [authIsReady, setAuthIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          setUserInfo(initialUserInfo);
          setIsAuthenticated(false);
          setAuthIsReady(true);
          return;
        }
       //if user is logged in, retrieve the data on the user,=.
        const savedProfile = await getUserProfile();
       //merge the data into usercontext.
        setUserInfo({
          ...initialUserInfo,
          ...savedProfile,
          email: user.email ?? initialUserInfo.email,
        });
        setIsAuthenticated(true);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unable to restore session.';

        console.error('Auth Bootstrap Error:', message);
        setUserInfo({
          ...initialUserInfo,
          email: user?.email ?? initialUserInfo.email,
        });
        setIsAuthenticated(!!user);
      } finally {
        setAuthIsReady(true);
      }
    });

    return unsubscribe;
  }, [setUserInfo]);
  //show the loading screen, while data of user is being retrieved.
  if (!authIsReady) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={styles.loadingText}>Restoring your session...</Text>
      </View>
    );
  }
      
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="IntroScreen" component={IntroScreen} />
            <Stack.Screen name="AdvertisingPage" component={AdvertPage1} />
            <Stack.Screen name="AdvertisingPage2" component={AdvertPage2} />
            <Stack.Screen name="AbtYourself" component={AbtYourself} />
            <Stack.Screen name="AgeScreen" component={AgeScreen} />
            <Stack.Screen name="WeightScreen" component={WeightScreen} />
            <Stack.Screen name="FitnessLevelScreen" component={fitnessScrn} />
            <Stack.Screen name="GoalScreen" component={GoalScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: '#111118',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#f4f4f4',
    fontSize: 16,
    marginTop: 16,
  },
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
