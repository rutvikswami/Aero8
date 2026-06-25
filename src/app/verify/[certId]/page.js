'use client';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useData } from '@/context/DataContext';

export default function VerifyPage() {
  const params = useParams();
  const { certificates } = useData();
  const certId = params.certId;

  // Mock some pre-existing certificates for demo
  const mockCerts = [
    {
      id: 'A8-2025-1001',
      studentName: 'Arjun Sharma',
      courseName: 'Build Your First Mars Rover',
      issuedDate: '2025-06-01',
      status: 'Valid',
      facilitator: 'Vimal — Chief Navigator',
      founder: 'Bharaath — Mission Commander',
    },
  ];

  const allCerts = [...mockCerts, ...(certificates || [])];
  const cert = allCerts.find(c => c.id === certId);

  return (
    <>
      <Navbar />
      <div className="verify-page">
        <div className="container">
          <div className="verify-card">
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>
              {cert ? (cert.status === 'Valid' ? '✅' : '❌') : '🔍'}
            </div>
            {cert ? (
              <>
                <span className={`verify-status ${cert.status === 'Valid' ? 'valid' : 'invalid'}`}>
                  {cert.status === 'Valid' ? '✓ VERIFIED' : '✕ REVOKED'}
                </span>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, margin: '16px 0 8px' }}>
                  Certificate of Completion
                </h1>
                <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '24px', textAlign: 'left', marginTop: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '4px' }}>AWARDED TO</div>
                      <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent-amber)' }}>{cert.studentName}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '4px' }}>COURSE</div>
                      <div style={{ fontSize: '15px', color: 'var(--text-white)' }}>{cert.courseName}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '4px' }}>DATE ISSUED</div>
                      <div style={{ fontSize: '15px', color: 'var(--text-white)' }}>{cert.issuedDate}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '4px' }}>CERTIFICATE ID</div>
                      <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{cert.id}</div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '24px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  Verified by AERO8 Robotics · Bangalore, India
                </div>
              </>
            ) : (
              <>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--danger-red)', marginBottom: '12px' }}>
                  Certificate Not Found
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                  No certificate with ID <strong style={{ color: 'var(--text-white)', fontFamily: 'monospace' }}>{certId}</strong> was found.
                  <br />Please check the ID and try again.
                </p>
                <p style={{ marginTop: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  Demo: Try <a href="/verify/A8-2025-1001" style={{ color: 'var(--accent-amber)' }}>/verify/A8-2025-1001</a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
