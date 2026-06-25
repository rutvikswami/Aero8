'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { useAdmin } from '@/context/AdminContext';
import { useData } from '@/context/DataContext';
import { generateId } from '@/utils/storage';

export default function AdminTeam() {
  const { admin } = useAdmin();
  const router = useRouter();
  const { team, setTeam } = useData();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', bio: '', linkedin: '' });

  useEffect(() => { if (!admin) router.push('/admin/login'); }, [admin, router]);
  if (!admin) return null;

  const startEdit = (member) => {
    setEditing(member.id);
    setForm({ name: member.name, role: member.role, bio: member.bio || '', linkedin: member.linkedin || '' });
  };

  const saveEdit = () => {
    setTeam(team.map(m => m.id === editing ? { ...m, ...form } : m));
    setEditing(null);
  };

  const deleteMember = (id) => {
    if (confirm('Remove this team member?')) setTeam(team.filter(m => m.id !== id));
  };

  const addMember = () => {
    setTeam([...team, { id: generateId(), name: 'New Member', role: 'Role Title', bio: '', linkedin: '', photo: null }]);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h1 className="admin-page-title">Team Management</h1>
        <p className="admin-page-subtitle">Add, edit, remove, and reorder team member cards.</p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button className="admin-btn admin-btn-primary" onClick={addMember}>+ ADD MEMBER</button>
        </div>

        <div className="admin-card">
          <table className="admin-table">
            <thead>
              <tr><th>Name</th><th>Role</th><th>Bio</th><th>LinkedIn</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {team.map(member => (
                <tr key={member.id}>
                  {editing === member.id ? (
                    <>
                      <td><input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: '120px' }} /></td>
                      <td><input className="form-input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={{ width: '140px' }} /></td>
                      <td><input className="form-input" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} style={{ width: '200px' }} /></td>
                      <td><input className="form-input" value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} style={{ width: '140px' }} /></td>
                      <td style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button className="admin-btn admin-btn-primary" onClick={saveEdit}>Save</button>
                        <button className="admin-btn admin-btn-secondary" onClick={() => setEditing(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={{ color: 'var(--text-white)', fontWeight: 600 }}>{member.name}</td>
                      <td style={{ color: 'var(--accent-amber)', fontSize: '12px', fontWeight: 700 }}>{member.role}</td>
                      <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{member.bio || '—'}</td>
                      <td>{member.linkedin ? '✓' : '—'}</td>
                      <td style={{ display: 'flex', gap: '8px' }}>
                        <button className="admin-btn admin-btn-secondary" onClick={() => startEdit(member)}>Edit</button>
                        <button className="admin-btn admin-btn-danger" onClick={() => deleteMember(member.id)}>Remove</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
