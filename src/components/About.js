'use client';
import { useData } from '@/context/DataContext';

export default function About() {
  const { about, sections } = useData();
  if (!sections.about || !about.visible) return null;

  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-grid">
          <div>
            <div className="section-label">{about.sectionLabel}</div>
            <h2 className="section-heading">{about.heading}</h2>
            <p className="about-body">{about.body}</p>
            <div className="about-stats">
              {about.stats.map((stat, i) => (
                <div key={i} className="about-stat">
                  <div className="about-stat-number">{stat.number}</div>
                  <div className="about-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="about-quote-card">
              <div className="about-quote-mark">"</div>
              <p className="about-quote-text">{about.quote}</p>
              <div className="about-quote-attribution">{about.quoteAttribution}</div>
              <div className="about-stars">
                {[1, 2, 3, 4, 5].map(n => (
                  <span key={n} className="about-star">★</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
