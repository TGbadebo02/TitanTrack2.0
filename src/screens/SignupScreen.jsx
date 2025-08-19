import React, { useState,useContext } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';
import { UserContext } from '../context/UserOnboardingContext';
import { saveUserProfile } from '../firebase/userService';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import {doc,getFirestore,setDoc} from 'firebase/firestore';
import{db} from '../firebase/config';
import { auth } from '../firebase/config';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {Alert} from 'react-native';

  const SignupScreen = () => {
    const [email, setEmail] =  useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const { userInfo, setUserInfo } = useContext(UserContext);
   
  
  const handleSignup = async () => {
      try {
        
        if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter an email and password.');
      return;
    }

        if(password!== confirmPassword){
        Alert.alert('Error', 'Passwords do not match');
        return;
      }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User registered:', userCredential.user.email);
        const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        ...userInfo,  
        createdAt: new Date()
      });

        
    Alert.alert('Success', 'User created!');

   navigation.navigate('Tabs', { screen: 'Profile' });


      } catch (error) {
        console.error('Signup Error:', error.message);
        Alert.alert('Error', error.message);
      }
    };

  const navigation =useNavigation();
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ImageBackground
          source={require('/Users/tgbadebo02/Desktop/TitanTrack2.0/src/assets/images/Signup.png')}
          style={styles.imageBackground}
        >
          {/* Top nav */}
          <View style={styles.topRow}>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={[styles.link, styles.login]}>Login</Text>
            </TouchableOpacity>
            <Text style={[styles.link]}>Sign up</Text>
          </View>

          <View style={styles.welcomeContainer}>
            <Text style={styles.welcome}>Welcome!</Text>
          </View>
        </ImageBackground>

        {/* Slanted Form Panel */}
        <View style={styles.formContainer}>
       <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        />

          <TextInput
            style={styles.input}
            placeholder="password"
            placeholderTextColor="#ccc"
            secureTextEntry
            value = {password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="confirm password"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setconfirmPassword}
          />
          
          <View style={{transform: [{skewY: '5deg'}]}}>
          <TouchableOpacity onPress={()=>navigation.navigate('LoginScreen')}>
            <Text style={styles.forgot}>already have an account?</Text>
          </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
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

export default SignupScreen;

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
    gap : 36,
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
    marginBottom: 320,
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
    paddingBottom: 30,
    justifyContent: 'center',
    marginTop:-320,
  },
  input: {
    backgroundColor: '#444',
    marginBottom: 13,
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
