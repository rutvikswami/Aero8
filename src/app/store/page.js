'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AuthModal from '@/components/AuthModal';
import { useData } from '@/context/DataContext';

export default function StorePage() {
  const { products } = useData();
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Featured');

  const filters = ['All', 'Kits', 'Components', 'Merchandise'];

  let filtered = filter === 'All' ? products : products.filter(p => p.category === filter);

  if (sort === 'Price Low-High') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'Price High-Low') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'Featured') filtered = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <>
      <Navbar />
      <AuthModal />
      <div className="store-page">
        <div className="container">
          <div className="section-label">AERO8 STORE</div>
          <h1 className="section-heading">Gear Up for the Mission</h1>
          <p className="section-subtext" style={{ marginBottom: '40px' }}>
            Premium robotics kits, components, and merch — everything you need to build, learn, and represent.
          </p>

          <div className="store-filter-bar">
            <div className="store-filters">
              {filters.map(f => (
                <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                  {f}
                </button>
              ))}
            </div>
            <div className="store-sort">
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option>Featured</option>
                <option>Newest</option>
                <option>Price Low-High</option>
                <option>Price High-Low</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🛍️</div>
              <h3 className="empty-state-title">No products found</h3>
              <p className="empty-state-text">Check back soon!</p>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map(product => (
                <Link key={product.id} href={`/store/${product.id}`}>
                  <div className="product-card">
                    <div className="product-image">
                      <span className="product-image-icon">
                        {product.category === 'Kits' ? '🤖' : product.category === 'Merchandise' ? '👕' : '⚙️'}
                      </span>
                      <span className={`product-status-badge ${product.status === 'Available' ? 'available' : 'coming-soon'}`}>
                        {product.status}
                      </span>
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-price">
                        {product.status === 'Coming Soon' ? 'Coming Soon' : `₹${product.price}`}
                      </div>
                      <p className="product-desc">
                        {product.description.length > 80 ? product.description.slice(0, 80) + '...' : product.description}
                      </p>
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
