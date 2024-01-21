'use client';
import MotionWrapper from '../components/motion';
import React, { useState, useEffect } from 'react';
import styles from '../page.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { saveDashboardData } from '../firestoreService';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Form() {
  const router = useRouter();
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      setUsername(searchParams.get('user') || '');

      const username = searchParams.get('user');
      console.log('adsadadsadd' + username);
      console.log(username);
      // Example of safely using devicePixelRatio
      const pixelRatio = window.devicePixelRatio;
      console.log('Device Pixel Ratio:', pixelRatio);
    }
  }, []);

  const [mobility, setMobility] = useState(false);
  const [vision, setVision] = useState(false);
  const [hearing, setHearing] = useState(false);

  const onMobilityChange = (e: any) => {
    setMobility(e.target.checked);
    console.log(!mobility);
  };

  const onHearingChange = (e: any) => {
    setHearing(e.target.checked);
  };

  const onVisionChange = (e: any) => {
    setVision(e.target.checked);
  };

  const data = {
    mobility: mobility,
    vision: vision,
    hearing: hearing,
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const success = await saveDashboardData(`users/${username}`, data);
    if (success) {
      console.log('success');
      router.push('/homepage');
    } else {
      console.log('failure');
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.ocean}>
        <div className={styles.wave}></div>
        <div className={`${styles.wave} ${styles.wave2}`}></div>
      </div>
      <p className={styles.tagline}>Welcome to Mapcessibility.</p>
      <MotionWrapper>
        <Card className={styles.question_body}>
          <CardHeader>
            <CardTitle className={styles.cardtitle}>
              What accessibility needs should we consider when generating your
              routes?
            </CardTitle>
            <CardDescription className={styles.cardsub}>
              Select each of the following that apply:
            </CardDescription>
            <CardContent className={styles.cardcontent}>
              <form onSubmit={onSubmit} className={styles.form}>
                <div className={styles.checkbox}>
                  <input
                    className={styles.input}
                    type='checkbox'
                    id='mobility'
                    checked={mobility}
                    onChange={onMobilityChange}
                  />
                  <label htmlFor='mobility' className={styles.options}>
                    Mobility Impairment (ex. use of wheelchair)
                  </label>
                </div>
                <div className={styles.checkbox}>
                  <input
                    className={styles.input}
                    type='checkbox'
                    id='hearing'
                    checked={hearing}
                    onChange={onHearingChange}
                  />
                  <label htmlFor='hearing' className={styles.options}>
                    Hearing Impairment (e.g., deafness or hard of hearing)
                  </label>
                </div>
                <div className={styles.checkbox}>
                  <input
                    className={styles.input}
                    type='checkbox'
                    id='vision'
                    checked={vision}
                    onChange={onVisionChange}
                  />
                  <label htmlFor='visual' className={styles.options}>
                    Visual Impairment (e.g., blindness or low vision)
                  </label>
                </div>
                <button className={styles.button} type='submit'>
                  Create Account
                </button>
              </form>
            </CardContent>
          </CardHeader>
        </Card>
      </MotionWrapper>
    </main>
  );
}
