'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AuthModal from '@/components/AuthModal';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';

export default function CoursePlayerPage() {
  const params = useParams();
  const { courses, setCourses } = useData();
  const { student, addPoints } = useAuth();
  const [activeLesson, setActiveLesson] = useState(0);

  const course = courses.find(c => c.id === params.courseId);
  if (!course) {
    return (
      <>
        <Navbar /><AuthModal />
        <div className="courses-page">
          <div className="container">
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3 className="empty-state-title">Course not found</h3>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const lesson = course.lessons[activeLesson];
  const completedCount = course.lessons.filter(l => l.completed).length;
  const progress = Math.round((completedCount / course.lessons.length) * 100);

  const toggleComplete = () => {
    const updated = courses.map(c => {
      if (c.id !== course.id) return c;
      const newLessons = [...c.lessons];
      newLessons[activeLesson] = { ...newLessons[activeLesson], completed: !newLessons[activeLesson].completed };
      return { ...c, lessons: newLessons };
    });
    setCourses(updated);
    if (!lesson.completed && student) addPoints(10);
  };

  return (
    <>
      <Navbar />
      <AuthModal />
      <div className="course-player">
        <div className="container">
          <div style={{ marginBottom: '24px' }}>
            <div className="section-label">{course.kitTag}</div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700 }}>
              {course.title}
            </h1>
            <div className="progress-bar" style={{ maxWidth: '300px', marginTop: '12px' }}>
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{progress}% complete</span>
          </div>

          <div className="course-player-grid">
            <div className="lesson-sidebar">
              <div className="lesson-sidebar-title">LESSONS</div>
              {course.lessons.map((l, i) => (
                <div
                  key={l.id}
                  className={`lesson-list-item ${activeLesson === i ? 'active' : ''}`}
                  onClick={() => setActiveLesson(i)}
                >
                  <div className={`lesson-check ${l.completed ? 'completed' : ''}`}>
                    {l.completed ? '✓' : i + 1}
                  </div>
                  <div>
                    <div className="lesson-list-title">{l.title}</div>
                    <div className="lesson-list-duration">{l.duration}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="video-area">
              <div className="video-player">
                <div className="video-placeholder">
                  <div className="video-placeholder-icon">🎬</div>
                  <div className="video-placeholder-text">
                    Video Player — {lesson.title}
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>
                    Upload course videos from the Admin Dashboard
                  </p>
                </div>
              </div>

              <div className="lesson-info">
                <h2 className="lesson-title">{lesson.title}</h2>
                <p className="lesson-description">{lesson.description}</p>
                <button
                  className={`mark-complete-btn ${lesson.completed ? 'completed' : ''}`}
                  onClick={toggleComplete}
                >
                  {lesson.completed ? '✓ COMPLETED' : 'MARK AS COMPLETE'}
                </button>

                {activeLesson < course.lessons.length - 1 && (
                  <button
                    className="btn-secondary"
                    style={{ marginLeft: '12px' }}
                    onClick={() => setActiveLesson(activeLesson + 1)}
                  >
                    NEXT LESSON →
                  </button>
                )}

                {completedCount === course.lessons.length && (
                  <div style={{
                    marginTop: '32px', padding: '24px', background: 'rgba(57,255,133,0.06)',
                    border: '1px solid rgba(57,255,133,0.2)', borderRadius: '8px', textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎉</div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--success-green)', marginBottom: '8px' }}>
                      Course Complete!
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                      Certificate ready — coming soon
                    </p>
                  </div>
                )}
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
