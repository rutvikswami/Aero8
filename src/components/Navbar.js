'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { navLinks, hero } = useData();
  const { student, setShowAuthModal, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const visibleLinks = navLinks.filter(l => l.visible);

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link href="/" className="nav-brand">
            <span className="nav-brand-name">AERO8</span>
            <span className="nav-brand-sub">ROBOTICS</span>
          </Link>

          <div className="nav-links">
            {visibleLinks.map(link => (
              <Link key={link.id} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {student ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link href="/dashboard" className="nav-link" style={{ fontSize: '12px' }}>
                  {student.name?.split(' ')[0] || 'Dashboard'}
                </Link>
                <button onClick={logout} className="nav-link" style={{ fontSize: '12px', cursor: 'pointer' }}>
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="nav-link"
                style={{ fontSize: '12px', cursor: 'pointer' }}
              >
                Login
              </button>
            )}
            <Link href="/workshop" className="nav-cta">
              {hero.ctaButton || 'Book Workshop'}
            </Link>
            <div
              className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span /><span /><span />
            </div>
          </div>
        </div>
      </nav>

      <div className={`nav-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {visibleLinks.map(link => (
          <Link
            key={link.id}
            href={link.href}
            className="nav-mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        {student ? (
          <>
            <Link href="/dashboard" className="nav-mobile-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <button onClick={() => { logout(); setMenuOpen(false); }} className="nav-mobile-link" style={{ cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <button onClick={() => { setShowAuthModal(true); setMenuOpen(false); }} className="nav-mobile-link" style={{ cursor: 'pointer' }}>Login</button>
        )}
        <Link href="/workshop" className="btn-primary" onClick={() => setMenuOpen(false)}>
          Book Workshop
        </Link>
      </div>
    </>
  );
}
