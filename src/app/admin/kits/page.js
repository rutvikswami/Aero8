'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { useAdmin } from '@/context/AdminContext';
import { useData } from '@/context/DataContext';

export default function AdminKits() {
  const { admin } = useAdmin();
  const router = useRouter();
  const { kits, setKits } = useData();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => { if (!admin) router.push('/admin/login'); }, [admin, router]);
  if (!admin) return null;

  const statusOpts = ['Available Now', 'Pre-order Open', 'Coming Soon'];

  const startEdit = (kit) => {
    setEditing(kit.id);
    setForm({
      name: kit.name, missionTitle: kit.missionTitle, status: kit.status,
      accentColor: kit.accentColor, storyTeaser: kit.storyTeaser,
    });
  };
  const saveEdit = () => {
    setKits(kits.map(k => k.id === editing ? { ...k, ...form } : k));
    setEditing(null);
  };

  const kitAccentColors = { 'kit-01': '#F5A623', 'kit-02': '#39FF85', 'kit-03': '#3AA0FF', 'kit-04': '#FF3A3A' };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h1 className="admin-page-title">Kits & Story</h1>
        <p className="admin-page-subtitle">Manage kit details, story content, and availability status.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
          {(kits || []).map(kit => (
            <div key={kit.id} className="admin-card" style={{ borderLeft: `3px solid ${kit.accentColor}` }}>
              {editing === kit.id ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 className="admin-card-title" style={{ color: form.accentColor }}>EDITING {kit.kitNumber}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Kit Name</label>
                      <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Mission Title (Chapter)</label>
                      <input className="form-input" value={form.missionTitle} onChange={e => setForm({ ...form, missionTitle: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Status</label>
                      <select className="form-select" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                        {statusOpts.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Accent Color</label>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input type="color" value={form.accentColor} onChange={e => setForm({ ...form, accentColor: e.target.value })}
                          style={{ width: '40px', height: '40px', padding: '2px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer' }} />
                        <input className="form-input" value={form.accentColor} onChange={e => setForm({ ...form, accentColor: e.target.value })} style={{ flex: 1 }} />
                      </div>
                    </div>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label className="form-label">Story Teaser</label>
                      <textarea className="form-textarea" style={{ minHeight: '120px' }} value={form.storyTeaser} onChange={e => setForm({ ...form, storyTeaser: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="admin-btn admin-btn-primary" onClick={saveEdit}>SAVE CHANGES</button>
                    <button className="admin-btn admin-btn-secondary" onClick={() => setEditing(null)}>CANCEL</button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', color: kit.accentColor, letterSpacing: '0.15em' }}>{kit.kitNumber}</span>
                      <h3 style={{ fontWeight: 700, color: 'var(--text-white)', fontSize: '18px' }}>{kit.name}</h3>
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 10px', borderRadius: 'var(--radius-pill)',
                        background: kit.status === 'Available Now' ? 'rgba(57,255,133,0.08)' : 'rgba(245,166,35,0.08)',
                        color: kit.status === 'Available Now' ? 'var(--success-green)' : kit.status === 'Pre-order Open' ? 'var(--accent-amber)' : 'var(--text-muted)',
                        border: `1px solid ${kit.status === 'Available Now' ? 'rgba(57,255,133,0.25)' : 'rgba(245,166,35,0.25)'}`,
                      }}>{kit.status}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: kit.accentColor, fontWeight: 600, marginBottom: '8px' }}>"{kit.missionTitle}"</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '12px', maxWidth: '600px' }}>{kit.storyTeaser}</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {(kit.characters || []).map(c => (
                        <span key={c.name} style={{ fontSize: '11px', padding: '2px 10px', borderRadius: 'var(--radius-pill)', background: c.isVillain ? 'rgba(255,58,58,0.1)' : 'rgba(255,255,255,0.05)', color: c.isVillain ? 'var(--danger-red)' : 'var(--text-muted)', border: `1px solid ${c.isVillain ? 'rgba(255,58,58,0.2)' : 'var(--border-color)'}` }}>
                          {c.isVillain ? '⚡' : '•'} {c.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="admin-btn admin-btn-secondary" style={{ flexShrink: 0 }} onClick={() => startEdit(kit)}>Edit</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
