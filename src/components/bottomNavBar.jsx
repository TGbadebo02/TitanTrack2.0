import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from "@react-navigation/native";
import profileScreen from "../screens/profileScreen";
import homeScreen from "../screens/homeScreen";
import reportScreen from "../screens/reportScreen";

const Tab = createBottomTabNavigator();


const bottomNavbar = () => {
<NavigationContainer>
    <Tab.Navigator  
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            const icons = {
              Home: focused ? 'home' : 'home-outline',
              Profile: focused ? 'person' : 'person-outline',
              Report: focused ? 'stats-chart' : 'stats-chart-outline', 
            };
            //let iconName;

            // if (route.name === 'Home') {
            //   iconName = 'home-outline';
            // } else if (route.name === 'Profile') {
            //   iconName = 'person-outline';
            // }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4ade80',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
      <Tab.Screen name ="Home" component = {homeScreen}/>
      <Tab.Screen name ="Profile" component = {profileScreen}/>
      <Tab.Screen name = "Report" component ={reportScreen}/>
    </Tab.Navigator>
</NavigationContainer>

}


export default bottomNavbar;

const styles = StyleSheet.create({

});