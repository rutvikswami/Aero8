'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';

export default function AdminLoginPage() {
  const { loginAdmin } = useAdmin();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const ok = loginAdmin(username, password);
    if (ok) {
      router.push('/admin');
    } else {
      setError('Invalid credentials. Try admin / aero8admin');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>🛸</div>
        <div className="admin-login-brand">AERO8</div>
        <div className="admin-login-subtitle">Admin Mission Control — Restricted Access</div>
        <form className="admin-login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              className="form-input"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="admin-login-error">{error}</div>}
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            LOGIN →
          </button>
        </form>
        <p style={{ marginTop: '24px', fontSize: '12px', color: 'var(--text-muted)' }}>
          Default: <code style={{ color: 'var(--accent-amber)' }}>admin</code> / <code style={{ color: 'var(--accent-amber)' }}>aero8admin</code>
        </p>
        <Link href="/" style={{ display: 'block', marginTop: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
