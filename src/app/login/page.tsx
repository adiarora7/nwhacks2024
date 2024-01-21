'use client'
import React from 'react';
import { useState } from 'react';
import styles from '../page.module.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '../../../firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';
import { getRealtimeData } from '../firestoreService';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const createQueryString = (name: any, value: any) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Handle successful authentication here
        const curr = result.user;
        const username = curr.uid;
        setUser(username ? username : '');
        // query db for user with username
        getRealtimeData("users").then(data => {
          let userExists = false;
          for (const [key, value] of Object.entries(data)) {
            if (key == username) {
              userExists = true;
            };
          }
          if (userExists) {
            router.push("/homepage" + "?" + createQueryString("user", username));
          } else {
            router.push("/form" + "?" + createQueryString("user", username));
          }
        });
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };

  const signOutUser = () => {
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

    return (
      <main className={styles.main}>
        <p className={styles.tagline}>Accessible indoor maps for all.</p>
        <div className={styles.body}>
        <img className={styles.img} src="https://imgur.com/0W2V0Ni.png"/>
          {/* <div className={styles.logo}>
              <img className={styles.img} src="https://imgur.com/0W2V0Ni.png"/>
              <p className={styles.logoText}>mapcessibility</p>
          </div> */}
          <p className={styles.text}>Create an account</p>
          <div className={styles.buttons}>
            <button onClick={signInWithGoogle} className={styles.signin_button} type="submit">
              <img className={styles.google} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="google logo" />
              Login/Sign-Up With Google
            </button>
          </div>
        </div>
    </main>
  );
}
