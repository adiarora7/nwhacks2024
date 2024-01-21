import React from 'react';
import styles from '../page.module.css';
export default function Settings() {
    return (
      <main className={styles.main}>
        <div className={styles.body}>
        <img className={styles.img} src="https://imgur.com/0W2V0Ni.png"/>
          <p className={styles.settings_text}>User Settings</p>
        </div>
    </main>
  );
}
