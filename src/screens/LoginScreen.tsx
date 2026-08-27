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
import {
  type NavigationProp,
  type ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import BackButton from '../components/backButton';
import { UserContext } from '../context/UserOnboardingContext';
import { auth } from '../firebase/config';
import { getUserProfile } from '../firebase/userService';
import { getAuthErrorMessage } from '../firebase/authErrors';
//zod defining the valid data form.
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const { setUserInfo } = useContext(UserContext);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async ({ email, password }: LoginFormValues) => {
    try {
      const normalizedEmail = email.trim().toLowerCase();

      setIsSubmitting(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        normalizedEmail,
        password
      );
      const savedProfile = await getUserProfile();

      setUserInfo((prev) => ({
        ...prev,
        ...savedProfile,
        email: userCredential.user.email ?? normalizedEmail,
      }));

      Alert.alert('Success', 'Welcome back!');
    } catch (error) {
      Alert.alert('Login failed', getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    const parsedEmail = z.string().email().safeParse(resetEmail.trim().toLowerCase());

    if (!parsedEmail.success) {
      Alert.alert('Enter your email', 'Type your account email above, then try again.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, parsedEmail.data);
      Alert.alert('Check your inbox', 'We sent you a link to reset your password.');
    } catch (error) {
      Alert.alert('Reset failed', getAuthErrorMessage(error));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/Login.png')}
          style={styles.imageBackground}
        >
          <BackButton
            onPress={() => navigation.goBack()}
            style={{
              top: 40,
              left: 20,
            }}
          />

          <View style={styles.topRow}>
            <Text style={styles.link}>Login</Text>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('AbtYourself')}
            >
              Sign up
            </Text>
          </View>

          <View style={styles.welcomeContainer}>
            <Text style={styles.welcome}>Welcome back,</Text>
            <Text style={styles.username}>Athlete</Text>
          </View>
        </ImageBackground>

        <View style={styles.formContainer}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="email"
                placeholderTextColor="#ccc"
                autoCapitalize="none"
                keyboardType="email-address"
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  setResetEmail(text);
                }}
                onBlur={onBlur}
                editable={!isSubmitting}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="password"
                placeholderTextColor="#ccc"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                editable={!isSubmitting}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}

          <View style={{ transform: [{ skewY: '5deg' }] }}>
            <TouchableOpacity onPress={handleForgotPassword} disabled={isSubmitting}>
              <Text style={styles.forgot}>forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, isSubmitting && styles.loginButtonDisabled]}
            onPress={handleSubmit(handleLogin)}
            disabled={isSubmitting}
          >
            <Text style={styles.loginText}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Text>
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
    marginTop: -300,
  },
  input: {
    backgroundColor: '#444',
    marginBottom: 12,
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
    marginTop: -4,
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
