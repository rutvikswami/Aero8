'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { useAdmin } from '@/context/AdminContext';
import { useData } from '@/context/DataContext';

export default function AdminSections() {
  const { admin } = useAdmin();
  const router = useRouter();
  const { sections, setSections } = useData();
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (!admin) router.push('/admin/login'); }, [admin, router]);
  if (!admin) return null;

  const sectionLabels = {
    hero: 'Hero Section',
    about: 'About AERO8',
    team: 'Team Section',
    kitUniverse: 'Kit Universe',
    workshopBooking: 'Workshop Booking',
    courses: 'Courses',
    store: 'Store',
    missionZone: 'Mission Zone',
    studentLeaderboard: 'Student Leaderboard',
    institutionLeaderboard: 'Institution Leaderboard',
    communityShowcase: 'Community Showcase',
    faq: 'FAQ Section',
    footer: 'Footer',
  };

  const toggle = (key) => {
    setSections({ ...sections, [key]: !sections[key] });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h1 className="admin-page-title">Section Toggles</h1>
        <p className="admin-page-subtitle">
          Turn sections ON or OFF across the entire website instantly. Data is preserved — nothing is deleted.
        </p>
        {saved && (
          <div style={{ padding: '12px 20px', background: 'rgba(57,255,133,0.08)', border: '1px solid rgba(57,255,133,0.2)', borderRadius: '8px', color: 'var(--success-green)', fontSize: '13px', marginBottom: '24px' }}>
            ✓ Section visibility updated
          </div>
        )}
        <div className="admin-card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {Object.entries(sectionLabels).map(([key, label], i) => (
              <div key={key} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 0', borderBottom: i < Object.keys(sectionLabels).length - 1 ? '1px solid var(--border-color)' : 'none',
              }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-white)' }}>{label}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {sections[key] ? 'Visible to public' : 'Hidden from public'}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '12px', color: sections[key] ? 'var(--success-green)' : 'var(--danger-red)', fontWeight: 700 }}>
                    {sections[key] ? 'ON' : 'OFF'}
                  </span>
                  <div className={`admin-toggle ${sections[key] ? 'active' : ''}`} onClick={() => toggle(key)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
