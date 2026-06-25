import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy | AERO8 Robotics',
  description: 'AERO8 Robotics Privacy Policy — how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      content: `When you register on AERO8, we collect information you provide directly, such as your name, email address, institution, city, grade, and profile details. When you interact with our platform — completing courses, earning points, submitting showcase photos, or booking workshops — we collect records of those activities.`,
    },
    {
      title: 'How We Use Your Information',
      content: `We use your information to operate the AERO8 platform, track course progress and certifications, display leaderboard rankings, moderate community showcase submissions, process workshop bookings, and communicate updates about your learning journey. We do not sell your personal data to third parties.`,
    },
    {
      title: 'Data Storage',
      content: `AERO8 is currently a client-side application. Most of your data is stored locally in your browser using localStorage. We may use analytics tools to understand how users interact with our platform. Workshop booking information submitted through our forms is stored on our servers for coordination purposes.`,
    },
    {
      title: 'Certificates and Verifications',
      content: `AERO8 completion certificates are publicly verifiable via a unique certificate ID. When you earn a certificate, the certificate ID, your name, and the course title may be accessible to anyone who has the certificate verification link. This is intentional to support authentic certificate verification.`,
    },
    {
      title: 'Community Showcase',
      content: `Photos and build submissions you upload to the Community Showcase may be displayed publicly on the AERO8 website after admin moderation. By submitting to the showcase, you grant AERO8 permission to display your build photo and associated caption on our website.`,
    },
    {
      title: 'Children\'s Privacy',
      content: `AERO8 serves students of all ages, including those under 18. We do not knowingly collect sensitive personal information from children. Workshop bookings made on behalf of students are processed with consent from teachers or school administrators. Parents may contact us to review or remove student data.`,
    },
    {
      title: 'Your Rights',
      content: `You may request deletion of your account and associated data at any time by contacting us at team@aero8.in. You may also update your profile information through your student dashboard. Workshop booking records may be retained for administrative purposes.`,
    },
    {
      title: 'Contact Us',
      content: `If you have questions about this Privacy Policy or your data, contact us at team@aero8.in. We are a student-led startup committed to handling your data responsibly.`,
    },
  ];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--accent-amber)', textTransform: 'uppercase', paddingLeft: '16px', borderLeft: '3px solid var(--accent-amber)' }}>Legal</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, color: 'var(--text-white)', marginBottom: '16px', lineHeight: 1.2 }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '48px' }}>
            Last updated: June 2025 · Effective immediately
          </p>

          <p style={{ fontSize: '16px', color: 'var(--text-muted-light)', lineHeight: 1.8, marginBottom: '48px', padding: '24px', background: 'rgba(245,166,35,0.04)', border: '1px solid rgba(245,166,35,0.12)', borderRadius: '8px' }}>
            AERO8 Robotics is a student-led startup from Bangalore. We believe in being transparent about how we handle your data. This policy explains what information we collect, how we use it, and how we protect it.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {sections.map((section, i) => (
              <div key={i}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-amber)', color: '#000', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                  {section.title}
                </h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted-light)', lineHeight: 1.8 }}>{section.content}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '60px', padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Questions about your privacy?</p>
            <a href="mailto:team@aero8.in" style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', padding: '10px 24px', background: 'var(--accent-amber)', color: '#000', borderRadius: '4px' }}>
              CONTACT US →
            </a>
          </div>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <Link href="/terms" style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'underline', marginRight: '24px' }}>Terms & Conditions</Link>
            <Link href="/" style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'underline' }}>Back to Home</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
