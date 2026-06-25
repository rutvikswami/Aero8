'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AuthModal from '@/components/AuthModal';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { generateId } from '@/utils/storage';

export default function ShowcasePage() {
  const { showcaseEntries, setShowcaseEntries, sections } = useData();
  const { student, setShowAuthModal, addPoints } = useAuth();
  const [filter, setFilter] = useState('All');
  const [showUpload, setShowUpload] = useState(false);
  const [form, setForm] = useState({ caption: '', kitUsed: 'Kit 01' });

  const kits = ['All', 'Kit 01', 'Kit 02', 'Kit 03', 'Kit 04'];

  // Mock showcase data + real entries
  const mockEntries = [
    { id: 'se1', caption: 'My Mars Rover navigating the obstacle course!', studentName: 'Arjun S.', school: 'DPS Bangalore', kit: 'Kit 01', likes: 24, approved: true },
    { id: 'se2', caption: 'Built this in 3 hours at the AERO8 workshop. Incredible experience!', studentName: 'Priya N.', school: 'VIT Vellore', kit: 'Kit 01', likes: 18, approved: true },
    { id: 'se3', caption: 'Circuit assembly complete — Volt is online!', studentName: 'Rahul M.', school: 'RV College', kit: 'Kit 02', likes: 31, approved: true },
    { id: 'se4', caption: 'Line follower following the perfect path!', studentName: 'Meera K.', school: 'NPS HSR', kit: 'Kit 02', likes: 12, approved: true },
    { id: 'se5', caption: 'First robot ever. Proud AERO8 engineer!', studentName: 'Sanya K.', school: 'KV Mysore', kit: 'Kit 01', likes: 42, approved: true },
  ];

  const allEntries = [
    ...mockEntries,
    ...(showcaseEntries || []).filter(e => e.approved),
  ];

  const filtered = filter === 'All' ? allEntries : allEntries.filter(e => e.kit === filter);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!student) { setShowAuthModal(true); return; }
    const entry = {
      id: generateId(),
      caption: form.caption,
      studentName: student.name,
      school: student.institution || 'Unknown',
      kit: form.kitUsed,
      likes: 0,
      approved: false, // Goes to moderation
    };
    setShowcaseEntries(prev => [...(prev || []), entry]);
    addPoints(30);
    setShowUpload(false);
    setForm({ caption: '', kitUsed: 'Kit 01' });
    alert('Submitted for review! It will appear once approved by the AERO8 team.');
  };

  return (
    <>
      <Navbar />
      <AuthModal />
      <div className="showcase-page">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div className="section-label">COMMUNITY</div>
              <h1 className="section-heading">Robot Showcase</h1>
              <p className="section-subtext">
                Real robots. Real students. Real engineering.
              </p>
            </div>
            <button className="btn-primary" onClick={() => student ? setShowUpload(!showUpload) : setShowAuthModal(true)}>
              + SHARE YOUR BUILD
            </button>
          </div>

          {showUpload && student && (
            <div className="form-card" style={{ marginBottom: '40px' }}>
              <h3 className="form-title">SHARE YOUR BUILD</h3>
              <form className="form-grid" onSubmit={handleUpload}>
                <div className="form-group full-width">
                  <label className="form-label">Caption</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Tell us about your build..."
                    value={form.caption}
                    onChange={(e) => setForm({ ...form, caption: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Kit Used</label>
                  <select className="form-select" value={form.kitUsed} onChange={(e) => setForm({ ...form, kitUsed: e.target.value })}>
                    <option>Kit 01</option><option>Kit 02</option><option>Kit 03</option><option>Kit 04</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Photo</label>
                  <input type="file" accept="image/*" className="form-input" />
                </div>
                <div className="full-width" style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" className="btn-primary">SUBMIT FOR REVIEW</button>
                  <button type="button" className="btn-secondary" onClick={() => setShowUpload(false)}>CANCEL</button>
                </div>
              </form>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {kits.map(k => (
              <button key={k} className={`filter-btn ${filter === k ? 'active' : ''}`} onClick={() => setFilter(k)}>
                {k}
              </button>
            ))}
          </div>

          <div className="showcase-masonry">
            {filtered.map(entry => (
              <div key={entry.id} className="showcase-item">
                <div className="showcase-image" style={{ height: `${180 + (entry.id.charCodeAt(0) % 3) * 60}px` }}>
                  <span className="showcase-image-icon">🤖</span>
                </div>
                <div className="showcase-info">
                  <p className="showcase-caption">{entry.caption}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <span className="showcase-meta">
                      {entry.studentName} · {entry.school}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--accent-amber)' }}>
                      ❤ {entry.likes}
                    </span>
                  </div>
                  <span style={{ fontSize: '10px', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 700 }}>
                    {entry.kit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <BackToTop />
    </>
  );
}
