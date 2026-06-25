'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { useAdmin } from '@/context/AdminContext';
import { useData } from '@/context/DataContext';

export default function AdminContent() {
  const { admin } = useAdmin();
  const router = useRouter();
  const { hero, setHero, about, setAbout, footer, setFooter } = useData();
  const [saved, setSaved] = useState('');

  useEffect(() => { if (!admin) router.push('/admin/login'); }, [admin, router]);
  if (!admin) return null;

  const save = (key) => { setSaved(key); setTimeout(() => setSaved(''), 2000); };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h1 className="admin-page-title">Content Management</h1>
        <p className="admin-page-subtitle">Edit all website text, headings, and paragraphs.</p>

        {/* Hero Section */}
        <div className="admin-card">
          <h3 className="admin-card-title">HERO SECTION</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Heading Line 1</label>
              <input className="form-input" value={hero.headingLine1} onChange={e => setHero({ ...hero, headingLine1: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Heading Line 2 (Typewriter)</label>
              <input className="form-input" value={hero.headingLine2} onChange={e => setHero({ ...hero, headingLine2: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Subtext</label>
              <textarea className="form-textarea" value={hero.subtext} onChange={e => setHero({ ...hero, subtext: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Primary CTA Label</label>
              <input className="form-input" value={hero.ctaPrimary.label} onChange={e => setHero({ ...hero, ctaPrimary: { ...hero.ctaPrimary, label: e.target.value } })} />
            </div>
            <div className="form-group">
              <label className="form-label">Countdown Target Date</label>
              <input className="form-input" type="datetime-local" value={hero.countdownTarget ? hero.countdownTarget.slice(0, 16) : ''} onChange={e => setHero({ ...hero, countdownTarget: new Date(e.target.value).toISOString() })} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <label className="form-label" style={{ margin: 0 }}>Show Countdown</label>
              <div className={`admin-toggle ${hero.countdownEnabled ? 'active' : ''}`} onClick={() => setHero({ ...hero, countdownEnabled: !hero.countdownEnabled })} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button className="admin-btn admin-btn-primary" onClick={() => save('hero')}>SAVE HERO</button>
              {saved === 'hero' && <span style={{ color: 'var(--success-green)', fontSize: '13px' }}>✓ Saved!</span>}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="admin-card">
          <h3 className="admin-card-title">ABOUT SECTION</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Section Label</label>
              <input className="form-input" value={about.sectionLabel} onChange={e => setAbout({ ...about, sectionLabel: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Heading</label>
              <input className="form-input" value={about.heading} onChange={e => setAbout({ ...about, heading: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Body Text</label>
              <textarea className="form-textarea" style={{ minHeight: '120px' }} value={about.body} onChange={e => setAbout({ ...about, body: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Quote Text</label>
              <textarea className="form-textarea" value={about.quote} onChange={e => setAbout({ ...about, quote: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Quote Attribution</label>
              <input className="form-input" value={about.quoteAttribution} onChange={e => setAbout({ ...about, quoteAttribution: e.target.value })} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button className="admin-btn admin-btn-primary" onClick={() => save('about')}>SAVE ABOUT</button>
              {saved === 'about' && <span style={{ color: 'var(--success-green)', fontSize: '13px' }}>✓ Saved!</span>}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="admin-card">
          <h3 className="admin-card-title">FOOTER</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Tagline</label>
              <input className="form-input" value={footer.tagline} onChange={e => setFooter({ ...footer, tagline: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-textarea" value={footer.description} onChange={e => setFooter({ ...footer, description: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Instagram URL</label>
              <input className="form-input" value={footer.social.instagram} onChange={e => setFooter({ ...footer, social: { ...footer.social, instagram: e.target.value } })} />
            </div>
            <div className="form-group">
              <label className="form-label">LinkedIn URL</label>
              <input className="form-input" value={footer.social.linkedin} onChange={e => setFooter({ ...footer, social: { ...footer.social, linkedin: e.target.value } })} />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Email</label>
              <input className="form-input" type="email" value={footer.social.email} onChange={e => setFooter({ ...footer, social: { ...footer.social, email: e.target.value } })} />
            </div>
            <div className="form-group">
              <label className="form-label">Bottom Strip Text</label>
              <input className="form-input" value={footer.bottomText} onChange={e => setFooter({ ...footer, bottomText: e.target.value })} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button className="admin-btn admin-btn-primary" onClick={() => save('footer')}>SAVE FOOTER</button>
              {saved === 'footer' && <span style={{ color: 'var(--success-green)', fontSize: '13px' }}>✓ Saved!</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
