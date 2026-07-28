'use client'

interface TopBarProps {
  breadcrumb?: string[]
  userName?: string
  userRole?: string
  userInitials?: string
  notificationCount?: number
  onSearch?: (q: string) => void
  searchPlaceholder?: string
}

export default function TopBar({
  breadcrumb = ['Dashboard'],
  userName = 'Jeremy Bensen',
  userRole = 'System Owner',
  userInitials = 'JB',
  notificationCount = 0,
  searchPlaceholder = 'Search... ⌘K',
}: TopBarProps) {
  return (
    <div className="topbar">
      {/* Breadcrumb */}
      <div className="topbar-breadcrumb" style={{ flex: 1 }}>
        {breadcrumb.map((crumb, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: i === breadcrumb.length - 1 ? '#111827' : '#9ca3af', fontWeight: i === breadcrumb.length - 1 ? 600 : 400, fontSize: 13 }}>
              {crumb}
            </span>
            {i < breadcrumb.length - 1 && <span style={{ color: '#d1d5db' }}>›</span>}
          </span>
        ))}
      </div>

      {/* Search */}
      <div className="topbar-search">
        <span style={{ color: '#9ca3af', fontSize: 13 }}>🔍</span>
        <span style={{ flex: 1, fontSize: 13, color: '#9ca3af' }}>{searchPlaceholder}</span>
        <span style={{ fontSize: 10, color: '#9ca3af', background: '#e5e7eb', borderRadius: 4, padding: '1px 5px' }}>⌘K</span>
      </div>

      {/* Right actions */}
      <div className="topbar-actions">
        {/* Notifications */}
        <button className="topbar-icon-btn" style={{ background: 'none', border: 'none', position: 'relative', cursor: 'pointer', color: '#6b7280', fontSize: 18 }}>
          🔔
          {notificationCount > 0 && (
            <span style={{ position: 'absolute', top: -4, right: -6, background: '#ef4444', color: '#fff', borderRadius: '50%', fontSize: 9, width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </button>
        <span style={{ fontSize: 18, color: '#6b7280', cursor: 'pointer' }}>✉</span>
        <span style={{ fontSize: 18, color: '#6b7280', cursor: 'pointer' }}>⚙</span>

        {/* Divider */}
        <div style={{ width: 1, height: 24, background: '#e5e7eb' }} />

        {/* User */}
        <div className="topbar-user" style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <div className="topbar-avatar">{userInitials}</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#111827', lineHeight: 1.2 }}>{userName}</div>
            <div style={{ fontSize: 10, color: '#9ca3af' }}>{userRole}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
