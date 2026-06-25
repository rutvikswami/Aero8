'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/context/AuthContext';

const MOCK_PROFILES = {
  ms1: { name: 'Arjun Sharma', institution: 'DPS Bangalore', city: 'Bangalore', points: 3200, rank: 'Commander', bio: 'Robotics enthusiast. Kit 01 Builder.', coursesCompleted: ['Build Your First Mars Rover'], workshopAttendance: 2, gameScores: [{ game: 'A8 Navigator', score: 2400 }] },
};

function getRankColor(rank) {
  const map = { Cadet: '#888', Engineer: '#3AA0FF', Builder: '#39FF85', Innovator: '#F5A623', Commander: '#FFD700' };
  return map[rank] || '#888';
}

export default function ProfilePage() {
  const params = useParams();
  const { student } = useAuth();

  const profileId = params.studentId;
  let profile = MOCK_PROFILES[profileId];

  if (!profile && student && student.id === profileId) {
    profile = { ...student };
  }

  if (!profile) {
    return (
      <>
        <Navbar /><AuthModal />
        <div className="profile-page"><div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">👤</div>
            <h3 className="empty-state-title">Profile not found</h3>
          </div>
        </div></div>
        <Footer />
      </>
    );
  }

  const rankColor = getRankColor(profile.rank);

  return (
    <>
      <Navbar />
      <AuthModal />
      <div className="profile-page">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="profile-header">
            <div className="profile-avatar">{profile.name?.[0] || 'A'}</div>
            <div>
              <h1 className="profile-name">{profile.name}</h1>
              <p className="profile-meta">{profile.institution} · {profile.city}</p>
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  fontSize: '12px', fontWeight: 700, padding: '4px 14px', borderRadius: 'var(--radius-pill)',
                  background: `${rankColor}15`, color: rankColor, border: `1px solid ${rankColor}30`,
                  fontFamily: 'var(--font-heading)',
                }}>
                  {profile.rank}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--accent-amber)', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                  {profile.points || 0} pts
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
            <div className="dashboard-stat-card">
              <div className="dashboard-stat-value">{profile.points || 0}</div>
              <div className="dashboard-stat-label">Points</div>
            </div>
            <div className="dashboard-stat-card">
              <div className="dashboard-stat-value">{(profile.coursesCompleted || []).length}</div>
              <div className="dashboard-stat-label">Courses Done</div>
            </div>
            <div className="dashboard-stat-card">
              <div className="dashboard-stat-value">{profile.workshopAttendance || 0}</div>
              <div className="dashboard-stat-label">Workshops</div>
            </div>
          </div>

          {(profile.coursesCompleted || []).length > 0 && (
            <div className="dashboard-section-card" style={{ marginBottom: '20px' }}>
              <h3 className="dashboard-section-title">COURSES COMPLETED</h3>
              {(profile.coursesCompleted || []).map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ color: 'var(--success-green)' }}>✓</span>
                  <span style={{ fontSize: '14px', color: 'var(--text-white)' }}>{c}</span>
                </div>
              ))}
            </div>
          )}

          {(profile.gameScores || []).length > 0 && (
            <div className="dashboard-section-card">
              <h3 className="dashboard-section-title">GAME HIGH SCORES</h3>
              {(profile.gameScores || []).map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '14px', color: 'var(--text-white)' }}>{s.game}</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--accent-amber)' }}>{s.score}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <BackToTop />
    </>
  );
}
