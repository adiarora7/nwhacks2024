// auth.js
import { auth, provider } from '../../../firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';

export const signInWithGoogle = () => {

  signInWithPopup(auth, provider)
    .then((result) => {
      // Handle successful authentication here
      const user = result.user;
      const username = user.email;
      // query db for user with username
      setUser(user.email);
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
