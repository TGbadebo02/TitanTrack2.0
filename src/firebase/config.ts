import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

export const auth = getAuth(app);
export const db = getFirestore(app);
