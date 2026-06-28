'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useData } from '@/context/DataContext';

function TypewriterText({ texts }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = texts[currentIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentFullText) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(prev =>
        isDeleting ? prev.slice(0, -1) : currentFullText.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts]);

  return (
    <span>
      {displayText}
      <span className="hero-typewriter-cursor" />
    </span>
  );
}

function CountdownTimer({ targetDate, label }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setExpired(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (expired) {
    return <div className="countdown-expired">REGISTRATION CLOSED</div>;
  }

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="countdown-wrapper">
      <div className="countdown-label">{label}</div>
      <div className="countdown-blocks">
        {[
          { value: pad(timeLeft.days), unit: 'Days' },
          { value: pad(timeLeft.hours), unit: 'Hours' },
          { value: pad(timeLeft.minutes), unit: 'Mins' },
          { value: pad(timeLeft.seconds), unit: 'Secs' },
        ].map((block) => (
          <div key={block.unit} className="countdown-block">
            <div className="countdown-number">{block.value}</div>
            <div className="countdown-unit">{block.unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const { hero, sections } = useData();
  const [showVideoModal, setShowVideoModal] = useState(false);

  if (!sections.hero) return null;

  return (
    <>
      <section className="hero" id="home">
        {/* Background video and overlays */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video-bg"
          poster="/hero-fallback.png"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="hero-fallback-bg" style={{ backgroundImage: 'url("/hero-fallback.png")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="hero-grain" />
        <div className="hero-vignette" />

        {/* Dashboard Frame Grid lines */}
        <div className="hero-grid-overlay" />

        {/* Left Sidebar Console */}
        <aside className="hero-sidebar-left">
          <div className="sidebar-logo">
            <span className="logo-a8-glowing">A8</span>
          </div>
          
          <div className="sidebar-section">
            <span className="sidebar-section-title">SYSTEMS</span>
            <nav className="sidebar-systems-nav">
              <div className="system-nav-item">
                <div className="system-icon-box">
                  <svg className="system-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <span className="system-nav-label">VOLT</span>
              </div>
              <div className="system-nav-item">
                <div className="system-icon-box">
                  <svg className="system-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                </div>
                <span className="system-nav-label">BEAM</span>
              </div>
              <div className="system-nav-item">
                <div className="system-icon-box">
                  <svg className="system-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <line x1="12" y1="2" x2="12" y2="22"></line>
                  </svg>
                </div>
                <span className="system-nav-label">SPIN</span>
              </div>
              <div className="system-nav-item">
                <div className="system-icon-box">
                  <svg className="system-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <span className="system-nav-label">SURGE</span>
              </div>
            </nav>
          </div>

          <div className="sidebar-section social-section">
            <span className="sidebar-section-title">FOLLOW US</span>
            <div className="sidebar-social-links">
              <a href="https://instagram.com/aero8robotics" target="_blank" rel="noopener noreferrer" className="sidebar-social-icon" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="sidebar-social-icon" aria-label="X">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768 M20 4l-6.768 6.768"></path>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="sidebar-social-icon" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              <a href="https://linkedin.com/company/aero8robotics" target="_blank" rel="noopener noreferrer" className="sidebar-social-icon" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </aside>

        {/* Right Sidebar Console Indicators */}
        <aside className="hero-sidebar-right">
          <span className="sidebar-indicator-num">01</span>
          <div className="sidebar-indicator-dots">
            <span className="sidebar-dot"></span>
            <span className="sidebar-dot"></span>
            <span className="sidebar-dot active"></span>
            <span className="sidebar-dot"></span>
            <span className="sidebar-dot"></span>
          </div>
          <span className="sidebar-indicator-num">05</span>
        </aside>

        {/* Center Main Content */}
        <div className="hero-console-content">
          <div className="hero-mission-prefix animate-fade-in-up">
            <span className="prefix-line">—</span> MISSION: BEYOND BOUNDARIES
          </div>

          <h1 className="hero-title-large animate-fade-in-up delay-100">
            AERO8
          </h1>

          <h2 className="hero-subtitle-large animate-fade-in-up delay-200">
            EXPLORATION. ENGINEERED.<br />FOR THE IMPOSSIBLE.
          </h2>

          <p className="hero-description-text animate-fade-in-up delay-300">
            AERO8 Robotics builds advanced exploration robots and modular kits for the innovators of tomorrow.
          </p>

          <div className="hero-ctas-console animate-fade-in-up delay-400">
            <Link href={hero.ctaPrimary?.href || '/workshop'} className="btn-console-primary">
              VIEW MISSION <span className="btn-arrow">→</span>
            </Link>
          </div>

          {/* Mission Details Box */}
          <div className="hero-mission-status-box animate-fade-in-up delay-500">
            <div className="status-item border-right">
              <div className="status-icon-wrapper">
                <svg className="status-radar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="1.5" fill="currentColor"></circle>
                  <line x1="12" y1="2" x2="12" y2="6"></line>
                  <line x1="12" y1="18" x2="12" y2="22"></line>
                  <line x1="2" y1="12" x2="6" y2="12"></line>
                  <line x1="18" y1="12" x2="22" y2="12"></line>
                </svg>
              </div>
              <div className="status-text-content">
                <span className="status-title-label">MISSION STATUS</span>
                <span className="status-title-value active-pulse">ACTIVE •</span>
              </div>
            </div>
            <div className="status-item">
              <div className="status-text-content">
                <span className="status-title-label">NEXT OBJECTIVE</span>
                <span className="status-title-value objective-highlight">TERRAIN ANALYSIS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Specifications Bar Grid */}
        <div className="hero-bottom-specs-bar animate-fade-in-up delay-500">
          <div className="spec-column">
            <div className="spec-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <div className="spec-info">
              <h3 className="spec-label">MODULAR DESIGN</h3>
              <p className="spec-desc">Interchangeable parts for limitless possibilities.</p>
            </div>
          </div>
          <div className="spec-column">
            <div className="spec-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <div className="spec-info">
              <h3 className="spec-label">POWER SYSTEM</h3>
              <p className="spec-desc">High-efficiency power for extreme conditions.</p>
            </div>
          </div>
          <div className="spec-column">
            <div className="spec-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="22" y1="12" x2="18" y2="12"></line>
                <line x1="6" y1="12" x2="2" y2="12"></line>
                <line x1="12" y1="6" x2="12" y2="2"></line>
                <line x1="12" y1="22" x2="12" y2="18"></line>
              </svg>
            </div>
            <div className="spec-info">
              <h3 className="spec-label">PRECISION CONTROL</h3>
              <p className="spec-desc">Autonomous navigation with pinpoint accuracy.</p>
            </div>
          </div>
          <div className="spec-column">
            <div className="spec-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="m9 11 2 2 4-4"></path>
              </svg>
            </div>
            <div className="spec-info">
              <h3 className="spec-label">BUILT TO ENDURE</h3>
              <p className="spec-desc">Engineered for the harshest environments.</p>
            </div>
          </div>
          <div className="spec-column download-column">
            <div className="spec-info">
              <h3 className="spec-label">DOWNLOAD SPECS</h3>
              <p className="spec-desc">Get technical details and mission specs.</p>
            </div>
            <a href="/specs.pdf" className="spec-download-circle" aria-label="Download specifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {showVideoModal && (
        <div className="video-modal-overlay" onClick={() => setShowVideoModal(false)}>
          <button className="video-modal-close" onClick={() => setShowVideoModal(false)}>✕</button>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            🎬 Teaser video coming soon
          </div>
        </div>
      )}
    </>
  );
}
