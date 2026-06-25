'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { useRouter } from 'next/navigation';

const NAV_SECTIONS = [
  { href: '/admin', label: 'Dashboard', icon: '🏠' },
  { href: '/admin/content', label: 'Content', icon: '✏️' },
  { href: '/admin/team', label: 'Team', icon: '👥' },
  { href: '/admin/kits', label: 'Kits & Story', icon: '🚀' },
  { href: '/admin/bookings', label: 'Bookings', icon: '📋' },
  { href: '/admin/courses', label: 'Courses', icon: '📚' },
  { href: '/admin/store', label: 'Store', icon: '🛍️' },
  { href: '/admin/students', label: 'Students', icon: '🎓' },
  { href: '/admin/certificates', label: 'Certificates', icon: '📜' },
  { href: '/admin/leaderboard', label: 'Leaderboard', icon: '🏆' },
  { href: '/admin/games', label: 'Games', icon: '🎮' },
  { href: '/admin/showcase', label: 'Showcase', icon: '📸' },
  { href: '/admin/faq', label: 'FAQ', icon: '❓' },
  { href: '/admin/analytics', label: 'Analytics', icon: '📊' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  { href: '/admin/sections', label: 'Sections Toggle', icon: '🔀' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { admin, logoutAdmin } = useAdmin();
  const router = useRouter();

  const handleLogout = () => {
    logoutAdmin();
    router.push('/admin/login');
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <div className="admin-sidebar-brand">AERO8</div>
        <div className="admin-sidebar-label">Mission Control</div>
        {admin && (
          <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
            {admin.name} · {admin.role === 'super_admin' ? 'Super Admin' : 'Editor'}
          </div>
        )}
      </div>

      <div className="admin-nav-section">
        {NAV_SECTIONS.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`admin-nav-link ${pathname === item.href ? 'active' : ''}`}
          >
            <span className="admin-nav-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>

      <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', marginTop: '16px' }}>
        <Link href="/" style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
          ← View Site
        </Link>
        <button onClick={handleLogout} style={{ fontSize: '13px', color: 'var(--danger-red)', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
    </aside>
  );
}
