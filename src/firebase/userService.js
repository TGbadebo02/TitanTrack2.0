import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './config'; // Make sure you exported these from config.js

export const saveUserProfile = async (data) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('No authenticated user');
  }

  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, data, { merge: true });
};
