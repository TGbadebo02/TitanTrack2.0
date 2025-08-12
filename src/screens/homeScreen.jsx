import {View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity,} from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import todayWorkout from '../components/todayWorkout';


const homeScreen = () => {
    return(
       <ScrollView>
        <Text style={welcomeText}>Welcome back!</Text>
        <Text style={fullName}>Firstname Surname</Text>
       </ScrollView>

    );
};

export default homeScreen;

const styles = StyleSheet.create({
    
    welcomeText:{

    },

    fullName:{

    }
})