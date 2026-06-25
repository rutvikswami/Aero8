'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AuthModal from '@/components/AuthModal';
import { useData } from '@/context/DataContext';

export default function CoursesPage() {
  const { courses } = useData();
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Kit 01', 'Kit 02', 'Kit 03', 'Kit 04', 'Beginner', 'Advanced'];

  const filtered = filter === 'All' ? courses : courses.filter(c =>
    c.kitTag === filter || c.difficulty === filter
  );

  return (
    <>
      <Navbar />
      <AuthModal />
      <div className="courses-page">
        <div className="container">
          <div className="section-label">LEARNING PLATFORM</div>
          <h1 className="section-heading">AERO8 Courses</h1>
          <p className="section-subtext" style={{ marginBottom: '40px' }}>
            Master robotics through our cinematic, story-driven courses. Build real robots while following A8&apos;s adventure.
          </p>

          <div className="courses-filter-bar">
            {filters.map(f => (
              <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📚</div>
              <h3 className="empty-state-title">No courses found</h3>
              <p className="empty-state-text">More courses coming soon!</p>
            </div>
          ) : (
            <div className="courses-grid">
              {filtered.map(course => (
                <Link key={course.id} href={`/courses/${course.id}`}>
                  <div className="course-card">
                    <div className="course-thumbnail">
                      <span className="course-thumbnail-icon">🤖</span>
                      {course.kitTag && <span className="course-kit-badge">{course.kitTag}</span>}
                    </div>
                    <div className="course-info">
                      <h3 className="course-title">{course.title}</h3>
                      <div className="course-meta">
                        <span>{course.lessons.length} lessons</span>
                        <span>{course.lessons.reduce((acc, l) => {
                          const [m] = l.duration.split(':');
                          return acc + parseInt(m);
                        }, 0)} min total</span>
                      </div>
                      <div className="course-badges">
                        <span className={`difficulty-badge ${course.difficulty.toLowerCase()}`}>
                          {course.difficulty}
                        </span>
                        <span className={`status-badge ${course.status === 'Free' ? 'free' : 'coming-soon'}`}>
                          {course.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <BackToTop />
    </>
  );
}
