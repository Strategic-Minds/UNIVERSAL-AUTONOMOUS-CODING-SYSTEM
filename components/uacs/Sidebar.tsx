'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// ============================================================
// UACS UNIVERSAL SIDEBAR
// This sidebar is used across ALL UACS-generated projects.
// Customize NAV_SECTIONS for each specific project.
// ============================================================

export interface NavItem { label: string; href: string; icon: string; badge?: string | number }
export interface NavSection { section: string; items: NavItem[] }

// DEFAULT NAV — override this in your project's Sidebar.tsx
const NAV_SECTIONS: NavSection[] = [
  { section: 'MAIN', items: [
    { label: 'Dashboard', href: '/dashboard', icon: '⊞' },
    { label: 'Projects', href: '/projects', icon: '◆' },
    { label: 'Queue', href: '/queue', icon: '⊟' },
  ]},
  { section: 'PIPELINE', items: [
    { label: 'Idea Intake', href: '/pipeline/ideas', icon: '💡' },
    { label: 'Brand Review', href: '/pipeline/brand', icon: '🎨' },
    { label: 'Build Monitor', href: '/pipeline/build', icon: '🔨' },
    { label: 'Validation', href: '/pipeline/validate', icon: '✓' },
  ]},
  { section: 'AGENTS', items: [
    { label: 'APEX', href: '/agents/apex', icon: '⚡' },
    { label: 'ChatGPT', href: '/agents/chatgpt', icon: '🤖' },
    { label: 'BrowserWorker', href: '/agents/browserworker', icon: '🌐' },
  ]},
  { section: 'SYSTEM', items: [
    { label: 'Templates', href: '/templates', icon: '◱' },
    { label: 'Analytics', href: '/analytics', icon: '▤' },
    { label: 'Settings', href: '/settings', icon: '⚙' },
  ]},
]

// Optional: project branding override
const BRAND = {
  mark: 'U',
  name: 'UACS',
  sub: 'AUTONOMOUS CODING SYSTEM',
  hazardText: 'BUILT BY APEX.\nPOWERED BY AI.',
}

export default function Sidebar({ nav = NAV_SECTIONS }: { nav?: NavSection[] }) {
  const path = usePathname()

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">{BRAND.mark}</div>
        <div>
          <span className="sidebar-logo-name">{BRAND.name}</span>
          <span className="sidebar-logo-sub">{BRAND.sub}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {nav.map(({ section, items }) => (
          <div key={section}>
            <div className="sidebar-section">{section}</div>
            {items.map(item => {
              const active = path === item.href || (item.href !== '/dashboard' && path.startsWith(item.href))
              return (
                <Link key={item.href} href={item.href}>
                  <div className={`sidebar-item ${active ? 'active' : ''}`}>
                    <span style={{ fontSize: 12, width: 14, textAlign: 'center', opacity: active ? 1 : 0.6 }}>
                      {item.icon}
                    </span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && (
                      <span style={{ background: active ? '#f8b800' : '#374151', color: active ? '#000' : '#fff', borderRadius: 10, padding: '1px 6px', fontSize: 10, fontWeight: 700 }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Hazard footer */}
      <div className="sidebar-hazard">
        <div className="sidebar-hazard-inner">
          <div className="sidebar-hazard-text">{BRAND.hazardText}</div>
        </div>
      </div>
    </div>
  )
}
