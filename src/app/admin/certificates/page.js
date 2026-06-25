'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { useAdmin } from '@/context/AdminContext';
import { useData } from '@/context/DataContext';

export default function AdminCertificates() {
  const { admin } = useAdmin();
  const router = useRouter();
  const { certificates, setCertificates, students } = useData();
  const [search, setSearch] = useState('');

  useEffect(() => { if (!admin) router.push('/admin/login'); }, [admin, router]);
  if (!admin) return null;

  const filtered = (certificates || []).filter(c =>
    (c.studentName || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.courseTitle || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.id || '').toLowerCase().includes(search.toLowerCase())
  );

  const revokeCert = (id) => {
    if (confirm('Revoke this certificate?')) setCertificates((certificates || []).filter(c => c.id !== id));
  };

  const exportCSV = () => {
    const headers = ['Cert ID', 'Student', 'Course', 'Score', 'Date Issued'];
    const rows = filtered.map(c => [c.id, c.studentName, c.courseTitle, c.score, c.issuedAt ? new Date(c.issuedAt).toLocaleDateString() : '—']);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'certificates.csv'; a.click();
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <h1 className="admin-page-title">Certificates</h1>
            <p className="admin-page-subtitle">View and manage issued completion certificates.</p>
          </div>
          <button className="admin-btn admin-btn-secondary" onClick={exportCSV}>⬇ Export CSV</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Total Issued', value: (certificates || []).length, color: 'var(--accent-amber)' },
            { label: 'Students Certified', value: new Set((certificates || []).map(c => c.studentId)).size, color: 'var(--success-green)' },
            { label: 'Courses Covered', value: new Set((certificates || []).map(c => c.courseId)).size, color: 'var(--blue-accent)' },
          ].map(stat => (
            <div key={stat.label} className="admin-stat-card">
              <div className="admin-stat-value" style={{ color: stat.color }}>{stat.value}</div>
              <div className="admin-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <input
            className="form-input"
            placeholder="Search by student name, course title, or certificate ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="admin-card">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📜</div>
              <p className="empty-state-title">{search ? 'No matching certificates' : 'No certificates issued yet'}</p>
              <p className="empty-state-text">{search ? 'Try a different search term.' : 'Certificates will appear here when students complete courses.'}</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr><th>Certificate ID</th><th>Student</th><th>Course</th><th>Score</th><th>Date Issued</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.map(cert => (
                  <tr key={cert.id}>
                    <td>
                      <code style={{ fontSize: '11px', color: 'var(--accent-amber)', background: 'rgba(245,166,35,0.08)', padding: '2px 8px', borderRadius: '4px' }}>
                        {cert.id}
                      </code>
                    </td>
                    <td style={{ color: 'var(--text-white)', fontWeight: 600 }}>{cert.studentName || '—'}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{cert.courseTitle || '—'}</td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: (cert.score || 0) >= 80 ? 'var(--success-green)' : 'var(--accent-amber)' }}>
                        {cert.score || 0}%
                      </span>
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {cert.issuedAt ? new Date(cert.issuedAt).toLocaleDateString('en-IN') : '—'}
                    </td>
                    <td style={{ display: 'flex', gap: '8px' }}>
                      <a href={`/verify/${cert.id}`} target="_blank" rel="noreferrer">
                        <button className="admin-btn admin-btn-secondary" style={{ fontSize: '11px' }}>Verify ↗</button>
                      </a>
                      <button className="admin-btn admin-btn-danger" style={{ fontSize: '11px' }} onClick={() => revokeCert(cert.id)}>Revoke</button>
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
