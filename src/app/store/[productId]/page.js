'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AuthModal from '@/components/AuthModal';
import { useData } from '@/context/DataContext';

export default function ProductDetailPage() {
  const params = useParams();
  const { products } = useData();
  const [accordionOpen, setAccordionOpen] = useState(false);

  const product = products.find(p => p.id === params.productId);
  if (!product) {
    return (
      <>
        <Navbar /><AuthModal />
        <div className="store-page"><div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3 className="empty-state-title">Product not found</h3>
          </div>
        </div></div>
        <Footer />
      </>
    );
  }

  const whatsappMsg = encodeURIComponent(`Hi AERO8! I'd like to order: ${product.name} (₹${product.price})`);

  return (
    <>
      <Navbar />
      <AuthModal />
      <div className="product-detail">
        <div className="container">
          <div className="product-detail-grid">
            <div className="product-gallery">
              <span className="product-gallery-icon">
                {product.category === 'Kits' ? '🤖' : product.category === 'Merchandise' ? '👕' : '⚙️'}
              </span>
            </div>

            <div>
              {product.kitTag && (
                <span className="course-kit-badge" style={{ marginBottom: '16px', display: 'inline-block' }}>
                  {product.kitTag}
                </span>
              )}
              <h1 className="product-detail-name">{product.name}</h1>
              <div className="product-detail-price">
                {product.status === 'Coming Soon' ? 'Coming Soon' : `₹${product.price}`}
              </div>
              <p className="product-detail-desc">{product.description}</p>

              {product.difficulty && (
                <div style={{ marginBottom: '20px' }}>
                  <span className={`difficulty-badge ${product.difficulty.toLowerCase()}`}>
                    {product.difficulty}
                  </span>
                </div>
              )}

              {product.status === 'Available' ? (
                <a href={`https://wa.me/919999999999?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer">
                  <button className="product-order-btn">
                    💬 Order via WhatsApp
                  </button>
                </a>
              ) : (
                <button className="product-coming-soon-btn" disabled>
                  COMING SOON
                </button>
              )}

              {product.components && product.components.length > 0 && (
                <div className="component-accordion">
                  <div className="accordion-header" onClick={() => setAccordionOpen(!accordionOpen)}>
                    <span>What&apos;s in the Kit ({product.components.length} items)</span>
                    <span style={{ color: 'var(--accent-amber)', transition: 'transform 0.3s', transform: accordionOpen ? 'rotate(90deg)' : '' }}>
                      →
                    </span>
                  </div>
                  <div className={`accordion-content ${accordionOpen ? 'open' : ''}`}>
                    <div className="accordion-content-inner">
                      {product.components.map((comp, i) => (
                        <div key={i} className="component-list-item">
                          <span className="component-dot" />
                          {comp}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {product.compatibleKits && product.compatibleKits.length > 0 && (
                <div style={{ marginTop: '24px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em' }}>
                    COMPATIBLE WITH:
                  </span>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    {product.compatibleKits.map(kit => (
                      <span key={kit} className="hero-badge">{kit}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <BackToTop />
    </>
  );
}
