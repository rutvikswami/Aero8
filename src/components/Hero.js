'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useData } from '@/context/DataContext';

function TypewriterText({ texts }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = texts[currentIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentFullText) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(prev =>
        isDeleting ? prev.slice(0, -1) : currentFullText.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts]);

  return (
    <span>
      {displayText}
      <span className="hero-typewriter-cursor" />
    </span>
  );
}

function CountdownTimer({ targetDate, label }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setExpired(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (expired) {
    return <div className="countdown-expired">REGISTRATION CLOSED</div>;
  }

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="countdown-wrapper">
      <div className="countdown-label">{label}</div>
      <div className="countdown-blocks">
        {[
          { value: pad(timeLeft.days), unit: 'Days' },
          { value: pad(timeLeft.hours), unit: 'Hours' },
          { value: pad(timeLeft.minutes), unit: 'Mins' },
          { value: pad(timeLeft.seconds), unit: 'Secs' },
        ].map((block) => (
          <div key={block.unit} className="countdown-block">
            <div className="countdown-number">{block.value}</div>
            <div className="countdown-unit">{block.unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const { hero, sections } = useData();
  const [showVideoModal, setShowVideoModal] = useState(false);

  if (!sections.hero) return null;

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-fallback-bg" />
        <div className="hero-grain" />
        <div className="hero-vignette" />

        <div className="hero-content">
          <div className="hero-badges animate-fade-in-up">
            {hero.badgeTexts.map((text, i) => (
              <span key={i} className="hero-badge">{text}</span>
            ))}
          </div>

          <h1 className="hero-heading-1 animate-fade-in-up delay-100">
            {hero.headingLine1}
          </h1>

          <div className="hero-heading-2 animate-fade-in-up delay-200">
            <TypewriterText texts={hero.typewriterTexts} />
          </div>

          <p className="hero-subtext animate-fade-in-up delay-300">
            {hero.subtext}
          </p>

          <div className="hero-ctas animate-fade-in-up delay-400">
            <Link href={hero.ctaPrimary.href} className="btn-primary">
              {hero.ctaPrimary.label}
            </Link>
            <Link href={hero.ctaSecondary.href} className="btn-secondary">
              {hero.ctaSecondary.label}
            </Link>
            <button className="btn-tertiary" onClick={() => setShowVideoModal(true)}>
              {hero.ctaTertiary.label}
            </button>
          </div>

          {hero.countdownEnabled && (
            <div className="animate-fade-in-up delay-500">
              <CountdownTimer targetDate={hero.countdownTarget} label={hero.countdownLabel} />
            </div>
          )}

          <div className="hero-stats animate-fade-in-up delay-500">
            {hero.statCards.map((card) => (
              <div key={card.id} className="stat-card">
                <div className="stat-number">{card.number}</div>
                <div className="stat-label">{card.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showVideoModal && (
        <div className="video-modal-overlay" onClick={() => setShowVideoModal(false)}>
          <button className="video-modal-close" onClick={() => setShowVideoModal(false)}>✕</button>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            🎬 Teaser video coming soon
          </div>
        </div>
      )}
    </>
  );
}
