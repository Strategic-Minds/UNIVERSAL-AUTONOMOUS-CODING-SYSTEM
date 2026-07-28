"use client"
import TopBar from "@/components/uacs/TopBar"

const QA_DATA = {
  name:"Enterprise AI Factory",
  url:"https://enterprise-ai-factory.vercel.app",
  scores:{p1:24,p2:23,p3:25,p4:22},
  issues:["Mobile nav overlap on /dashboard","PageSpeed 83 — needs image optimization"],
}

export default function Validate() {
  const total = QA_DATA.scores.p1 + QA_DATA.scores.p2 + QA_DATA.scores.p3 + QA_DATA.scores.p4
  const ship = total >= 90
  const passes = [
    {label:"PASS 1 — CODE QUALITY", score:QA_DATA.scores.p1, max:25, checks:["TypeScript OK","ESLint OK","No console.logs","No TODOs"]},
    {label:"PASS 2 — VISUAL PARITY", score:QA_DATA.scores.p2, max:25, checks:["Desktop 99%","Mobile 96%","Colors match","Brand match"]},
    {label:"PASS 3 — FUNCTIONAL", score:QA_DATA.scores.p3, max:25, checks:["All routes 200","Forms work","APIs respond","Auth flows"]},
    {label:"PASS 4 — PERFORMANCE", score:QA_DATA.scores.p4, max:25, checks:["PageSpeed 91","A11y 97","SEO 95","CLS < 0.1"]},
  ]

  return (
    <>
      <TopBar breadcrumb={["Pipeline","Validation"]} />
      <div className="page-wrapper">
        <div className="page-header">
          <div>
            <h1 className="page-title">Validation Center</h1>
            <p className="page-subtitle">FAANG 4-Pass Quality Gate — score ≥90 required to ship</p>
          </div>
          <span className="badge badge-amber">1 In Validation</span>
        </div>

        <div className="card" style={{marginBottom:20}}>
          <div className="card-header">
            <div>
              <span className="card-title">{QA_DATA.name}</span>
              <div style={{fontSize:11,color:"#6b7280",marginTop:2}}>{QA_DATA.url}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:28,fontWeight:900,color:ship?"#16a34a":"#f59e0b"}}>{total}/100</span>
              <span className={"badge " + (ship ? "badge-green" : "badge-amber")}>{ship ? "SHIP IT" : "AUTO-FIXING"}</span>
            </div>
          </div>
          <div style={{padding:20}}>
            <div className="grid-2" style={{marginBottom:16}}>
              {passes.map((pass, i) => (
                <div key={i} style={{border:"1px solid #e5e7eb",borderRadius:8,padding:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                    <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em"}}>{pass.label}</span>
                    <span style={{fontWeight:800,color:pass.score >= pass.max * 0.9 ? "#16a34a" : "#f59e0b"}}>{pass.score}/{pass.max}</span>
                  </div>
                  {pass.checks.map((c, j) => <div key={j} style={{fontSize:12,color:"#374151",marginBottom:3}}>{"OK " + c}</div>)}
                </div>
              ))}
            </div>
            {QA_DATA.issues.length > 0 && (
              <div style={{background:"#fef3c7",border:"1px solid #fcd34d",borderRadius:6,padding:"10px 14px",marginBottom:16}}>
                <div style={{fontWeight:700,fontSize:12,marginBottom:6}}>APEX Auto-Fixing</div>
                {QA_DATA.issues.map((issue, i) => <div key={i} style={{fontSize:12,color:"#92400e"}}>{"- " + issue}</div>)}
              </div>
            )}
            <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
              <button className="btn btn-outline">Request Manual Fix</button>
              <button className="btn btn-gold" disabled={!ship}>Deploy to Production</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
