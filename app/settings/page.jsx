'use client';
import { useEffect, useState } from 'react';
import InputField from '../../../components/common/InputField';
import Button from '../../../components/common/Button';
import { api } from '../../../lib/api';
import styles from './page.module.css';

const SETTING_TABS = ['General', 'Users', 'Notifications', 'Integrations'];

export default function SettingsPage() {
  const [tab, setTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    api.getSettings().then(setSettings).catch(console.error);
    api.getUsers().then(setUsers).catch(console.error);
  }, []);

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Topbar />
        <div className={styles.content}>
          <PageHeader title="Settings" subtitle="System configuration and user management" />

          <div className={styles.tabs}>
            {SETTING_TABS.map((t, i) => (
              <button
                key={t}
                className={[styles.tabBtn, i === tab ? styles.tabActive : ''].join(' ')}
                onClick={() => setTab(i)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className={styles.tabContent}>
            {tab === 0 && (
              <div className={styles.section}>
                <p className={styles.sectionTitle}>General Settings</p>
                <div className={styles.formGrid}>
                  <InputField
                    label="Organization Name"
                    id="orgName"
                    defaultValue={settings.orgName}
                  />
                  <InputField
                    label="FinCEN Institution ID"
                    id="finCenId"
                    defaultValue={settings.finCenId}
                  />
                  <InputField
                    label="Primary Contact Email"
                    id="contactEmail"
                    type="email"
                    defaultValue={settings.contactEmail}
                  />
                  <InputField
                    label="Session Timeout (minutes)"
                    id="sessionTimeout"
                    type="number"
                    defaultValue={settings.sessionTimeout || 30}
                  />
                </div>
                <Button variant="primary" size="md">Save Changes</Button>
              </div>
            )}

            {tab === 1 && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <p className={styles.sectionTitle}>User Management</p>
                  <Button variant="primary" size="sm">Invite User</Button>
                </div>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Last Login</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u.id}>
                          <td className={styles.userName}>{u.name}</td>
                          <td className={styles.mono}>{u.email}</td>
                          <td>{u.role}</td>
                          <td className={styles.mono}>{u.lastLogin ? fmtDate(u.lastLogin) : 'Never'}</td>
                          <td>
                            <span className={[styles.userStatus, u.active ? styles.active : styles.inactive].join(' ')}>
                              {u.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td><Button variant="ghost" size="sm">Edit</Button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === 2 && (
              <div className={styles.section}>
                <p className={styles.sectionTitle}>Notification Preferences</p>
                <p className={styles.placeholder}>Notification configuration coming soon.</p>
              </div>
            )}

            {tab === 3 && (
              <div className={styles.section}>
                <p className={styles.sectionTitle}>Integrations</p>
                <p className={styles.placeholder}>API and third-party integrations coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}