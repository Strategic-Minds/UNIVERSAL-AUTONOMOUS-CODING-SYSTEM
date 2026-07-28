'use client'
interface StatTileProps { value: string | number; label: string; delta?: string; deltaUp?: boolean; icon?: string; accent?: boolean }
export default function StatTile({ value, label, delta, deltaUp, icon, accent }: StatTileProps) {
  return (
    <div className="stat-tile" style={{ borderTop: accent ? '3px solid #f8b800' : undefined }}>
      {icon && <div style={{ fontSize: 20, marginBottom: 8, opacity: 0.7 }}>{icon}</div>}
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {delta && <div style={{ fontSize: 12, marginTop: 4, color: deltaUp ? '#16a34a' : '#dc2626', fontWeight: 500 }}>{deltaUp ? '↑' : '↓'} {delta}</div>}
    </div>
  )
}
