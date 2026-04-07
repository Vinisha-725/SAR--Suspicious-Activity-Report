"use client";

import React, { useState } from 'react';
import styles from './page.module.css';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    mfaCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login handle
    console.log('Login attempt:', formData);
  };

  return (
    <div className={styles.container}>
      {/* Background Visuals */}
      <div className={styles.backgroundGrid}></div>
      <div className={styles.backgroundGlow}></div>

      <div className={styles.contentWrapper}>
        <div className={styles.card}>
          <div className={styles.logoArea}>
            <div className={styles.shieldIcon}>
              <div className={styles.innerShield}></div>
            </div>
            <div>
              <div className={styles.brandName}>SAR System</div>
              <div className={styles.brandSubName}>Compliance Platform</div>
            </div>
          </div>

          <h1 className={styles.title}>Secure Sign In</h1>
          <p className={styles.subtitle}>Enter your credentials to access the platform</p>

          <form onSubmit={handleSubmit} className={styles.formArea}>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>Corporate Email / Username</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  className={styles.input}
                  placeholder="Enter your email"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className={styles.input}
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="mfaCode" className={styles.label}>MFA Token (6-digit)</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  id="mfaCode"
                  name="mfaCode"
                  required
                  className={styles.input}
                  placeholder="123456"
                  pattern="\d{6}"
                  maxLength="6"
                  value={formData.mfaCode}
                  onChange={handleChange}
                  autoComplete="one-time-code"
                />
              </div>
            </div>

            <div className={styles.optionsRow}>
              <label className={styles.checkboxContainer}>
                <input type="checkbox" className={styles.checkbox} />
                Remember this device
              </label>
              <a href="#" className={styles.link}>Forgot Password?</a>
            </div>

            <button type="submit" className={styles.button}>
              Authenticate Session
            </button>
          </form>
        </div>

        <div className={styles.disclaimerArea}>
          <p className={styles.disclaimer}>
            <strong>CONFIDENTIALITY NOTICE:</strong> This system is restricted to authorized personnel only. 
            All activities on this platform are monitored and recorded for security and compliance purposes. 
            Unauthorized access or use may lead to disciplinary action or criminal prosecution.
          </p>
        </div>
      </div>
    </div>
  );
}
