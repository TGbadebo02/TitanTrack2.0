import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { initializeAuth, type Persistence } from 'firebase/auth';
import * as FirebaseAuth from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyAPgBN-E74IdmT1s8f_m-Bc4UIWumIXXh8',
  authDomain: 'titantrack-9053e.firebaseapp.com',
  projectId: 'titantrack-9053e',
  storageBucket: 'titantrack-9053e.firebasestorage.app',
  messagingSenderId: '474615318991',
  appId: '1:474615318991:web:57495454b88276f9eb6aba',
  measurementId: 'G-GDXK06ZETL',
};

const app = initializeApp(firebaseConfig);

// Metro loads Firebase's React Native entry point, which includes this helper.
// Firebase's default TypeScript declaration currently omits it.
const getReactNativePersistence = (
  FirebaseAuth as typeof FirebaseAuth & {
    getReactNativePersistence: (storage: typeof AsyncStorage) => Persistence;
  }
).getReactNativePersistence;

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
