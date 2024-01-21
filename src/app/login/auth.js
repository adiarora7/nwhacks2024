// auth.js
import { auth, provider } from '../../../firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // Handle successful authentication here
      const user = result.user;
      console.log('User signed in:', user);
    })
    .catch((error) => {
      // Handle errors here
      console.error(error);
    });
};

export const signOutUser = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('User signed out');
    })
    .catch((error) => {
      // An error happened.
      console.error(error);
    });
};
