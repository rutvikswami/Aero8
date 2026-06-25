'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { useAdmin } from '@/context/AdminContext';
import { useData } from '@/context/DataContext';

export default function AdminLeaderboard() {
  const { admin } = useAdmin();
  const router = useRouter();
  const { students, leaderboard } = useData();

  useEffect(() => { if (!admin) router.push('/admin/login'); }, [admin, router]);
  if (!admin) return null;

  // Combine registered students and leaderboard data, sort by points
  const allStudents = [
    ...(students || []),
    ...(leaderboard || []).filter(lb => !(students || []).some(s => s.id === lb.id)),
  ].sort((a, b) => (b.points || 0) - (a.points || 0));

  const getRankColor = (rank) => {
    if (rank === 'Commander') return '#FFD700';
    if (rank === 'Innovator') return '#C0C0C0';
    if (rank === 'Builder') return '#CD7F32';
    if (rank === 'Engineer') return '#39FF85';
    return 'var(--text-muted)';
  };

  const getMedalIcon = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  // Group by institution
  const institutions = {};
  allStudents.forEach(s => {
    if (s.institution) {
      if (!institutions[s.institution]) institutions[s.institution] = { name: s.institution, points: 0, count: 0 };
      institutions[s.institution].points += (s.points || 0);
      institutions[s.institution].count += 1;
    }
  });
  const instList = Object.values(institutions).sort((a, b) => b.points - a.points);

  const [tab, setTab] = useState('students');

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h1 className="admin-page-title">Leaderboard</h1>
        <p className="admin-page-subtitle">View top students and institutions ranked by mission points.</p>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', marginTop: '8px' }}>
          {['students', 'institutions'].map(t => (
            <button key={t} className={`admin-btn ${tab === t ? 'admin-btn-primary' : 'admin-btn-secondary'}`} onClick={() => setTab(t)}>
              {t === 'students' ? '🎓 Students' : '🏫 Institutions'}
            </button>
          ))}
        </div>

        {tab === 'students' && (
          <div className="admin-card">
            {allStudents.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🏆</div>
                <p className="empty-state-title">No students yet</p>
                <p className="empty-state-text">The leaderboard will populate as students earn points.</p>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr><th>Rank</th><th>Student</th><th>Institution</th><th>Points</th><th>Rank Title</th><th>Streak</th></tr>
                </thead>
                <tbody>
                  {allStudents.map((student, index) => (
                    <tr key={student.id} style={{ background: index < 3 ? 'rgba(245,166,35,0.03)' : 'transparent' }}>
                      <td>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', color: index < 3 ? 'var(--accent-amber)' : 'var(--text-muted)' }}>
                          {getMedalIcon(index)}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-amber), #c77f12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#000' }}>
                            {(student.name || 'S').charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-white)', fontSize: '13px' }}>{student.name}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{student.city || '—'}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{student.institution || '—'}</td>
                      <td>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--accent-amber)', fontSize: '14px' }}>{student.points || 0}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '4px' }}>pts</span>
                      </td>
                      <td>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: getRankColor(student.rank) }}>{student.rank || 'Cadet'}</span>
                      </td>
                      <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>🔥 {student.streak || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === 'institutions' && (
          <div className="admin-card">
            {instList.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🏫</div>
                <p className="empty-state-title">No institutions yet</p>
                <p className="empty-state-text">Institution rankings appear once students add their school/college.</p>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr><th>Rank</th><th>Institution</th><th>Total Points</th><th>Students</th><th>Avg Points</th></tr>
                </thead>
                <tbody>
                  {instList.map((inst, index) => (
                    <tr key={inst.name} style={{ background: index < 3 ? 'rgba(245,166,35,0.03)' : 'transparent' }}>
                      <td>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', color: index < 3 ? 'var(--accent-amber)' : 'var(--text-muted)' }}>
                          {getMedalIcon(index)}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600, color: 'var(--text-white)' }}>{inst.name}</td>
                      <td>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--accent-amber)', fontSize: '14px' }}>{inst.points}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '4px' }}>pts</span>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{inst.count} students</td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{inst.count > 0 ? Math.round(inst.points / inst.count) : 0} pts avg</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
