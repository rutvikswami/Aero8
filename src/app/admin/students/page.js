'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { useAdmin } from '@/context/AdminContext';
import { useData } from '@/context/DataContext';

export default function AdminStudents() {
  const { admin } = useAdmin();
  const router = useRouter();
  const { students, setStudents, certificates } = useData();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => { if (!admin) router.push('/admin/login'); }, [admin, router]);
  if (!admin) return null;

  const filtered = (students || []).filter(s =>
    (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.institution || '').toLowerCase().includes(search.toLowerCase())
  );

  const getRankColor = (rank) => {
    if (rank === 'Commander') return '#FFD700';
    if (rank === 'Innovator') return '#C0C0C0';
    if (rank === 'Builder') return '#CD7F32';
    if (rank === 'Engineer') return '#39FF85';
    return 'var(--text-muted)';
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Institution', 'City', 'Points', 'Rank', 'Streak', 'Joined'];
    const rows = (students || []).map(s => [s.name, s.email, s.institution, s.city, s.points, s.rank, s.streak, new Date(s.joinedAt).toLocaleDateString()]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'students.csv'; a.click();
  };

  const removeStudent = (id) => {
    if (confirm('Remove this student?')) {
      setStudents((students || []).filter(s => s.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <h1 className="admin-page-title">Students</h1>
            <p className="admin-page-subtitle">View and manage registered student accounts.</p>
          </div>
          <button className="admin-btn admin-btn-secondary" onClick={exportCSV}>⬇ Export CSV</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', marginBottom: '24px' }}>
          <input
            className="form-input"
            placeholder="Search students by name, email, or institution..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div style={{ padding: '12px 20px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-muted)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>{filtered.length}</span> students
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: '20px' }}>
          <div className="admin-card">
            <table className="admin-table">
              <thead>
                <tr><th>Student</th><th>Institution</th><th>Points</th><th>Rank</th><th>Streak</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.map(student => (
                  <tr key={student.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(student)}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-amber), #c77f12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#000', flexShrink: 0 }}>
                          {(student.name || 'S').charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--text-white)', fontSize: '13px' }}>{student.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{student.institution || '—'}</td>
                    <td style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--accent-amber)', fontSize: '13px' }}>{student.points || 0}</td>
                    <td>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: getRankColor(student.rank) }}>{student.rank}</span>
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>🔥 {student.streak || 0}</td>
                    <td>
                      <button className="admin-btn admin-btn-danger" onClick={e => { e.stopPropagation(); removeStudent(student.id); }}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">🎓</div>
                <p className="empty-state-title">{search ? 'No results found' : 'No students yet'}</p>
                <p className="empty-state-text">{search ? 'Try a different search term.' : 'Students will appear here when they register.'}</p>
              </div>
            )}
          </div>

          {selected && (
            <div className="admin-card" style={{ alignSelf: 'flex-start' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 className="admin-card-title">STUDENT PROFILE</h3>
                <button style={{ fontSize: '16px', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => setSelected(null)}>✕</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-amber), #c77f12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '28px', color: '#000', marginBottom: '12px' }}>
                  {(selected.name || 'S').charAt(0)}
                </div>
                <h3 style={{ fontWeight: 700, color: 'var(--text-white)', marginBottom: '4px' }}>{selected.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{selected.email}</p>
                <span style={{ marginTop: '8px', fontSize: '11px', fontWeight: 700, color: getRankColor(selected.rank), padding: '3px 12px', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.05)', border: '1px solid currentColor' }}>{selected.rank}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Institution', value: selected.institution || '—' },
                  { label: 'City', value: selected.city || '—' },
                  { label: 'Grade', value: selected.grade || '—' },
                  { label: 'Points', value: `${selected.points || 0} pts` },
                  { label: 'Streak', value: `🔥 ${selected.streak || 0} days` },
                  { label: 'Courses Completed', value: (selected.coursesCompleted || []).length },
                  { label: 'Referrals', value: selected.referralCount || 0 },
                  { label: 'Joined', value: selected.joinedAt ? new Date(selected.joinedAt).toLocaleDateString() : '—' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                    <span style={{ color: 'var(--text-white)', fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
                <button className="admin-btn admin-btn-danger" style={{ flex: 1 }} onClick={() => removeStudent(selected.id)}>Remove Student</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
