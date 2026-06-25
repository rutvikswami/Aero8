'use client';
import Link from 'next/link';
import { useData } from '@/context/DataContext';

export default function Footer() {
  const { footer, navLinks, sections } = useData();
  if (!sections.footer) return null;

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Kits', href: '/#kits' },
    { label: 'Workshop', href: '/workshop' },
    { label: 'Courses', href: '/courses' },
    { label: 'Store', href: '/store' },
    { label: 'Mission Zone', href: '/mission-zone' },
    { label: 'Team', href: '/#team' },
    { label: 'FAQ', href: '/#faq' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">AERO8</div>
            <div className="footer-brand-sub">ROBOTICS</div>
            <div className="footer-tagline">{footer.tagline}</div>
            <div className="footer-desc">{footer.description}</div>
          </div>
          <div>
            <div className="footer-col-title">Quick Links</div>
            <div className="footer-links">
              {quickLinks.map(link => (
                <Link key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-col-title">Connect</div>
            <div className="footer-social-links">
              <a href={footer.social.instagram} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <span className="footer-social-icon">📸</span>
                @aero8robotics
              </a>
              <a href={footer.social.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <span className="footer-social-icon">💼</span>
                AERO8 Robotics
              </a>
              <a href={`mailto:${footer.social.email}`} className="footer-social-link">
                <span className="footer-social-icon">✉️</span>
                {footer.social.email}
              </a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Legal</div>
            <div className="footer-links">
              <div className="footer-legal-text">{footer.copyright}</div>
              <div className="footer-legal-text">{footer.address}</div>
              <Link href="/privacy" className="footer-link">Privacy Policy</Link>
              <Link href="/terms" className="footer-link">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-text">{footer.bottomText}</div>
        </div>
      </div>
    </footer>
  );
}
