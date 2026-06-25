'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { useAdmin } from '@/context/AdminContext';
import { useData } from '@/context/DataContext';

export default function AdminGames() {
  const { admin } = useAdmin();
  const router = useRouter();
  const { games, setGames } = useData();

  useEffect(() => { if (!admin) router.push('/admin/login'); }, [admin, router]);
  if (!admin) return null;

  const toggle = (id) => {
    setGames((games || []).map(g => g.id === id ? { ...g, visible: !g.visible } : g));
  };

  const gameEmoji = {
    'game-01': '🚗',
    'game-02': '⚡',
    'game-03': '💻',
    'game-04': '🧠',
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h1 className="admin-page-title">Games</h1>
        <p className="admin-page-subtitle">Enable or disable mini-games in the Mission Zone.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginTop: '24px' }}>
          {(games || []).map(game => (
            <div key={game.id} className="admin-card" style={{ borderTop: `2px solid ${game.visible ? 'var(--accent-amber)' : 'var(--border-color)'}`, transition: 'border-color 0.3s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>{gameEmoji[game.id] || '🎮'}</div>
                  <h3 style={{ fontWeight: 700, color: game.visible ? 'var(--text-white)' : 'var(--text-muted)', fontSize: '16px', marginBottom: '8px', transition: 'color 0.3s' }}>{game.name}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>{game.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: game.visible ? 'var(--success-green)' : 'var(--danger-red)' }}>
                      {game.visible ? '● LIVE' : '○ HIDDEN'}
                    </span>
                    <div className={`admin-toggle ${game.visible ? 'active' : ''}`} onClick={() => toggle(game.id)} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-card" style={{ marginTop: '24px' }}>
          <h3 className="admin-card-title">ABOUT MISSION ZONE GAMES</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
            Games are interactive mini-experiences embedded in the Mission Zone page. Toggling a game OFF hides it from students
            but doesn't delete any scores or data. Students earn points by playing and completing games. Game scores contribute
            to the overall leaderboard rankings.
          </p>
          <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'rgba(245,166,35,0.04)', border: '1px solid rgba(245,166,35,0.15)', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: 'var(--accent-amber)' }}>{(games || []).filter(g => g.visible).length}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Active Games</div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(57,255,133,0.04)', border: '1px solid rgba(57,255,133,0.15)', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: 'var(--success-green)' }}>{(games || []).length}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Total Games</div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(58,160,255,0.04)', border: '1px solid rgba(58,160,255,0.15)', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: 'var(--blue-accent)' }}>🎯</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Points per Game</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
