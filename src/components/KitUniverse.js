'use client';
import Link from 'next/link';
import { useData } from '@/context/DataContext';

const kitIcons = {
  'kit-01': '🚀',
  'kit-02': '🔦',
  'kit-03': '🧗',
  'kit-04': '⚔️',
};

export default function KitUniverse() {
  const { kits, sections } = useData();
  if (!sections.kitUniverse) return null;

  const getStatusStyle = (status) => {
    if (status === 'Available Now') return { color: '#39FF85', borderColor: 'rgba(57,255,133,0.3)', background: 'rgba(57,255,133,0.08)' };
    if (status === 'Pre-order Open') return { color: '#F5A623', borderColor: 'rgba(245,166,35,0.3)', background: 'rgba(245,166,35,0.08)' };
    return { color: '#888888', borderColor: 'rgba(136,136,136,0.3)', background: 'rgba(136,136,136,0.08)' };
  };

  const getVillain = (kit) => kit.characters.find(c => c.isVillain);

  return (
    <section className="kits-section" id="kits">
      <div className="container">
        <h2 className="section-heading">THE AERO8 UNIVERSE</h2>
        <p className="section-subtext" style={{ textAlign: 'center', margin: '0 auto' }}>
          One story. Four missions. Every kit is a chapter.
        </p>
      </div>

      <div className="kit-shelf">
        {kits.map((kit) => {
          const villain = getVillain(kit);
          const statusStyle = getStatusStyle(kit.status);
          return (
            <div key={kit.id} className="kit-book">
              <div className="kit-book-inner">
                <div className="kit-book-front" style={{ borderColor: `${kit.accentColor}30` }}>
                  <div className="kit-book-number" style={{ color: kit.accentColor, borderColor: `${kit.accentColor}40` }}>
                    {kit.kitNumber}
                  </div>
                  <div className="kit-book-icon">{kitIcons[kit.id] || '🤖'}</div>
                  <div className="kit-book-name" style={{ color: kit.accentColor }}>
                    {kit.name.toUpperCase()}
                  </div>
                  <div className="kit-book-status" style={statusStyle}>
                    {kit.status}
                  </div>
                </div>
                <div className="kit-book-back" style={{ borderColor: `${kit.accentColor}30` }}>
                  <div className="kit-back-title" style={{ color: kit.accentColor }}>
                    {kit.missionTitle}
                  </div>
                  <p className="kit-back-teaser">
                    {kit.storyTeaser.length > 120 ? kit.storyTeaser.slice(0, 120) + '...' : kit.storyTeaser}
                  </p>
                  {villain && (
                    <div className="kit-back-villain">
                      ⚡ Villain: {villain.name}
                    </div>
                  )}
                  <Link
                    href={`/kits/${kit.id}`}
                    className="kit-back-cta"
                    style={{ color: kit.accentColor, borderColor: kit.accentColor }}
                  >
                    READ CHAPTER →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
