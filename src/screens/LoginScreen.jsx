import React, { useEffect } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground,} from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Backbutton from '../components/backButton';
import { auth } from '../firebase/config';

const LoginScreen = ({navigation}) => {
  useEffect(()=> {
    console.log("Firebase Auth Ready:", auth);
  },[]);
  
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ImageBackground
          source={require('/Users/tgbadebo02/Desktop/TitanTrack2.0/src/assets/images/Login.png')}
          style={styles.imageBackground}
        >
          {/* Top nav */}
          <Backbutton 
          onPress={() => navigation.navigate('FitnsScreen')} 
          style={{ 
            top: 40, 
            left: 20}}
          />

          <View style={styles.topRow}>
            <Text style={styles.link}>Login</Text>
            <Text style={styles.link} onPress={() => navigation.navigate('SignupScreen')}>
             Sign up
            </Text>
          </View>

          {/* Welcome text */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcome}>Welcome back,</Text>
            <Text style={styles.username}>[Username]</Text>
          </View>
        </ImageBackground>

        {/* Slanted Form Panel */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="email"
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            placeholderTextColor="#ccc"
            secureTextEntry
          />

          <View style={{ transform: [{ skewY: '5deg' }] }}>
            <TouchableOpacity>
              <Text style={styles.forgot}>forgot password?</Text>
            </TouchableOpacity>
          </View>


          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.socialIcons}>
            <AntDesign name="google" size={28} color="white" style={styles.icon} />
            <Ionicons name="logo-apple" size={28} color="white" style={styles.icon} />
            <FontAwesome name="facebook" size={28} color="white" style={styles.icon} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  container: {
    flex: 1,
  },
  imageBackground: {
    height: '90%',
    width: '100%',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  topRow: {
    position: 'absolute',
    top: 55,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 25,
  },
  link: {
    fontSize: 16,
    color: '#fff',
  },
  signUp: {
    textDecorationLine: 'underline',
    color: '#4ade80',
  },
  welcomeContainer: {
    paddingLeft: 30,
    marginBottom: 300,
  },
  welcome: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '400',
  },
  username: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#2e2e2e',
    transform: [{ skewY: '-6deg' }],
    paddingHorizontal: 35,
    paddingTop: -10,
    paddingBottom: 40,
    justifyContent: 'center',
    marginTop:-300,
  },
  input: {
    backgroundColor: '#444',
    marginBottom: 12,
    padding: 15,
    borderRadius: 10,
    color: '#fff',
    transform: [{ skewY: '4deg' }],
  },
  forgot: {
    color: '#4ade80',
    marginBottom: 20,
    paddingLeft: 8,
  },
  loginButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    transform: [{ skewY: '4deg' }],
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    transform: [{ skewY: '4deg' }],
  },
  icon: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 40,
  },
});
