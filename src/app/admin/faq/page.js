'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { useAdmin } from '@/context/AdminContext';
import { useData } from '@/context/DataContext';
import { generateId } from '@/utils/storage';

export default function AdminFAQ() {
  const { admin } = useAdmin();
  const router = useRouter();
  const { faq, setFaq } = useData();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ question: '', answer: '', category: 'General' });
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => { if (!admin) router.push('/admin/login'); }, [admin, router]);
  if (!admin) return null;

  const startEdit = (item) => { setEditing(item.id); setForm({ question: item.question, answer: item.answer, category: item.category }); };
  const saveEdit = () => { setFaq(faq.map(f => f.id === editing ? { ...f, ...form } : f)); setEditing(null); };
  const deleteItem = (id) => { if (confirm('Remove this FAQ?')) setFaq(faq.filter(f => f.id !== id)); };
  const addItem = () => { setFaq([...faq, { id: generateId(), ...form }]); setShowAdd(false); setForm({ question: '', answer: '', category: 'General' }); };

  const categories = ['Workshop', 'Kits', 'Courses', 'Certificates', 'General'];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <h1 className="admin-page-title">FAQ Management</h1>
            <p className="admin-page-subtitle">Add, edit, remove, and reorder FAQ questions.</p>
          </div>
          <button className="admin-btn admin-btn-primary" onClick={() => setShowAdd(!showAdd)}>+ ADD QUESTION</button>
        </div>

        {showAdd && (
          <div className="admin-card">
            <h3 className="admin-card-title">ADD NEW QUESTION</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Question</label>
                <input className="form-input" value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} placeholder="What is..." />
              </div>
              <div className="form-group">
                <label className="form-label">Answer</label>
                <textarea className="form-textarea" style={{ minHeight: '100px' }} value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })} placeholder="The answer is..." />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="admin-btn admin-btn-primary" onClick={addItem}>SAVE QUESTION</button>
                <button className="admin-btn admin-btn-secondary" onClick={() => setShowAdd(false)}>CANCEL</button>
              </div>
            </div>
          </div>
        )}

        <div className="admin-card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {faq.map((item, i) => (
              <div key={item.id} style={{ padding: '20px 0', borderBottom: i < faq.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                {editing === item.id ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                      {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <input className="form-input" value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} />
                    <textarea className="form-textarea" value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })} />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="admin-btn admin-btn-primary" onClick={saveEdit}>SAVE</button>
                      <button className="admin-btn admin-btn-secondary" onClick={() => setEditing(null)}>CANCEL</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-pill)', background: 'rgba(245,166,35,0.1)', color: 'var(--accent-amber)', border: '1px solid rgba(245,166,35,0.2)' }}>
                          {item.category}
                        </span>
                        <span style={{ fontWeight: 600, color: 'var(--text-white)', fontSize: '14px' }}>{item.question}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{item.answer}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      <button className="admin-btn admin-btn-secondary" onClick={() => startEdit(item)}>Edit</button>
                      <button className="admin-btn admin-btn-danger" onClick={() => deleteItem(item.id)}>Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
