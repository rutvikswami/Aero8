'use client';
import { useState } from 'react';
import { useData } from '@/context/DataContext';

export default function FAQ() {
  const { faq, sections } = useData();
  const [openId, setOpenId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  if (!sections.faq) return null;

  const categories = ['All', ...new Set(faq.map(f => f.category))];
  const filtered = activeCategory === 'All' ? faq : faq.filter(f => f.category === activeCategory);

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <h2 className="section-heading">Frequently Asked Questions</h2>

        <div className="faq-categories">
          {categories.map(cat => (
            <button
              key={cat}
              className={`faq-category-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="faq-list">
          {filtered.map((item) => (
            <div key={item.id} className={`faq-item ${openId === item.id ? 'open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
              >
                <span>{item.question}</span>
                <span className="faq-arrow">→</span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
