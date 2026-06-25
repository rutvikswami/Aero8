'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { useAdmin } from '@/context/AdminContext';
import { useData } from '@/context/DataContext';

export default function AdminShowcase() {
  const { admin } = useAdmin();
  const router = useRouter();
  const { showcaseEntries, setShowcaseEntries } = useData();
  const [filter, setFilter] = useState('all');

  useEffect(() => { if (!admin) router.push('/admin/login'); }, [admin, router]);
  if (!admin) return null;

  const approveEntry = (id) => {
    setShowcaseEntries((showcaseEntries || []).map(e => e.id === id ? { ...e, approved: true } : e));
  };
  const rejectEntry = (id) => {
    if (confirm('Reject and remove this showcase entry?')) {
      setShowcaseEntries((showcaseEntries || []).filter(e => e.id !== id));
    }
  };

  const filtered = (showcaseEntries || []).filter(e => {
    if (filter === 'pending') return !e.approved;
    if (filter === 'approved') return e.approved;
    return true;
  });

  const pendingCount = (showcaseEntries || []).filter(e => !e.approved).length;
  const approvedCount = (showcaseEntries || []).filter(e => e.approved).length;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h1 className="admin-page-title">Community Showcase</h1>
        <p className="admin-page-subtitle">Moderate student build photos submitted to the public showcase.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Total Entries', value: (showcaseEntries || []).length, color: 'var(--accent-amber)' },
            { label: 'Pending Review', value: pendingCount, color: '#F5A623' },
            { label: 'Approved', value: approvedCount, color: 'var(--success-green)' },
          ].map(stat => (
            <div key={stat.label} className="admin-stat-card">
              <div className="admin-stat-value" style={{ color: stat.color }}>{stat.value}</div>
              <div className="admin-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {[
            { key: 'all', label: `All (${(showcaseEntries || []).length})` },
            { key: 'pending', label: `Pending (${pendingCount})` },
            { key: 'approved', label: `Approved (${approvedCount})` },
          ].map(t => (
            <button key={t.key} className={`admin-btn ${filter === t.key ? 'admin-btn-primary' : 'admin-btn-secondary'}`} onClick={() => setFilter(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="admin-card">
            <div className="empty-state">
              <div className="empty-state-icon">📸</div>
              <p className="empty-state-title">{filter === 'pending' ? 'No pending submissions' : filter === 'approved' ? 'Nothing approved yet' : 'No showcase entries yet'}</p>
              <p className="empty-state-text">Student build photos will appear here for moderation.</p>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {filtered.map(entry => (
              <div key={entry.id} className="admin-card" style={{ padding: 0, overflow: 'hidden', borderColor: entry.approved ? 'rgba(57,255,133,0.3)' : 'var(--border-color)' }}>
                {entry.photo ? (
                  <div style={{ aspectRatio: '4/3', background: 'var(--bg-surface)', overflow: 'hidden' }}>
                    <img src={entry.photo} alt="Build" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ) : (
                  <div style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg, rgba(245,166,35,0.05), rgba(245,166,35,0.02))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
                    📷
                  </div>
                )}
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-white)', fontSize: '14px' }}>{entry.studentName || 'Anonymous'}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{entry.institution || '—'}</div>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-pill)',
                      background: entry.approved ? 'rgba(57,255,133,0.08)' : 'rgba(245,166,35,0.08)',
                      color: entry.approved ? 'var(--success-green)' : 'var(--accent-amber)',
                      border: `1px solid ${entry.approved ? 'rgba(57,255,133,0.25)' : 'rgba(245,166,35,0.25)'}`,
                    }}>
                      {entry.approved ? '✓ Approved' : '⏳ Pending'}
                    </span>
                  </div>
                  {entry.caption && (
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '12px', fontStyle: 'italic' }}>
                      "{entry.caption}"
                    </p>
                  )}
                  {entry.kitTag && (
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-pill)', background: 'rgba(245,166,35,0.08)', color: 'var(--accent-amber)', border: '1px solid rgba(245,166,35,0.2)', display: 'inline-block', marginBottom: '12px' }}>
                      {entry.kitTag}
                    </span>
                  )}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    {!entry.approved && (
                      <button className="admin-btn admin-btn-primary" style={{ flex: 1, fontSize: '12px' }} onClick={() => approveEntry(entry.id)}>✓ Approve</button>
                    )}
                    <button className="admin-btn admin-btn-danger" style={{ flex: 1, fontSize: '12px' }} onClick={() => rejectEntry(entry.id)}>✕ Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
