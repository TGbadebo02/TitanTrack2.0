import { FirebaseError } from 'firebase/app';

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/email-already-in-use': 'An account already exists for this email.',
  'auth/invalid-credential': 'The email or password is incorrect.',
  'auth/invalid-email': 'Enter a valid email address.',
  'auth/network-request-failed':
    'We could not connect. Check your internet connection and try again.',
  'auth/too-many-requests': 'Too many attempts. Please wait and try again.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'No account was found for this email.',
  'auth/weak-password': 'Choose a stronger password with at least 8 characters.',
  'auth/wrong-password': 'The email or password is incorrect.',
};

export const getAuthErrorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    return AUTH_ERROR_MESSAGES[error.code] ?? 'Authentication failed. Please try again.';
  }

  return error instanceof Error ? error.message : 'Something went wrong. Please try again.';
};
