'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { useAdmin } from '@/context/AdminContext';
import { useData } from '@/context/DataContext';

export default function AdminAnalytics() {
  const { admin } = useAdmin();
  const router = useRouter();
  const { bookings, students, courses, certificates, showcaseEntries, newsletterEmails } = useData();

  useEffect(() => { if (!admin) router.push('/admin/login'); }, [admin, router]);
  if (!admin) return null;

  // Simulated analytics data
  const thisWeek = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const thisMonth = Date.now() - 30 * 24 * 60 * 60 * 1000;

  const recentBookings = (bookings || []).filter(b => b.submittedAt && b.submittedAt > thisMonth).length;
  const newStudents = (students || []).filter(s => s.joinedAt && s.joinedAt > thisMonth).length;
  const certsIssued = (certificates || []).filter(c => c.issuedAt && c.issuedAt > thisMonth).length;

  const overviewStats = [
    { label: 'Total Workshop Bookings', value: (bookings || []).length, icon: '📋', color: 'var(--accent-amber)' },
    { label: 'Registered Students', value: (students || []).length, icon: '🎓', color: 'var(--blue-accent)' },
    { label: 'Certificates Issued', value: (certificates || []).length, icon: '📜', color: 'var(--success-green)' },
    { label: 'Newsletter Subscribers', value: (newsletterEmails || []).length, icon: '📧', color: '#CF9FFF' },
    { label: 'Showcase Entries', value: (showcaseEntries || []).length, icon: '📸', color: '#FF6B6B' },
    { label: 'Approved Builds', value: (showcaseEntries || []).filter(e => e.approved).length, icon: '✅', color: 'var(--success-green)' },
  ];

  const bookingStatusBreakdown = {
    'Request Received': (bookings || []).filter(b => b.status === 'Request Received').length,
    'Under Review': (bookings || []).filter(b => b.status === 'Under Review').length,
    'Confirmed': (bookings || []).filter(b => b.status === 'Confirmed').length,
    'Completed': (bookings || []).filter(b => b.status === 'Completed').length,
    'Cancelled': (bookings || []).filter(b => b.status === 'Cancelled').length,
  };

  const statusColors = {
    'Request Received': 'var(--accent-amber)',
    'Under Review': 'var(--blue-accent)',
    'Confirmed': 'var(--success-green)',
    'Completed': '#CF9FFF',
    'Cancelled': 'var(--danger-red)',
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h1 className="admin-page-title">Analytics</h1>
        <p className="admin-page-subtitle">Overview of platform performance and engagement metrics.</p>

        {/* Overview Stats */}
        <div className="admin-stats-grid" style={{ marginTop: '24px' }}>
          {overviewStats.map(stat => (
            <div key={stat.label} className="admin-stat-card">
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
              <div className="admin-stat-value" style={{ color: stat.color }}>{stat.value}</div>
              <div className="admin-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
          {/* Booking Status */}
          <div className="admin-card">
            <h3 className="admin-card-title">BOOKING STATUS BREAKDOWN</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
              {Object.entries(bookingStatusBreakdown).map(([status, count]) => {
                const total = (bookings || []).length;
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={status}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '13px', color: 'var(--text-muted-light)' }}>{status}</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: statusColors[status] }}>{count} ({pct}%)</span>
                    </div>
                    <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: statusColors[status], borderRadius: '3px', transition: 'width 0.5s ease' }} />
                    </div>
                  </div>
                );
              })}
              {(bookings || []).length === 0 && (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No bookings to display yet.</p>
              )}
            </div>
          </div>

          {/* Course Engagement */}
          <div className="admin-card">
            <h3 className="admin-card-title">COURSE OVERVIEW</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
              {(courses || []).length === 0 ? (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No courses to display yet.</p>
              ) : (courses || []).map(course => {
                const courseEnrollments = (students || []).filter(s => (s.coursesCompleted || []).includes(course.id)).length;
                return (
                  <div key={course.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-white)' }}>{course.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{course.kitTag} · {course.difficulty}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--accent-amber)' }}>{courseEnrollments}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>completions</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Newsletter Subscribers */}
        <div className="admin-card" style={{ marginTop: '24px' }}>
          <h3 className="admin-card-title">NEWSLETTER SUBSCRIBERS</h3>
          {(newsletterEmails || []).length === 0 ? (
            <div className="empty-state" style={{ padding: '30px 0' }}>
              <div className="empty-state-icon">📧</div>
              <p className="empty-state-title">No subscribers yet</p>
              <p className="empty-state-text">Email addresses collected from the newsletter section will appear here.</p>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{(newsletterEmails || []).length} subscribers total</p>
                <button className="admin-btn admin-btn-secondary" style={{ fontSize: '12px' }} onClick={() => {
                  const csv = (newsletterEmails || []).join('\n');
                  const blob = new Blob([csv], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a'); a.href = url; a.download = 'subscribers.txt'; a.click();
                }}>⬇ Export</button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(newsletterEmails || []).slice(0, 30).map((email, i) => (
                  <span key={i} style={{ fontSize: '12px', padding: '4px 12px', background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.15)', borderRadius: 'var(--radius-pill)', color: 'var(--text-muted-light)' }}>
                    {email}
                  </span>
                ))}
                {(newsletterEmails || []).length > 30 && (
                  <span style={{ fontSize: '12px', padding: '4px 12px', background: 'rgba(136,136,136,0.06)', border: '1px solid rgba(136,136,136,0.15)', borderRadius: 'var(--radius-pill)', color: 'var(--text-muted)' }}>
                    +{(newsletterEmails || []).length - 30} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
