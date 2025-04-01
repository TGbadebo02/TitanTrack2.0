import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('/Users/tgbadebo02/Desktop/TitanTrack2.0/src/assets/images/Login.png')} // 👈 Replace with your actual path
        style={styles.imageBackground}
      >
    
        <View style={styles.topRow}>
          <Text style={styles.link}>Login</Text>
          <Text style={[styles.link, styles.signUp]}>Sign up</Text>
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcome}>Welcome back,</Text>
          <Text style={styles.username}>[Username]</Text>
        </View>
      </ImageBackground>

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

        <TouchableOpacity>
          <Text style={styles.forgot}>forgot password?</Text>
        </TouchableOpacity>

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
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  imageBackground: {
    height: '90%',
    width: '100%',
    justifyContent: 'flex-end',
    marginTop:30,
  },
  topRow: {
    position: 'absolute',
    top: 55,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginBottom: 350,
  },
  welcome: {
    fontSize: 40,
    color: '#fff',
    fontWeight: '400',
  },
  username: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#2e2e2e',
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 25,
    transform: [{ skewY: '-4deg' }],
    paddingLeft: 10,
    marginTop: -340,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#444',
    marginBottom: 15,
    padding: 14,
    borderRadius: 10,
    color: '#fff',
    transform: [{ skewY: '3deg' }],
  },
  forgot: {
    color: '#4ade80',
    marginBottom: 20,
    transform: [{ skewY: '3deg' }],
  },
  loginButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
    transform: [{ skewY: '3deg' }],
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    transform: [{ skewY: '3deg' }],
  },
  icon: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 40,
  },
});
