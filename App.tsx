import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import AuthenticatedNavigator from './src/navigation/AuthenticatedNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

import {
  initialUserInfo,
  UserContext,
  UserProvider,
} from './src/context/UserOnboardingContext';
import { auth } from './src/firebase/config';
import { getUserProfile } from './src/firebase/userService';



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
      {isAuthenticated ? <AuthenticatedNavigator/> : <AuthNavigator/>}
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
});
