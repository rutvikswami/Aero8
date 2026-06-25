'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { useAdmin } from '@/context/AdminContext';

const DEFAULT_ADMIN = { username: 'admin', password: 'aero8admin', role: 'super_admin', name: 'Bharaath' };

export default function AdminSettings() {
  const { admin, logoutAdmin } = useAdmin();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', currentPassword: '', newPassword: '', confirmPassword: '' });
  const [saved, setSaved] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { if (!admin) router.push('/admin/login'); }, [admin, router]);
  useEffect(() => { if (admin) setForm(f => ({ ...f, name: admin.name })); }, [admin]);
  if (!admin) return null;

  const saveProfile = () => {
    setError('');
    if (!form.name.trim()) { setError('Name cannot be empty.'); return; }
    // In a real app, this would update the server. Here we just show success.
    setSaved('profile');
    setTimeout(() => setSaved(''), 2500);
  };

  const changePassword = () => {
    setError('');
    if (form.currentPassword !== DEFAULT_ADMIN.password) { setError('Current password is incorrect.'); return; }
    if (form.newPassword.length < 6) { setError('New password must be at least 6 characters.'); return; }
    if (form.newPassword !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    setSaved('password');
    setForm(f => ({ ...f, currentPassword: '', newPassword: '', confirmPassword: '' }));
    setTimeout(() => setSaved(''), 2500);
  };

  const clearAllData = () => {
    if (confirm('⚠️ This will clear ALL locally stored data including bookings, students, certificates, showcase entries, and newsletter emails. This cannot be undone. Continue?')) {
      if (confirm('Are you absolutely sure? All data will be permanently deleted.')) {
        const keysToKeep = ['admin'];
        Object.keys(localStorage).forEach(key => {
          if (!keysToKeep.includes(key)) localStorage.removeItem(key);
        });
        alert('All data cleared. The page will reload.');
        window.location.reload();
      }
    }
  };

  const resetToDefaults = () => {
    if (confirm('Reset all content to default values? This will overwrite any custom text, kits, courses, FAQ etc.')) {
      const contentKeys = ['hero', 'about', 'team', 'kits', 'faq', 'courses', 'products', 'games', 'footer', 'sections', 'navLinks'];
      contentKeys.forEach(key => localStorage.removeItem(key));
      alert('Content reset to defaults. The page will reload.');
      window.location.reload();
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h1 className="admin-page-title">Settings</h1>
        <p className="admin-page-subtitle">Manage admin profile, security, and data settings.</p>

        {error && (
          <div style={{ padding: '12px 20px', background: 'rgba(255,58,58,0.08)', border: '1px solid rgba(255,58,58,0.2)', borderRadius: '8px', color: 'var(--danger-red)', fontSize: '13px', marginBottom: '24px' }}>
            ⚠️ {error}
          </div>
        )}

        {/* Profile */}
        <div className="admin-card" style={{ marginBottom: '24px' }}>
          <h3 className="admin-card-title">ADMIN PROFILE</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
            <div className="form-group">
              <label className="form-label">Display Name</label>
              <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Role</label>
              <input className="form-input" value={admin.role === 'super_admin' ? 'Super Admin' : 'Editor'} disabled style={{ opacity: 0.6 }} />
            </div>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input className="form-input" value={admin.username || 'admin'} disabled style={{ opacity: 0.6 }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
            <button className="admin-btn admin-btn-primary" onClick={saveProfile}>SAVE PROFILE</button>
            {saved === 'profile' && <span style={{ color: 'var(--success-green)', fontSize: '13px' }}>✓ Profile updated!</span>}
          </div>
        </div>

        {/* Change Password */}
        <div className="admin-card" style={{ marginBottom: '24px' }}>
          <h3 className="admin-card-title">CHANGE PASSWORD</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px', maxWidth: '400px' }}>
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input className="form-input" type="password" value={form.currentPassword} onChange={e => setForm({ ...form, currentPassword: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input className="form-input" type="password" value={form.newPassword} onChange={e => setForm({ ...form, newPassword: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input className="form-input" type="password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
            <button className="admin-btn admin-btn-primary" onClick={changePassword}>CHANGE PASSWORD</button>
            {saved === 'password' && <span style={{ color: 'var(--success-green)', fontSize: '13px' }}>✓ Password changed!</span>}
          </div>
        </div>

        {/* Data Management */}
        <div className="admin-card" style={{ borderColor: 'rgba(255,58,58,0.2)' }}>
          <h3 className="admin-card-title" style={{ color: 'var(--danger-red)' }}>⚠️ DANGER ZONE</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px', marginTop: '8px' }}>
            These actions are irreversible. Proceed with extreme caution.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,58,58,0.04)', border: '1px solid rgba(255,58,58,0.15)', borderRadius: '8px' }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-white)', fontSize: '14px' }}>Reset Content to Defaults</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Resets hero, about, kits, FAQ, courses, products, and nav to default values. Does not delete bookings or students.</div>
              </div>
              <button className="admin-btn admin-btn-secondary" style={{ flexShrink: 0, marginLeft: '16px' }} onClick={resetToDefaults}>Reset Content</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,58,58,0.04)', border: '1px solid rgba(255,58,58,0.15)', borderRadius: '8px' }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--danger-red)', fontSize: '14px' }}>Clear All Data</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Permanently deletes ALL stored data: bookings, students, certificates, showcase entries, newsletter subscribers. This cannot be undone.</div>
              </div>
              <button className="admin-btn admin-btn-danger" style={{ flexShrink: 0, marginLeft: '16px' }} onClick={clearAllData}>CLEAR ALL</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
