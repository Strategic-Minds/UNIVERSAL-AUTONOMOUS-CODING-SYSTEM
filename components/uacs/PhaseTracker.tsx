'use client'
interface Phase { label: string; status: 'pending' | 'active' | 'done' }
export default function PhaseTracker({ phases }: { phases: Phase[] }) {
  return (
    <div style={{ display: 'flex', gap: 0 }}>
      {phases.map((phase, i) => (
        <div key={i} style={{ flex: 1, padding: '10px 8px', textAlign: 'center', background: phase.status === 'done' ? '#f0fdf4' : phase.status === 'active' ? '#000' : '#fff', border: `1px solid ${phase.status === 'done' ? '#86efac' : phase.status === 'active' ? '#000' : '#e5e7eb'}`, position: 'relative' }}>
          {i < phases.length - 1 && <span style={{ position: 'absolute', right: -10, top: '50%', transform: 'translateY(-50%)', color: '#d1d5db', fontSize: 20, zIndex: 1 }}>›</span>}
          <div style={{ fontSize: 16, fontWeight: 800, color: phase.status === 'done' ? '#16a34a' : phase.status === 'active' ? '#f8b800' : '#9ca3af' }}>{i + 1}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2, color: phase.status === 'active' ? '#fff' : '#6b7280' }}>{phase.label}</div>
        </div>
      ))}
    </div>
  )
}
