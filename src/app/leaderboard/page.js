'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AuthModal from '@/components/AuthModal';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';

const RANK_TITLES = [
  { min: 0, max: 99, title: 'Cadet', color: '#888888' },
  { min: 100, max: 499, title: 'Engineer', color: '#3AA0FF' },
  { min: 500, max: 1499, title: 'Builder', color: '#39FF85' },
  { min: 1500, max: 2999, title: 'Innovator', color: '#F5A623' },
  { min: 3000, max: Infinity, title: 'Commander', color: '#FFD700' },
];

function getRankTitle(points) {
  return RANK_TITLES.find(r => points >= r.min && points <= r.max) || RANK_TITLES[0];
}

function getMockStudents() {
  return [
    { id: 'ms1', name: 'Arjun Sharma', institution: 'DPS Bangalore', city: 'Bangalore', points: 3200, rank: 'Commander' },
    { id: 'ms2', name: 'Priya Nair', institution: 'VIT Vellore', city: 'Vellore', points: 2100, rank: 'Innovator' },
    { id: 'ms3', name: 'Rahul Mehta', institution: 'RV College', city: 'Bangalore', points: 1750, rank: 'Innovator' },
    { id: 'ms4', name: 'Sanya Kapoor', institution: 'Kendriya Vidyalaya', city: 'Mysore', points: 820, rank: 'Builder' },
    { id: 'ms5', name: 'Rohan Pillai', institution: 'BITS Pilani', city: 'Pilani', points: 640, rank: 'Builder' },
    { id: 'ms6', name: 'Meera Krishnan', institution: 'NPS HSR', city: 'Bangalore', points: 290, rank: 'Engineer' },
    { id: 'ms7', name: 'Dev Patel', institution: 'Amrita School', city: 'Coimbatore', points: 180, rank: 'Engineer' },
    { id: 'ms8', name: 'Nisha Reddy', institution: 'Delhi Public School', city: 'Hyderabad', points: 75, rank: 'Cadet' },
  ];
}

export default function LeaderboardPage() {
  const { student } = useAuth();
  const [filterCity, setFilterCity] = useState('All');
  const [filterPeriod, setFilterPeriod] = useState('All Time');

  const mockStudents = getMockStudents();
  const allStudents = student
    ? [...mockStudents, { id: student.id, name: student.name, institution: student.institution || 'Unknown', city: student.city || 'Unknown', points: student.points || 0, rank: student.rank || 'Cadet' }].sort((a, b) => b.points - a.points)
    : mockStudents;

  const cities = ['All', ...new Set(allStudents.map(s => s.city))];

  const filtered = filterCity === 'All' ? allStudents : allStudents.filter(s => s.city === filterCity);
  const sorted = [...filtered].sort((a, b) => b.points - a.points);

  return (
    <>
      <Navbar />
      <AuthModal />
      <div className="leaderboard-page">
        <div className="container">
          <div className="section-label">GLOBAL RANKINGS</div>
          <h1 className="section-heading">Student Leaderboard</h1>
          <p className="section-subtext" style={{ marginBottom: '40px' }}>
            Compete, earn points, and climb the ranks. Every lesson, game, and workshop counts.
          </p>

          {/* Rank system explainer */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {RANK_TITLES.map(r => (
              <div key={r.title} style={{
                padding: '8px 16px', borderRadius: 'var(--radius-pill)',
                border: `1px solid ${r.color}40`, background: `${r.color}08`,
                color: r.color, fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-heading)',
              }}>
                {r.title} ({r.min}–{r.max === Infinity ? '∞' : r.max} pts)
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {cities.slice(0, 8).map(c => (
              <button key={c} className={`filter-btn ${filterCity === c ? 'active' : ''}`} onClick={() => setFilterCity(c)}>
                {c}
              </button>
            ))}
            {['All Time', 'This Month', 'This Week'].map(p => (
              <button key={p} className={`filter-btn ${filterPeriod === p ? 'active' : ''}`} onClick={() => setFilterPeriod(p)}>
                {p}
              </button>
            ))}
          </div>

          <div className="leaderboard-table-wrapper">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Institution</th>
                  <th>City</th>
                  <th>Points</th>
                  <th>Rank Title</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((s, i) => {
                  const rank = getRankTitle(s.points);
                  const isCurrentUser = student && s.id === student.id;
                  return (
                    <tr key={s.id} style={isCurrentUser ? { background: 'rgba(245,166,35,0.06)' } : {}}>
                      <td>
                        <div className={`rank-badge ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : 'normal'}`}>
                          {i + 1}
                        </div>
                      </td>
                      <td style={{ color: isCurrentUser ? 'var(--accent-amber)' : 'var(--text-white)', fontWeight: 600 }}>
                        {s.name} {isCurrentUser ? '(You)' : ''}
                      </td>
                      <td>{s.institution}</td>
                      <td>{s.city}</td>
                      <td style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--accent-amber)' }}>
                        {s.points}
                      </td>
                      <td>
                        <span style={{
                          fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em',
                          padding: '3px 10px', borderRadius: 'var(--radius-pill)',
                          background: `${rank.color}10`, color: rank.color,
                          border: `1px solid ${rank.color}30`,
                        }}>
                          {rank.title}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
      <BackToTop />
    </>
  );
}
