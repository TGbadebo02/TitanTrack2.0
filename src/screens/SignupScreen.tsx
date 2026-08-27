import React, { useContext, useState } from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation, type NavigationProp, type ParamListBase } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { isOnboardingComplete, UserContext } from '../context/UserOnboardingContext';
import { auth } from '../firebase/config';
import { saveUserProfile } from '../firebase/userService';
import { getAuthErrorMessage } from '../firebase/authErrors';

const signupSchema = z
  .object({
    email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userInfo } = useContext(UserContext);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const handleSignup = async ({ email, password }: SignupFormValues) => {
    if (!isOnboardingComplete(userInfo)) {
      Alert.alert(
        'Finish your fitness profile',
        'Please answer each onboarding question before creating your account.',
        [{ text: 'Continue onboarding', onPress: () => navigation.navigate('AbtYourself') }]
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const normalizedEmail = email.trim().toLowerCase();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        normalizedEmail,
        password
      );
      console.log('User registered:', userCredential.user.email);
      const user = userCredential.user;

      await saveUserProfile({
        ...userInfo,
        email: user.email ?? normalizedEmail,
        createdAt: new Date(),
      });

      Alert.alert('Welcome to TitanTrack', 'Your account and fitness profile are ready.');
    } catch (error) {
      Alert.alert('Sign up failed', getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/Signup.png')}
          style={styles.imageBackground}
        >
          <View style={styles.topRow}>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={[styles.link, styles.login]}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.link}>Sign up</Text>
          </View>

          <View style={styles.welcomeContainer}>
            <Text style={styles.welcome}>Welcome!</Text>
          </View>
        </ImageBackground>

        <View style={styles.formContainer}>
          {(['email', 'password', 'confirmPassword'] as const).map((name) => (
            <View key={name}>
              <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder={name === 'confirmPassword' ? 'confirm password' : name}
                    placeholderTextColor="#ccc"
                    style={[styles.input, errors[name] && styles.inputError]}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize={name === 'email' ? 'none' : undefined}
                    keyboardType={name === 'email' ? 'email-address' : 'default'}
                    secureTextEntry={name !== 'email'}
                    editable={!isSubmitting}
                  />
                )}
              />
              {errors[name] && <Text style={styles.errorText}>{errors[name]?.message}</Text>}
            </View>
          ))}

          <View style={{ transform: [{ skewY: '5deg' }] }}>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.forgot}>already have an account?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, isSubmitting && styles.loginButtonDisabled]}
            onPress={handleSubmit(handleSignup)}
            disabled={isSubmitting}
          >
            <Text style={styles.loginText}>{isSubmitting ? 'Creating account...' : 'Sign up'}</Text>
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
    gap: 36,
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
    marginTop: -320,
  },
  input: {
    backgroundColor: '#444',
    marginBottom: 13,
    padding: 15,
    borderRadius: 10,
    color: '#fff',
    transform: [{ skewY: '4deg' }],
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#f87171',
  },
  errorText: {
    color: '#fca5a5',
    fontSize: 13,
    marginTop: -7,
    marginBottom: 10,
    paddingLeft: 6,
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
  loginButtonDisabled: {
    opacity: 0.7,
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
