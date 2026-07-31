import TopBar from '@/components/uacs/TopBar'

interface ModulePlaceholderProps {
  title: string
  eyebrow: string
  description: string
  status?: string
  capabilities: string[]
}

export default function ModulePlaceholder({
  title,
  eyebrow,
  description,
  status = 'FOUNDATION READY',
  capabilities,
}: ModulePlaceholderProps) {
  return (
    <>
      <TopBar breadcrumb={[title]} />
      <main className="page-wrapper">
        <header className="page-header">
          <div>
            <div style={{ color: '#b45309', fontSize: 10, fontWeight: 800, letterSpacing: '.12em' }}>
              {eyebrow}
            </div>
            <h1 className="page-title" style={{ marginTop: 4 }}>{title}</h1>
            <p className="page-subtitle" style={{ maxWidth: 680 }}>{description}</p>
          </div>
          <span className="badge badge-green">{status}</span>
        </header>

        <section className="card card-p">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <span className="dot dot-green" />
            <h2 className="card-title">Module contract</h2>
          </div>
          <div className="grid-3">
            {capabilities.map((capability, index) => (
              <article key={capability} className="stat-tile">
                <div style={{ color: '#b45309', fontSize: 10, fontWeight: 800 }}>0{index + 1}</div>
                <div style={{ marginTop: 8, fontSize: 13, fontWeight: 650, overflowWrap: 'anywhere' }}>
                  {capability}
                </div>
                <div style={{ marginTop: 8, fontSize: 11, color: '#6b7280' }}>
                  Route active and ready for its governed work packet.
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
