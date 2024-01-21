"use client";

import React, { useState } from 'react';
import styles from '../page.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { saveDashboardData } from '../firestoreService';

export default function Form({ }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const username = searchParams.get("user");
  console.log('adsadadsadd' + username);

  const [mobility, setMobility] = useState(false);
  const [vision, setVision] = useState(false);
  const [hearing, setHearing] = useState(false);

  const onMobilityChange = (e: any) => {
    setMobility(e.target.checked);
    console.log(!mobility);
  }

  const onHearingChange = (e: any) => {
    setHearing(e.target.checked);
  }

  const onVisionChange = (e: any) => {
    setVision(e.target.checked);
  }

  const data = {
    mobility: mobility, 
    vision: vision, 
    hearing: hearing 
  }
  

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const success = await saveDashboardData(`users/${username}`, data);
    if (success) {
      console.log("success");
      router.push("/homepage");
    } else {
      console.log("failure");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.ocean}>
          <div className={styles.wave}></div>
          <div className={`${styles.wave} ${styles.wave2}`}></div>
      </div>
      <p className={styles.tagline}>Accessible indoor maps for all.</p>
      <div className={styles.question_body}>
        <img className={styles.img} src="https://imgur.com/0W2V0Ni.png"/>
        <p className={styles.question}>Do you have any accessibility needs that we should consider when generating your routes?</p>
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.checkbox}>
            <input
              className={styles.input}
              type="checkbox"
              id="mobility"
              checked={mobility}
              onChange={onMobilityChange}
            />
            <label htmlFor="mobility" className={styles.options}>Mobility Impairment (ex. use of wheelchair)</label>
          </div>
          <div className={styles.checkbox}>
            <input
              className={styles.input}
              type="checkbox"
              id="hearing"
              checked={hearing}
              onChange={onHearingChange}
            />
            <label htmlFor="mobility" className={styles.options}>Hearing Impairment (e.g., deafness or hard of hearing)</label>
          </div>
          <div className={styles.checkbox}>
            <input
              className={styles.input}
              type="checkbox"
              id="vision"
              checked={vision}
              onChange={onVisionChange}
            />
            <label htmlFor="mobility" className={styles.options}>Visual Impairment (e.g., blindness or low vision)</label>
          </div>
          <button className={styles.button} type="submit">Create Account</button>
        </form>
        </div>
    </main>
  );
}
