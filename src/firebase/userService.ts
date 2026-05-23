import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './config';
import type { UserInfo } from '../context/UserOnboardingContext';

export type UserProfileData = Partial<UserInfo> & {
  createdAt?: Date;
};

export const saveUserProfile = async (
  data: UserProfileData
): Promise<void> => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('No authenticated user');
  }

  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, data, { merge: true });
};

export const getUserProfile = async (): Promise<UserProfileData | null> => {
  const user = auth.currentUser;
 //if the user doesn't exist.. return error.
  if (!user) {
    throw new Error('No authenticated user');
  }
  
  //else.. fetch the user data from the database.
  const userRef = doc(db, 'users', user.uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    return null;
  }

  return userSnapshot.data() as UserProfileData;
};
