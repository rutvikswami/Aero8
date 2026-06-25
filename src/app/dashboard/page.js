'use client';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import Link from 'next/link';

export default function DashboardPage() {
  const { student, setShowAuthModal } = useAuth();
  const { courses } = useData();

  if (!student) {
    return (
      <>
        <Navbar />
        <AuthModal />
        <div className="dashboard-page">
          <div className="container">
            <div className="empty-state">
              <div className="empty-state-icon">🔒</div>
              <h3 className="empty-state-title">Login Required</h3>
              <p className="empty-state-text">Sign in to access your dashboard</p>
              <button className="btn-primary" style={{ marginTop: '24px' }} onClick={() => setShowAuthModal(true)}>
                LOGIN WITH GOOGLE
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const rankColors = {
    Cadet: '#888', Engineer: '#3AA0FF', Builder: '#39FF85', Innovator: '#F5A623', Commander: '#FFD700'
  };
  const rankColor = rankColors[student.rank] || '#888';

  const enrolledCourses = courses.map(c => ({
    ...c,
    completed: c.lessons.filter(l => l.completed).length,
    total: c.lessons.length,
  }));

  return (
    <>
      <Navbar />
      <AuthModal />
      <div className="dashboard-page">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '48px' }}>
            <div className="profile-avatar" style={{ width: '80px', height: '80px', fontSize: '28px' }}>
              {student.name?.[0] || 'S'}
            </div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, marginBottom: '4px' }}>
                Welcome, {student.name?.split(' ')[0] || 'Engineer'}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', padding: '4px 14px',
                  borderRadius: 'var(--radius-pill)', background: `${rankColor}15`,
                  color: rankColor, border: `1px solid ${rankColor}30`,
                  fontFamily: 'var(--font-heading)',
                }}>
                  {student.rank}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  {student.institution} · {student.city}
                </span>
              </div>
            </div>
          </div>

          <div className="dashboard-stats">
            <div className="dashboard-stat-card">
              <div className="dashboard-stat-value">{student.points || 0}</div>
              <div className="dashboard-stat-label">Total Points</div>
            </div>
            <div className="dashboard-stat-card">
              <div className="dashboard-stat-value">{student.rank}</div>
              <div className="dashboard-stat-label">Current Rank</div>
            </div>
            <div className="dashboard-stat-card">
              <div className="dashboard-stat-value">{student.streak || 0}</div>
              <div className="dashboard-stat-label">Day Streak</div>
            </div>
            <div className="dashboard-stat-card">
              <div className="dashboard-stat-value">
                {enrolledCourses.filter(c => c.completed === c.total).length}
              </div>
              <div className="dashboard-stat-label">Courses Completed</div>
            </div>
          </div>

          <div className="dashboard-sections">
            <div className="dashboard-section-card">
              <h3 className="dashboard-section-title">MY COURSES</h3>
              {enrolledCourses.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                  <Link href="/courses" style={{ color: 'var(--accent-amber)' }}>Browse courses</Link> to get started.
                </p>
              ) : (
                enrolledCourses.map(c => (
                  <div key={c.id} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-white)' }}>{c.title}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{c.completed}/{c.total}</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${c.total > 0 ? (c.completed / c.total) * 100 : 0}%` }} />
                    </div>
                    <Link href={`/courses/${c.id}`}>
                      <button className="btn-secondary" style={{ marginTop: '10px', padding: '6px 16px', fontSize: '11px' }}>
                        CONTINUE →
                      </button>
                    </Link>
                  </div>
                ))
              )}
            </div>

            <div className="dashboard-section-card">
              <h3 className="dashboard-section-title">MY CERTIFICATES</h3>
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>📜</div>
                <p>Certificate downloads coming soon (Phase 2)</p>
              </div>
            </div>

            <div className="dashboard-section-card">
              <h3 className="dashboard-section-title">MY ORDERS</h3>
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🛍️</div>
                <p>Order history coming soon (Phase 2)</p>
                <Link href="/store">
                  <button className="btn-primary" style={{ marginTop: '16px', fontSize: '12px', padding: '8px 20px' }}>
                    VISIT STORE →
                  </button>
                </Link>
              </div>
            </div>

            <div className="dashboard-section-card">
              <h3 className="dashboard-section-title">REFERRAL LINK</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Share your link and both you and your friend earn 75 points!
              </p>
              <div style={{
                background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px',
                padding: '12px 16px', fontSize: '13px', color: 'var(--accent-amber)', fontFamily: 'monospace',
                wordBreak: 'break-all',
              }}>
                aero8.in/join?ref={student.referralCode || 'abc123'}
              </div>
              <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-muted)' }}>
                Referrals: <strong style={{ color: 'var(--text-white)' }}>{student.referralCount || 0}</strong> •
                Points earned: <strong style={{ color: 'var(--accent-amber)' }}>{(student.referralCount || 0) * 75} pts</strong>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '32px', textAlign: 'right' }}>
            <Link href={`/profile/${student.id}`}>
              <button className="btn-secondary" style={{ fontSize: '12px' }}>VIEW PUBLIC PROFILE →</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      <BackToTop />
    </>
  );
}
