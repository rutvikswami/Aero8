import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms & Conditions | AERO8 Robotics',
  description: 'AERO8 Robotics Terms & Conditions — rules and guidelines for using our platform.',
};

export default function TermsPage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: `By accessing or using the AERO8 Robotics website, platform, courses, or booking any workshop, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services. These terms apply to all users, including students, teachers, school administrators, and visitors.`,
    },
    {
      title: 'Platform Use',
      content: `The AERO8 platform is designed for educational purposes — specifically for learning robotics through online courses, interactive games, and workshop experiences. You agree to use the platform only for lawful, educational purposes. You may not attempt to hack, reverse-engineer, or interfere with any part of the platform. You may not use automated tools to access or scrape content.`,
    },
    {
      title: 'Student Accounts',
      content: `Students may create free accounts on the AERO8 platform to access courses, earn points, and participate in the leaderboard. You are responsible for maintaining the confidentiality of your account. You agree to provide accurate profile information. Students under 18 should have parental awareness of their use of this platform.`,
    },
    {
      title: 'Workshop Bookings',
      content: `Workshop bookings are subject to availability and confirmation by the AERO8 team. Submitting a booking form does not guarantee a confirmed workshop date. AERO8 will contact you within 48 hours of receiving a booking request. Workshop fees (₹499–699 per student) are collected at the time of workshop confirmation. Cancellations must be made at least 7 days in advance for a full refund.`,
    },
    {
      title: 'Certificates',
      content: `AERO8 certificates are issued upon successful completion of a course assessment with a minimum score of 70%. Certificates are unique, verifiable, and linked to the student's name and completed course. Misrepresentation or fraudulent use of AERO8 certificates is strictly prohibited. AERO8 reserves the right to revoke certificates in cases of academic dishonesty.`,
    },
    {
      title: 'Intellectual Property',
      content: `All content on the AERO8 platform — including but not limited to course materials, storybook content, character designs, AERO8 branding, logos, and educational content — is the intellectual property of AERO8 Robotics. You may not reproduce, distribute, or commercially exploit any AERO8 content without written permission. Educational and personal use is permitted.`,
    },
    {
      title: 'Community Showcase',
      content: `By submitting photos or content to the AERO8 Community Showcase, you grant AERO8 a non-exclusive, royalty-free license to display, share, and promote your submitted content on our website and social media channels. You confirm that submitted photos are your own work and that you have the right to share them. AERO8 moderates all showcase submissions and may reject content that does not comply with our community guidelines.`,
    },
    {
      title: 'Kit Products',
      content: `AERO8 kit products are sold for educational use. Products are shipped after payment confirmation. AERO8 does not guarantee specific delivery timelines. Returns and refunds are handled on a case-by-case basis — contact team@aero8.in within 7 days of receiving a defective product.`,
    },
    {
      title: 'Disclaimer',
      content: `AERO8 Robotics provides its platform and services "as is" without warranty of any kind. We are a student startup and may experience technical limitations. We are not liable for any indirect, incidental, or consequential damages arising from the use of our platform. AERO8 is committed to continuous improvement and appreciates user feedback.`,
    },
    {
      title: 'Changes to Terms',
      content: `AERO8 reserves the right to modify these Terms and Conditions at any time. Changes will be posted on this page with an updated date. Continued use of the platform after changes constitutes acceptance of the updated terms.`,
    },
    {
      title: 'Contact',
      content: `For questions about these Terms and Conditions, contact us at team@aero8.in or reach out on Instagram @aero8robotics. We are based in Bangalore, Karnataka, India.`,
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
            Terms & Conditions
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '48px' }}>
            Last updated: June 2025 · Effective immediately
          </p>

          <p style={{ fontSize: '16px', color: 'var(--text-muted-light)', lineHeight: 1.8, marginBottom: '48px', padding: '24px', background: 'rgba(245,166,35,0.04)', border: '1px solid rgba(245,166,35,0.12)', borderRadius: '8px' }}>
            These Terms and Conditions govern your use of the AERO8 Robotics platform, workshops, courses, products, and community features. Please read these terms carefully before using our services.
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
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Questions about our terms?</p>
            <a href="mailto:team@aero8.in" style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', padding: '10px 24px', background: 'var(--accent-amber)', color: '#000', borderRadius: '4px' }}>
              CONTACT US →
            </a>
          </div>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <Link href="/privacy" style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'underline', marginRight: '24px' }}>Privacy Policy</Link>
            <Link href="/" style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'underline' }}>Back to Home</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
