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
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ImageBackground
          source={require('/Users/tgbadebo02/Desktop/TitanTrack2.0/src/assets/images/Signup.png')}
          style={styles.imageBackground}
        >
          {/* Top nav */}
          <View style={styles.topRow}>
            <Text style={[styles.link, styles.login]}>Login</Text>
            <Text style={[styles.link]}>Sign up</Text>
          </View>

          <View style={styles.welcomeContainer}>
            <Text style={styles.welcome}>Welcome!</Text>
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
          <TextInput
            style={styles.input}
            placeholder="confirm password"
            placeholderTextColor="#ccc"
            secureTextEntry
          />

          <TouchableOpacity>
            <Text style={styles.forgot}>already have an account?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Sign up</Text>
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
    justifyContent: 'space-between',
  },
  link: {
    fontSize: 16,
    color: '#fff',
  },
  login: {
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
    transform: [{ skewY: '-5deg' }],
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
    marginBottom: 40,
    transform: [{ skewY: '4deg' }],
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
