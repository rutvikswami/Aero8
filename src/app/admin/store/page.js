'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { useAdmin } from '@/context/AdminContext';
import { useData } from '@/context/DataContext';
import { generateId } from '@/utils/storage';

export default function AdminStore() {
  const { admin } = useAdmin();
  const router = useRouter();
  const { products, setProducts } = useData();
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: 'Kits', kitTag: 'Kit 01', difficulty: 'Beginner', status: 'Available', featured: false });

  useEffect(() => { if (!admin) router.push('/admin/login'); }, [admin, router]);
  if (!admin) return null;

  const startEdit = (p) => {
    setEditing(p.id);
    setForm({ name: p.name, description: p.description, price: String(p.price), category: p.category, kitTag: p.kitTag || '', difficulty: p.difficulty || '', status: p.status, featured: p.featured || false });
  };
  const saveEdit = () => {
    setProducts(products.map(p => p.id === editing ? { ...p, ...form, price: Number(form.price) } : p));
    setEditing(null);
  };
  const deleteProduct = (id) => {
    if (confirm('Delete this product?')) setProducts(products.filter(p => p.id !== id));
  };
  const addProduct = () => {
    setProducts([...products, { id: generateId(), ...form, price: Number(form.price), images: [], components: [], compatibleKits: [] }]);
    setShowAdd(false);
    setForm({ name: '', description: '', price: '', category: 'Kits', kitTag: 'Kit 01', difficulty: 'Beginner', status: 'Available', featured: false });
  };

  const categoryOpts = ['Kits', 'Merchandise', 'Accessories'];
  const statusOpts = ['Available', 'Coming Soon', 'Out of Stock'];
  const kitOpts = ['Kit 01', 'Kit 02', 'Kit 03', 'Kit 04'];

  const ProductForm = ({ onSave, onCancel }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Product Name</label>
          <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="AERO8 Mars Rover Kit" />
        </div>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Description</label>
          <textarea className="form-textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Product description..." />
        </div>
        <div className="form-group">
          <label className="form-label">Price (₹)</label>
          <input className="form-input" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="1499" />
        </div>
        <div className="form-group">
          <label className="form-label">Category</label>
          <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            {categoryOpts.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Status</label>
          <select className="form-select" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
            {statusOpts.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Kit Tag</label>
          <select className="form-select" value={form.kitTag} onChange={e => setForm({ ...form, kitTag: e.target.value })}>
            <option value="">None</option>
            {kitOpts.map(k => <option key={k}>{k}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Featured</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
            <div className={`admin-toggle ${form.featured ? 'active' : ''}`} onClick={() => setForm({ ...form, featured: !form.featured })} />
            <span style={{ fontSize: '13px', color: form.featured ? 'var(--success-green)' : 'var(--text-muted)' }}>{form.featured ? 'Featured' : 'Not Featured'}</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button className="admin-btn admin-btn-primary" onClick={onSave}>SAVE</button>
        <button className="admin-btn admin-btn-secondary" onClick={onCancel}>CANCEL</button>
      </div>
    </div>
  );

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <h1 className="admin-page-title">Store</h1>
            <p className="admin-page-subtitle">Manage products, pricing, and availability.</p>
          </div>
          <button className="admin-btn admin-btn-primary" onClick={() => setShowAdd(!showAdd)}>+ ADD PRODUCT</button>
        </div>

        {showAdd && (
          <div className="admin-card" style={{ marginBottom: '24px' }}>
            <h3 className="admin-card-title">NEW PRODUCT</h3>
            <ProductForm onSave={addProduct} onCancel={() => setShowAdd(false)} />
          </div>
        )}

        <div className="admin-card">
          <table className="admin-table">
            <thead>
              <tr><th>Product</th><th>Price</th><th>Category</th><th>Status</th><th>Featured</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {(products || []).map(product => (
                <tr key={product.id}>
                  {editing === product.id ? (
                    <td colSpan={6}>
                      <ProductForm onSave={saveEdit} onCancel={() => setEditing(null)} />
                    </td>
                  ) : (
                    <>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-white)' }}>{product.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.description}</div>
                      </td>
                      <td style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>₹{product.price}</td>
                      <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{product.category}</td>
                      <td>
                        <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 10px', borderRadius: 'var(--radius-pill)',
                          background: product.status === 'Available' ? 'rgba(57,255,133,0.08)' : 'rgba(245,166,35,0.08)',
                          color: product.status === 'Available' ? 'var(--success-green)' : 'var(--accent-amber)',
                          border: `1px solid ${product.status === 'Available' ? 'rgba(57,255,133,0.25)' : 'rgba(245,166,35,0.25)'}`,
                        }}>{product.status}</span>
                      </td>
                      <td style={{ color: product.featured ? 'var(--success-green)' : 'var(--text-muted)', fontSize: '12px', fontWeight: 700 }}>
                        {product.featured ? '★ Yes' : '—'}
                      </td>
                      <td style={{ display: 'flex', gap: '8px' }}>
                        <button className="admin-btn admin-btn-secondary" onClick={() => startEdit(product)}>Edit</button>
                        <button className="admin-btn admin-btn-danger" onClick={() => deleteProduct(product.id)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {(products || []).length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">🛍️</div>
              <p className="empty-state-title">No products yet</p>
              <p className="empty-state-text">Add your first product to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
