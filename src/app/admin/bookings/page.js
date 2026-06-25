'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { useAdmin } from '@/context/AdminContext';
import { useData } from '@/context/DataContext';

const STATUS_FLOW = ['Request Received', 'Under Review', 'Confirmed', 'Completed', 'Cancelled'];

export default function AdminBookings() {
  const { admin } = useAdmin();
  const router = useRouter();
  const { bookings, setBookings } = useData();

  useEffect(() => { if (!admin) router.push('/admin/login'); }, [admin, router]);
  if (!admin) return null;

  const updateStatus = (id, status) => {
    setBookings((bookings || []).map(b => b.id === id ? { ...b, status } : b));
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Institution', 'City', 'Students', 'Type', 'Date', 'Status'];
    const rows = (bookings || []).map(b => [b.name, b.email, b.phone, b.institution, b.city, b.students, b.workshopType, b.preferredDate, b.status]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'bookings.csv'; a.click();
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <h1 className="admin-page-title">Workshop Bookings</h1>
            <p className="admin-page-subtitle">View and manage all booking submissions.</p>
          </div>
          <button className="admin-btn admin-btn-secondary" onClick={exportCSV}>⬇ Export CSV</button>
        </div>

        {(bookings || []).length === 0 ? (
          <div className="admin-card">
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <p className="empty-state-title">No bookings yet</p>
              <p className="empty-state-text">Bookings will appear here when schools submit the workshop form.</p>
            </div>
          </div>
        ) : (
          (bookings || []).map(booking => (
            <div key={booking.id} className="admin-card" style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h3 style={{ fontWeight: 700, color: 'var(--text-white)', marginBottom: '4px' }}>{booking.name}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{booking.institution} · {booking.city}</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{booking.email} · {booking.phone}</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>
                    {booking.workshopType} · {booking.students} students · {booking.preferredDate || 'Date TBD'}
                  </p>
                  {booking.message && (
                    <p style={{ fontSize: '13px', color: 'var(--text-muted-light)', marginTop: '8px', fontStyle: 'italic' }}>
                      "{booking.message}"
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '200px' }}>
                  <select
                    className="form-select"
                    value={booking.status}
                    onChange={(e) => updateStatus(booking.id, e.target.value)}
                  >
                    {STATUS_FLOW.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <span style={{
                    fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: 'var(--radius-pill)', textAlign: 'center',
                    background: booking.status === 'Confirmed' ? 'rgba(57,255,133,0.1)' : booking.status === 'Cancelled' ? 'rgba(255,58,58,0.1)' : 'rgba(245,166,35,0.1)',
                    color: booking.status === 'Confirmed' ? 'var(--success-green)' : booking.status === 'Cancelled' ? 'var(--danger-red)' : 'var(--accent-amber)',
                    border: '1px solid currentColor',
                  }}>
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
