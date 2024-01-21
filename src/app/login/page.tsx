import React from 'react';
import styles from '../page.module.css';
export default function Login() {
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
            <button className={styles.signin_button} type="submit">
              <img className={styles.google} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="google logo" />
              Sign Up With Google
            </button>
            <button className={styles.signin_button} type="submit"> 
              <img className={styles.apple} src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/647px-Apple_logo_black.svg.png" alt="apple logo" />
              Sign Up With Apple
            </button>
          </div>
          <p className={styles.subtext}>Already have an account? <a href="/login" className={styles.link}>Log in</a></p>
        </div>
    </main>
  );
}
