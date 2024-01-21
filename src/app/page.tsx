'use client'
import React from 'react';
import { useState } from 'react';
import styles from './page.module.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '../../firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';
import { getRealtimeData } from './firestoreService';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


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

    return (
      <main className={styles.main}>
            <img className={styles.img} src="https://imgur.com/0W2V0Ni.png"/>
        <div className={styles.ocean}>
          <div className={styles.wave}></div>
          <div className={`${styles.wave} ${styles.wave2}`}></div>
        </div>
        <p className={styles.tagline}>Accessible indoor maps for all.</p>
        <p>Powered by Mappedin</p>
          <Card className={styles.body}>
            <CardHeader>
              <CardTitle>Start navigating</CardTitle>
              <CardDescription>Sign-Up or Login</CardDescription>
            </CardHeader>
            <button onClick={signInWithGoogle} className={styles.signin_button}>
                      <img className={styles.google} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="google logo" />
                      Login/Sign-Up with Google
                      </button>
          </Card>
    </main>
  );
}
