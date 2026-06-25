'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AuthModal from '@/components/AuthModal';
import { useData } from '@/context/DataContext';

const bgGradients = {
  'kit-01': 'linear-gradient(135deg, #2a1000 0%, #0a0a0a 50%, #1a0500 100%)',
  'kit-02': 'linear-gradient(135deg, #001a0a 0%, #0a0a0a 50%, #000a05 100%)',
  'kit-03': 'linear-gradient(135deg, #001020 0%, #0a0a0a 50%, #000510 100%)',
  'kit-04': 'linear-gradient(135deg, #200505 0%, #0a0a0a 50%, #100000 100%)',
};

const characterEmojis = {
  'A8': '🤖', 'Volt': '🔋', 'Spin': '⚙️', 'Beam': '📡',
  'Surge': '⚡', 'Shadow': '👤', 'Gravity': '🌀', 'The Static': '💀',
};

export default function KitDetailPage() {
  const params = useParams();
  const { kits } = useData();

  const kit = kits.find(k => k.id === params.kitId);
  if (!kit) {
    return (
      <>
        <Navbar /><AuthModal />
        <div className="courses-page"><div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3 className="empty-state-title">Kit not found</h3>
          </div>
        </div></div>
        <Footer />
      </>
    );
  }

  const statusColor = kit.status === 'Available Now' ? 'var(--success-green)' : 'var(--text-muted)';

  return (
    <>
      <Navbar />
      <AuthModal />
      <div className="kit-detail-page">
        <div className="kit-hero">
          <div className="kit-hero-bg" style={{ background: bgGradients[kit.id] || bgGradients['kit-01'] }} />
          <div className="kit-hero-content">
            <div className="kit-number-badge" style={{ color: kit.accentColor, borderColor: `${kit.accentColor}60` }}>
              {kit.kitNumber}
            </div>
            <h1 className="kit-hero-name" style={{ color: kit.accentColor }}>
              {kit.name.toUpperCase()}
            </h1>
            <div className="kit-mission-title">{kit.missionTitle}</div>
            <p className="kit-story-teaser">{kit.storyTeaser}</p>
            <div style={{ marginTop: '24px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', padding: '6px 16px',
                borderRadius: 'var(--radius-pill)', border: '1px solid', color: statusColor,
                borderColor: statusColor, background: `${statusColor}10`,
              }}>
                {kit.status}
              </span>
              <Link href="/store" className="btn-secondary" style={{ padding: '6px 20px', fontSize: '12px' }}>
                VIEW IN STORE →
              </Link>
            </div>
          </div>
        </div>

        <div className="kit-characters-section">
          <div className="container">
            <h2 className="section-heading" style={{ textAlign: 'center' }}>Meet the Characters</h2>
          </div>
          <div className="characters-scroll">
            {kit.characters.map((char) => (
              <div key={char.name} className={`character-card ${char.isVillain ? 'villain' : ''}`}>
                <div className="character-avatar" style={{
                  background: char.isVillain
                    ? 'linear-gradient(135deg, rgba(255,58,58,0.15), rgba(255,58,58,0.05))'
                    : `linear-gradient(135deg, ${kit.accentColor}20, ${kit.accentColor}08)`,
                }}>
                  {characterEmojis[char.name] || '🤖'}
                </div>
                <div className="character-name" style={{ color: char.isVillain ? 'var(--danger-red)' : kit.accentColor }}>
                  {char.name}
                </div>
                <div className="character-role" style={{ color: char.isVillain ? 'var(--danger-red)' : 'var(--text-muted)' }}>
                  {char.role}
                </div>
                <p className="character-desc">{char.description}</p>
              </div>
            ))}
          </div>
        </div>

        {kit.components && (
          <div className="container" style={{ paddingBottom: '80px' }}>
            <h2 className="section-heading" style={{ textAlign: 'center' }}>What&apos;s in the Kit</h2>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '12px', maxWidth: '800px', margin: '40px auto 0',
            }}>
              {kit.components.map((comp, i) => (
                <div key={i} className="component-list-item" style={{
                  padding: '12px 16px', background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)', borderRadius: '6px',
                }}>
                  <span className="component-dot" style={{ background: kit.accentColor }} />
                  {comp}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
      <BackToTop />
    </>
  );
}
