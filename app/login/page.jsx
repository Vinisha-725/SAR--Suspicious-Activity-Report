'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import { api } from '../../lib/api';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError('');
    setLoading(true);
    try {
      const res = await api.login(form);
      localStorage.setItem('sar_token', res.token);
      router.push('/dashboard');
    } catch (e) {
      setError(e.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.leftInner}>
          <div className={styles.badge}>RESTRICTED ACCESS</div>
          <h1 className={styles.heading}>FinCEN SAR<br />Reporting Portal</h1>
          <p className={styles.sub}>
            Authorized personnel only. All access attempts are logged and monitored
            in accordance with federal regulations.
          </p>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.form}>
          <div className={styles.formHeader}>
            <div className={styles.formMark}>SAR</div>
            <div>
              <h2 className={styles.formTitle}>Sign In</h2>
              <p className={styles.formSub}>Enter your authorized credentials</p>
            </div>
          </div>

          {error && <div className={styles.errorBanner}>{error}</div>}

          <InputField
            label="Username"
            id="username"
            autoComplete="username"
            value={form.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            required
          />
          <InputField
            label="Password"
            id="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
          />

          <Button
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            onClick={handleLogin}
          >
            Sign In
          </Button>

          <p className={styles.forgot}>
            Locked out? Contact your system administrator.
          </p>
        </div>
      </div>
    </div>
  );
}