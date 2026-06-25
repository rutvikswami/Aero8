'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { useAdmin } from '@/context/AdminContext';
import { useData } from '@/context/DataContext';
import { generateId } from '@/utils/storage';

export default function AdminCourses() {
  const { admin } = useAdmin();
  const router = useRouter();
  const { courses, setCourses } = useData();
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', kitTag: 'Kit 01', difficulty: 'Beginner', status: 'Free' });
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => { if (!admin) router.push('/admin/login'); }, [admin, router]);
  if (!admin) return null;

  const startEdit = (course) => {
    setEditing(course.id);
    setForm({ title: course.title, description: course.description, kitTag: course.kitTag, difficulty: course.difficulty, status: course.status });
  };
  const saveEdit = () => {
    setCourses(courses.map(c => c.id === editing ? { ...c, ...form } : c));
    setEditing(null);
  };
  const deleteCourse = (id) => {
    if (confirm('Delete this course?')) setCourses(courses.filter(c => c.id !== id));
  };
  const addCourse = () => {
    setCourses([...courses, {
      id: generateId(), ...form,
      lessons: [], testQuestions: [], passingScore: 70, thumbnail: null,
    }]);
    setShowAdd(false);
    setForm({ title: '', description: '', kitTag: 'Kit 01', difficulty: 'Beginner', status: 'Free' });
  };

  const difficultyOpts = ['Beginner', 'Intermediate', 'Advanced'];
  const statusOpts = ['Free', 'Premium'];
  const kitOpts = ['Kit 01', 'Kit 02', 'Kit 03', 'Kit 04', 'General'];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <h1 className="admin-page-title">Courses</h1>
            <p className="admin-page-subtitle">Manage online courses and learning content.</p>
          </div>
          <button className="admin-btn admin-btn-primary" onClick={() => setShowAdd(!showAdd)}>+ ADD COURSE</button>
        </div>

        {showAdd && (
          <div className="admin-card" style={{ marginBottom: '24px' }}>
            <h3 className="admin-card-title">NEW COURSE</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Title</label>
                <input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Course title..." />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Description</label>
                <textarea className="form-textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="What will students learn?" />
              </div>
              <div className="form-group">
                <label className="form-label">Kit Tag</label>
                <select className="form-select" value={form.kitTag} onChange={e => setForm({ ...form, kitTag: e.target.value })}>
                  {kitOpts.map(k => <option key={k}>{k}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Difficulty</label>
                <select className="form-select" value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })}>
                  {difficultyOpts.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-select" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  {statusOpts.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button className="admin-btn admin-btn-primary" onClick={addCourse}>SAVE COURSE</button>
              <button className="admin-btn admin-btn-secondary" onClick={() => setShowAdd(false)}>CANCEL</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {(courses || []).map(course => (
            <div key={course.id} className="admin-card">
              {editing === course.id ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 className="admin-card-title">EDITING COURSE</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label className="form-label">Title</label>
                      <input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                    </div>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label className="form-label">Description</label>
                      <textarea className="form-textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Kit Tag</label>
                      <select className="form-select" value={form.kitTag} onChange={e => setForm({ ...form, kitTag: e.target.value })}>
                        {kitOpts.map(k => <option key={k}>{k}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Difficulty</label>
                      <select className="form-select" value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })}>
                        {difficultyOpts.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="admin-btn admin-btn-primary" onClick={saveEdit}>SAVE</button>
                    <button className="admin-btn admin-btn-secondary" onClick={() => setEditing(null)}>CANCEL</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, color: 'var(--text-white)', fontSize: '16px' }}>{course.title}</span>
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-pill)', background: 'rgba(245,166,35,0.1)', color: 'var(--accent-amber)', border: '1px solid rgba(245,166,35,0.2)' }}>{course.kitTag}</span>
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-pill)', background: 'rgba(57,255,133,0.08)', color: 'var(--success-green)', border: '1px solid rgba(57,255,133,0.2)' }}>{course.status}</span>
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-pill)', background: 'rgba(136,136,136,0.1)', color: 'var(--text-muted)', border: '1px solid rgba(136,136,136,0.2)' }}>{course.difficulty}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '8px' }}>{course.description}</p>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {(course.lessons || []).length} lessons · {(course.testQuestions || []).length} test questions · {course.passingScore}% pass threshold
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      <button className="admin-btn admin-btn-secondary" onClick={() => setExpandedId(expandedId === course.id ? null : course.id)}>
                        {expandedId === course.id ? 'Hide' : 'Lessons'}
                      </button>
                      <button className="admin-btn admin-btn-secondary" onClick={() => startEdit(course)}>Edit</button>
                      <button className="admin-btn admin-btn-danger" onClick={() => deleteCourse(course.id)}>Delete</button>
                    </div>
                  </div>
                  {expandedId === course.id && (
                    <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                      <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-amber)', letterSpacing: '0.1em', marginBottom: '12px' }}>LESSONS</h4>
                      {(course.lessons || []).length === 0 ? (
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No lessons added yet.</p>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {(course.lessons || []).map((lesson, i) => (
                            <div key={lesson.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                              <div>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginRight: '8px' }}>#{i + 1}</span>
                                <span style={{ fontSize: '13px', color: 'var(--text-white)' }}>{lesson.title}</span>
                              </div>
                              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {(courses || []).length === 0 && (
            <div className="admin-card">
              <div className="empty-state">
                <div className="empty-state-icon">📚</div>
                <p className="empty-state-title">No courses yet</p>
                <p className="empty-state-text">Add your first course to get started.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
