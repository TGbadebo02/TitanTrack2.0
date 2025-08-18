import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import ProfileScreen from "../screens/profileScreen";
import homeScreen from "../screens/homeScreen";
import reportScreen from "../screens/reportScreen";

const Tab = createBottomTabNavigator();


const bottomNavbar = () => {
<NavigationContainer>
    <Tab.Navigator  
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4ade80',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
      <Tab.Screen name ="Home" component = {homeScreen}/>
      <Tab.Screen name ="Profile" component = {ProfileScreen}/>
      <Tab.Screen name = "Report" component ={reportScreen}/>
    </Tab.Navigator>
</NavigationContainer>

}


export default bottomNavbar;

const styles = StyleSheet.create({

});