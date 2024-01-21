import React from 'react';
import styles from '../page.module.css';

export default function Login() {
    return (
      <main className={styles.main}>
        <p className={styles.tagline}>Accessible indoor maps for all.</p>
        <div className={styles.body}>
          <div className={styles.logo}>
              <img className={styles.img} src="https://imgur.com/0W2V0Ni.png"/>
              <p className={styles.logoText}>mapcessibility</p>
          </div>
          <p className={styles.text}>Create an account</p>
          <button className={styles.button}
            type="submit"
          >
          Sign Up With Google
          </button>
        </div>
    </main>
  );
}
