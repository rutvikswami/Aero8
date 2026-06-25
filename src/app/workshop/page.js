'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AuthModal from '@/components/AuthModal';
import { useData } from '@/context/DataContext';
import { generateId } from '@/utils/storage';

export default function WorkshopPage() {
  const { bookings, setBookings } = useData();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', institution: '', city: '',
    students: '20–30', workshopType: '1-Day', preferredDate: '', backupDate: '',
    source: 'Instagram', message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking = {
      id: generateId(),
      ...form,
      status: 'Request Received',
      submittedAt: Date.now(),
      notes: '',
    };
    setBookings([...bookings, booking]);
    console.log('📧 Confirmation email sent to:', form.email);
    console.log('📱 WhatsApp notification sent to AERO8 team');
    setSubmitted(true);
  };

  const updateField = (field, value) => setForm({ ...form, [field]: value });

  return (
    <>
      <Navbar />
      <AuthModal />
      <div className="workshop-page">
        <div className="container">
          <div className="section-label">WORKSHOP BOOKING</div>
          <h1 className="section-heading">Book a Workshop for Your School</h1>
          <p className="section-subtext" style={{ marginBottom: '40px' }}>
            We bring hands-on robotics education directly to your institution. No travel needed for students.
          </p>

          <div className="workshop-info-bar">
            <span className="workshop-info-text">
              🏫 We come to your school. No travel needed for your students.
            </span>
            <span className="workshop-info-price">₹499–699 per student</span>
          </div>

          <div className="workshop-grid">
            <div className="form-card">
              {submitted ? (
                <div className="form-success">
                  <div className="form-success-icon">🚀</div>
                  <h3 className="form-success-title">Mission Logged!</h3>
                  <p className="form-success-text">
                    We&apos;ll contact you within 48 hours to confirm your workshop.
                    <br />— AERO8 HQ
                  </p>
                  <button className="btn-primary" style={{ marginTop: '24px' }} onClick={() => setSubmitted(false)}>
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="form-title">SUBMIT YOUR REQUEST</h2>
                  <form className="form-grid" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">Full Name <span className="required">*</span></label>
                      <input className="form-input" required value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Your full name" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email <span className="required">*</span></label>
                      <input className="form-input" type="email" required value={form.email} onChange={(e) => updateField('email', e.target.value)} placeholder="you@school.edu" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone <span className="required">*</span></label>
                      <input className="form-input" type="tel" required value={form.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Institution <span className="required">*</span></label>
                      <input className="form-input" required value={form.institution} onChange={(e) => updateField('institution', e.target.value)} placeholder="School / College name" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">City <span className="required">*</span></label>
                      <input className="form-input" required value={form.city} onChange={(e) => updateField('city', e.target.value)} placeholder="Your city" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Number of Students</label>
                      <select className="form-select" value={form.students} onChange={(e) => updateField('students', e.target.value)}>
                        <option>20–30</option><option>30–40</option><option>40–50</option><option>50+</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Workshop Type</label>
                      <select className="form-select" value={form.workshopType} onChange={(e) => updateField('workshopType', e.target.value)}>
                        <option>1-Day</option><option>2-Day</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Preferred Date</label>
                      <input className="form-input" type="date" value={form.preferredDate} onChange={(e) => updateField('preferredDate', e.target.value)} min={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Backup Date</label>
                      <input className="form-input" type="date" value={form.backupDate} onChange={(e) => updateField('backupDate', e.target.value)} min={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">How did you hear about us?</label>
                      <select className="form-select" value={form.source} onChange={(e) => updateField('source', e.target.value)}>
                        <option>Instagram</option><option>LinkedIn</option><option>Google</option><option>Friend</option><option>Other</option>
                      </select>
                    </div>
                    <div className="form-group full-width">
                      <label className="form-label">Message (Optional)</label>
                      <textarea className="form-textarea" value={form.message} onChange={(e) => updateField('message', e.target.value)} placeholder="Any specific requirements or questions..." />
                    </div>
                    <button type="submit" className="form-submit">SUBMIT REQUEST →</button>
                  </form>
                </>
              )}
            </div>

            <div>
              <div className="contact-card">
                <h3 className="contact-card-title">CONTACT INFO</h3>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <div className="contact-text">
                    <strong>Email</strong>
                    team@aero8.in
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📸</span>
                  <div className="contact-text">
                    <strong>Instagram</strong>
                    @aero8robotics
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div className="contact-text">
                    <strong>Location</strong>
                    Bangalore, Karnataka, India
                  </div>
                </div>

                <div className="expect-card">
                  <h3 className="contact-card-title">WHAT TO EXPECT</h3>
                  <div className="expect-list">
                    <div className="expect-item"><span className="expect-check">✓</span> Hands-on robot building experience</div>
                    <div className="expect-item"><span className="expect-check">✓</span> Take home your own robot kit</div>
                    <div className="expect-item"><span className="expect-check">✓</span> Certificate of completion</div>
                    <div className="expect-item"><span className="expect-check">✓</span> Access to online courses</div>
                    <div className="expect-item"><span className="expect-check">✓</span> AERO8 storybook chapter</div>
                    <div className="expect-item"><span className="expect-check">✓</span> Trained facilitators from AERO8</div>
                  </div>
                </div>
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
