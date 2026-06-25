'use client';
import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { generateId } from '@/utils/storage';

export default function Newsletter() {
  const { newsletterEmails, setNewsletterEmails } = useData();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setNewsletterEmails([...newsletterEmails, { id: generateId(), email, date: Date.now() }]);
    setEmail('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <h3 className="section-heading" style={{ fontSize: '24px' }}>
          Get Mission Updates from AERO8 HQ
        </h3>
        <p className="section-subtext" style={{ textAlign: 'center', margin: '0 auto' }}>
          Join our newsletter for robotics tips, workshop announcements, and universe updates.
        </p>
        {submitted ? (
          <p style={{ color: 'var(--success-green)', marginTop: '24px', fontWeight: 600 }}>
            ✓ You&apos;re on the list! Welcome to the mission.
          </p>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-submit">SUBSCRIBE</button>
          </form>
        )}
      </div>
    </section>
  );
}
