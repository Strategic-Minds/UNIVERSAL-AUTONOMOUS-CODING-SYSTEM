'use client'
interface QAPass { name: string; score: number; maxScore: number; checks: { label: string; pass: boolean }[] }
interface QAScoreCardProps { passes: QAPass[]; totalScore: number }
export default function QAScoreCard({ passes, totalScore }: QAScoreCardProps) {
  const shipIt = totalScore >= 90
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">FAANG Quality Gate</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 24, fontWeight: 800, color: shipIt ? '#16a34a' : '#dc2626' }}>{totalScore}/100</span>
          <span className={`badge ${shipIt ? 'badge-green' : 'badge-red'}`}>{shipIt ? '✅ SHIP IT' : '🔧 FIXING'}</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, padding: 20 }}>
        {passes.map((pass, i) => (
          <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>PASS {i+1} — {pass.name}</span>
              <span style={{ fontWeight: 800, color: pass.score >= pass.maxScore * 0.9 ? '#16a34a' : '#f59e0b' }}>{pass.score}/{pass.maxScore}</span>
            </div>
            {pass.checks.map((check, j) => (
              <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, marginBottom: 4 }}>
                <span>{check.pass ? '✅' : '❌'}</span>
                <span style={{ color: check.pass ? '#374151' : '#dc2626' }}>{check.label}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
