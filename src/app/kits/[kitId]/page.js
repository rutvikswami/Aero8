'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AuthModal from '@/components/AuthModal';
import { useData } from '@/context/DataContext';

const bgGradients = {
  'kit-01': 'radial-gradient(ellipse at center bottom, #2a1000 0%, #0a0a0a 60%, #000000 100%)',
  'kit-02': 'radial-gradient(ellipse at center bottom, #001a0a 0%, #0a0a0a 60%, #000000 100%)',
  'kit-03': 'radial-gradient(ellipse at center bottom, #001020 0%, #0a0a0a 60%, #000000 100%)',
  'kit-04': 'radial-gradient(ellipse at center bottom, #200505 0%, #0a0a0a 60%, #000000 100%)',
};

// Component list detailed descriptions and configurations dynamically selected per kit
const kitDetailedComponents = {
  'kit-01': [
    { name: 'ROVER CHASSIS', qty: 'x1', desc: 'High strength aluminum frame', icon: 'chassis' },
    { name: 'ALL TERRAIN WHEELS', qty: 'x6', desc: 'High grip, durable off-road wheels', icon: 'wheels' },
    { name: 'CONTROL BOARD', qty: 'x1', desc: 'Advanced microcontroller control unit', icon: 'board' },
    { name: 'DEPTH CAMERA', qty: 'x1', desc: 'Stereo vision for obstacle detection', icon: 'camera' },
    { name: 'GEAR MOTORS', qty: 'x6', desc: 'High torque, low noise motors', icon: 'motor' },
    { name: 'BATTERY PACK', qty: 'x1', desc: 'Rechargeable Li-ion power unit', icon: 'battery' },
  ],
  'kit-02': [
    { name: 'ROBOT CHASSIS', qty: 'x1', desc: 'Lightweight tracking robot chassis', icon: 'chassis' },
    { name: 'TRACK WHEELS', qty: 'x2', desc: 'Durable rubber wheels for smooth tracks', icon: 'wheels' },
    { name: 'CONTROL BOARD', qty: 'x1', desc: 'Advanced tracking controller unit', icon: 'board' },
    { name: 'IR SENSOR ARRAY', qty: 'x1', desc: 'Reflective infrared path sensors', icon: 'sensor' },
    { name: 'GEAR MOTORS', qty: 'x2', desc: 'High speed drive motors', icon: 'motor' },
    { name: 'LINE TRACK MAT', qty: 'x1', desc: 'Printed high contrast calibration path', icon: 'mat' },
  ],
  'kit-03': [
    { name: 'SUCTION CHASSIS', qty: 'x1', desc: 'Ultra-light negative pressure frame', icon: 'chassis' },
    { name: 'TRACTION BELTS', qty: 'x2', desc: 'High friction climbing tracks', icon: 'wheels' },
    { name: 'CONTROL BOARD', qty: 'x1', desc: 'Altitude and grip controller unit', icon: 'board' },
    { name: 'ALTITUDE SENSOR', qty: 'x1', desc: 'High precision barometer sensor', icon: 'sensor' },
    { name: 'SUCTION FAN', qty: 'x1', desc: 'High speed vacuum impeller motor', icon: 'motor' },
    { name: 'BATTERY PACK', qty: 'x1', desc: 'Rechargeable high discharge power unit', icon: 'battery' },
  ],
  'kit-04': [
    { name: 'ARMORED CHASSIS', qty: 'x1', desc: 'Impact resistant shield chassis', icon: 'chassis' },
    { name: 'COMBAT WHEELS', qty: 'x4', desc: 'Heavy duty steel hubs & rubber tires', icon: 'wheels' },
    { name: 'CONTROL BOARD', qty: 'x1', desc: 'Arduino compatible drive core', icon: 'board' },
    { name: 'IR REMOTE', qty: 'x1', desc: 'Multi-channel remote transmitter', icon: 'sensor' },
    { name: 'WEAPON SERVO', qty: 'x1', desc: 'Metal gear high torque servo', icon: 'motor' },
    { name: 'ACTIVE WEAPON', qty: 'x1', desc: 'Spinning spinner/flipper kit', icon: 'weapon' },
  ],
};

function ComponentSvgIcon({ type }) {
  if (type === 'chassis') {
    return (
      <svg className="comp-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="15" y1="3" x2="15" y2="21" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
      </svg>
    );
  }
  if (type === 'wheels') {
    return (
      <svg className="comp-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v7M12 15v7M2 12h7M15 12h7" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'board') {
    return (
      <svg className="comp-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <rect x="7" y="7" width="5" height="5" />
        <rect x="15" y="7" width="3" height="1.5" />
        <rect x="15" y="11" width="3" height="1.5" />
        <rect x="7" y="15" width="8" height="3" />
      </svg>
    );
  }
  if (type === 'camera') {
    return (
      <svg className="comp-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="9" cy="13" r="3" />
        <circle cx="17" cy="13" r="3" />
      </svg>
    );
  }
  if (type === 'motor') {
    return (
      <svg className="comp-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="4" y="7" width="12" height="10" rx="2" />
        <line x1="16" y1="12" x2="22" y2="12" />
        <circle cx="10" cy="12" r="2.5" />
        <line x1="4" y1="10" x2="2" y2="10" />
        <line x1="4" y1="14" x2="2" y2="14" />
      </svg>
    );
  }
  if (type === 'battery') {
    return (
      <svg className="comp-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="16" height="10" rx="2" />
        <line x1="22" y1="11" x2="22" y2="13" />
        <line x1="6" y1="12" x2="10" y2="12" />
        <line x1="8" y1="10" x2="8" y2="14" />
      </svg>
    );
  }
  if (type === 'sensor') {
    return (
      <svg className="comp-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg className="comp-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="12" y1="12" x2="22" y2="8.5" />
      <line x1="12" y1="12" x2="2" y2="8.5" />
    </svg>
  );
}

export default function KitDetailPage() {
  const params = useParams();
  const { kits } = useData();

  const kit = kits.find(k => k.id === params.kitId);
  const [activeImg, setActiveImg] = useState('/hero-fallback.png');

  // Hardcoded alternative gallery images for Mars Rover to make presentation stunning
  const galleryImages = [
    '/hero-fallback.png',
    '/hero-fallback.png',
    '/hero-fallback.png',
    '/hero-fallback.png',
  ];

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

  const componentsList = kitDetailedComponents[kit.id] || kitDetailedComponents['kit-01'];

  return (
    <>
      <Navbar />
      <AuthModal />
      
      <div className="kit-detail-container" style={{ background: bgGradients[kit.id] || bgGradients['kit-01'] }}>
        
        {/* Left Sidebar Console (Persistent dashboard) */}
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

        <div className="kit-detail-content-area">
          {/* Breadcrumb Navigation */}
          <div className="kit-breadcrumb-row">
            <Link href="/#kits" className="breadcrumb-link">KITS</Link>
            <span className="breadcrumb-separator">→</span>
            <span className="breadcrumb-active">{kit.kitNumber}</span>
          </div>

          {/* Top Main Hero Split Section */}
          <div className="kit-detail-split-grid">
            
            {/* Left Content Column */}
            <div className="kit-split-left">
              <span className="kit-pill-badge-orange">{kit.kitNumber}</span>
              
              <h1 className="kit-split-main-title">AERO8</h1>
              <h2 className="kit-split-sub-title" style={{ color: kit.accentColor }}>
                {kit.name.toUpperCase()}
              </h2>
              
              <h3 className="kit-split-tagline">Explore. Navigate. Discover.</h3>
              
              <p className="kit-split-description">
                {kit.storyTeaser}
              </p>

              {/* Highlights row */}
              <div className="kit-split-highlights-row">
                <div className="highlight-bullet">
                  <div className="bullet-icon-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9"></circle>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                  <div className="bullet-info-block">
                    <span className="bullet-bold-label">6-WHEEL</span>
                    <span className="bullet-sub-label">ALL TERRAIN</span>
                  </div>
                </div>
                
                <div className="highlight-bullet">
                  <div className="bullet-icon-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <line x1="12" y1="2" x2="12" y2="22"></line>
                    </svg>
                  </div>
                  <div className="bullet-info-block">
                    <span className="bullet-bold-label">AUTONOMOUS</span>
                    <span className="bullet-sub-label">NAVIGATION</span>
                  </div>
                </div>

                <div className="highlight-bullet">
                  <div className="bullet-icon-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5z"></path>
                      <path d="M12 8v8M9 11v2M15 10v4"></path>
                    </svg>
                  </div>
                  <div className="bullet-info-block">
                    <span className="bullet-bold-label">REAL-TIME</span>
                    <span className="bullet-sub-label">DATA TELEMETRY</span>
                  </div>
                </div>

                <div className="highlight-bullet">
                  <div className="bullet-icon-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div className="bullet-info-block">
                    <span className="bullet-bold-label">RUGGED</span>
                    <span className="bullet-sub-label">BUILD QUALITY</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="kit-split-ctas">
                <Link href="/workshop" className="btn-split-workshop-orange">
                  BOOK WORKSHOP <span style={{ marginLeft: '4px' }}>→</span>
                </Link>
                <a href="#specs" className="btn-split-specs-outline">
                  VIEW KIT SPECS 
                  <svg style={{ marginLeft: '8px', width: '15px', height: '15px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Right Gallery Column */}
            <div className="kit-split-right-gallery">
              <div className="gallery-main-display">
                {/* Frame decorations for futuristic display border */}
                <div className="gallery-decor decor-tl" />
                <div className="gallery-decor decor-tr" />
                <div className="gallery-decor decor-bl" />
                <div className="gallery-decor decor-br" />
                <img src={activeImg} alt={kit.name} className="gallery-main-image" />
              </div>
              
              <div className="gallery-sidebar-thumbnails">
                <div className="thumbnails-scroll-stack">
                  {galleryImages.map((imgSrc, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setActiveImg(imgSrc)}
                      className={`gallery-thumb-btn ${activeImg === imgSrc ? 'active' : ''}`}
                    >
                      <img src={imgSrc} alt={`Thumbnail ${idx + 1}`} className={`thumb-img thumb-filter-${idx}`} />
                    </button>
                  ))}
                </div>
                <button className="gallery-view-all-btn">
                  <svg style={{ width: '14px', height: '14px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  <span>VIEW ALL IMAGES</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Grid Details Card Section */}
          <div className="kit-details-double-cards-grid">
            
            {/* Left Card: About This Kit */}
            <div className="kit-details-card dark-card">
              <h2 className="card-heading-title">ABOUT THIS KIT</h2>
              
              <p className="card-description-paragraph">
                This kit comes with all the mechanical parts, electronics, sensors, and code to build your very own Mars Exploration Rover. Perfect for beginners and innovators who want to step into the world of robotics.
              </p>
              
              {/* Parameters metrics list */}
              <div className="card-parameters-metrics">
                <div className="metric-row-item">
                  <div className="metric-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="metric-texts">
                    <span className="metric-label-tag">BEGINNER</span>
                    <span className="metric-label-value">FRIENDLY</span>
                  </div>
                </div>

                <div className="metric-row-item">
                  <div className="metric-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div className="metric-texts">
                    <span className="metric-label-tag">AGE GROUP</span>
                    <span className="metric-label-value">14+</span>
                  </div>
                </div>

                <div className="metric-row-item">
                  <div className="metric-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="metric-texts">
                    <span className="metric-label-tag">ASSEMBLY TIME</span>
                    <span className="metric-label-value">6-8 HOURS</span>
                  </div>
                </div>

                <div className="metric-row-item">
                  <div className="metric-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <div className="metric-texts">
                    <span className="metric-label-tag">DIFFICULTY</span>
                    <span className="metric-label-value">EASY</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: What's Included */}
            <div className="kit-details-card dark-card">
              <h2 className="card-heading-title">WHAT&apos;S INCLUDED</h2>
              
              <div className="card-included-components-grid">
                {componentsList.map((comp, idx) => (
                  <div key={idx} className="included-component-card">
                    <span className="comp-qty-tag">{comp.qty}</span>
                    <div className="comp-icon-wrapper">
                      <ComponentSvgIcon type={comp.icon} />
                    </div>
                    <span className="comp-card-name">{comp.name}</span>
                    <p className="comp-card-desc">{comp.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Specifications Bar Row */}
          <div className="hero-bottom-specs-bar font-spec-aligned" id="specs" style={{ position: 'relative', left: '0', right: '0', width: '100%', marginTop: '60px' }}>
            <div className="spec-column">
              <div className="spec-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <div className="spec-info">
                <h3 className="spec-label">REAL-WORLD EXPERIENCE</h3>
                <p className="spec-desc">Build, code and test a rover like the ones on Mars.</p>
              </div>
            </div>
            <div className="spec-column">
              <div className="spec-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <div className="spec-info">
                <h3 className="spec-label">OPEN SOURCE CODE</h3>
                <p className="spec-desc">Full source code provided to learn and customize.</p>
              </div>
            </div>
            <div className="spec-column">
              <div className="spec-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
              <div className="spec-info">
                <h3 className="spec-label">DETAILED GUIDE</h3>
                <p className="spec-desc">Step-by-step manual to assemble your rover.</p>
              </div>
            </div>
            <div className="spec-column">
              <div className="spec-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                </svg>
              </div>
              <div className="spec-info">
                <h3 className="spec-label">COMMUNITY SUPPORT</h3>
                <p className="spec-desc">Get help from mentors and fellow innovators.</p>
              </div>
            </div>
            <div className="spec-column download-column">
              <div className="spec-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="m9 11 2 2 4-4"></path>
                </svg>
              </div>
              <div className="spec-info">
                <h3 className="spec-label">BUILT TO EXPLORE</h3>
                <p className="spec-desc">Designed to withstand rough terrains and challenges.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
