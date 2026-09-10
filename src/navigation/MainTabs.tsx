import React from 'react';
import {
  Image,
  type ImageSourcePropType,
  StyleSheet,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/homeScreen';
import ProfileScreen from '../screens/profileScreen';
import ReportScreen from '../screens/reportScreen';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const tabIcons: Record<keyof MainTabParamList, ImageSourcePropType> = {
  Home: require('../assets/icons/Home.png'),
  Profile: require('../assets/icons/Profile.png'),
  Report: require('../assets/icons/Bar Chart.png'),
};

export default function MainTabs() {
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Report" component={ReportScreen} />
    </Tab.Navigator>
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