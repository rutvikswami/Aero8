'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { useAdmin } from '@/context/AdminContext';
import { useData } from '@/context/DataContext';

export default function AdminDashboard() {
  const { admin } = useAdmin();
  const router = useRouter();
  const { bookings, students, showcaseEntries, courses } = useData();

  useEffect(() => {
    if (!admin) router.push('/admin/login');
  }, [admin, router]);

  if (!admin) return null;

  const thisWeek = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const pendingBookings = (bookings || []).filter(b => b.status === 'Request Received').length;
  const pendingShowcase = (showcaseEntries || []).filter(e => !e.approved).length;
  const completionsThisMonth = 0; // placeholder

  const STATS = [
    { label: 'Total Bookings', value: (bookings || []).length },
    { label: 'Pending Review', value: pendingBookings },
    { label: 'Showcase Pending', value: pendingShowcase },
    { label: 'Total Courses', value: (courses || []).length },
    { label: 'Total Students', value: 8 + (students || []).length },
    { label: 'Mock Registered', value: 8 },
  ];

  const quickActions = [
    { label: 'Add Course', href: '/admin/courses', icon: '📚' },
    { label: 'Add Product', href: '/admin/store', icon: '🛍️' },
    { label: 'View Bookings', href: '/admin/bookings', icon: '📋' },
    { label: 'Moderate Showcase', href: '/admin/showcase', icon: '📸' },
    { label: 'Manage Team', href: '/admin/team', icon: '👥' },
    { label: 'Section Toggles', href: '/admin/sections', icon: '🔀' },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h1 className="admin-page-title">Mission Control</h1>
        <p className="admin-page-subtitle">Welcome back, {admin.name}. Here&apos;s your overview.</p>

        <div className="admin-stats-grid">
          {STATS.map(s => (
            <div key={s.label} className="admin-stat-card">
              <div className="admin-stat-value">{s.value}</div>
              <div className="admin-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="admin-card">
          <h3 className="admin-card-title">QUICK ACTIONS</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
            {quickActions.map(action => (
              <a key={action.href} href={action.href}>
                <button className="admin-btn-secondary admin-btn" style={{
                  width: '100%', padding: '16px', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: '8px', fontSize: '14px',
                }}>
                  <span style={{ fontSize: '24px' }}>{action.icon}</span>
                  {action.label}
                </button>
              </a>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <h3 className="admin-card-title">RECENT BOOKINGS</h3>
          {(bookings || []).length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No bookings yet. Share your workshop page!</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr><th>Name</th><th>Institution</th><th>City</th><th>Date</th><th>Status</th></tr>
              </thead>
              <tbody>
                {[...(bookings || [])].reverse().slice(0, 5).map(b => (
                  <tr key={b.id}>
                    <td style={{ color: 'var(--text-white)' }}>{b.name}</td>
                    <td>{b.institution}</td>
                    <td>{b.city}</td>
                    <td>{b.preferredDate || 'TBD'}</td>
                    <td>
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: 'rgba(245,166,35,0.1)', color: 'var(--accent-amber)', border: '1px solid rgba(245,166,35,0.2)' }}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
