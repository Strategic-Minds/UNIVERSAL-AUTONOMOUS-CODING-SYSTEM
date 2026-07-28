"use client"
import TopBar from "@/components/uacs/TopBar"

const QUEUE = [
  {p:"P1",name:"Xtreme Takeoff",phase:"BUILD",agent:"APEX",status:"in_progress",next:"Screens 6-10"},
  {p:"P1",name:"NCP Contractor App",phase:"BRAND",agent:"ChatGPT",status:"awaiting_approval",next:"Review mockups"},
  {p:"P2",name:"Dallas Epoxy Site",phase:"SPEC",agent:"APEX",status:"processing",next:"Auto"},
  {p:"P2",name:"Enterprise AI Factory",phase:"VALIDATE",agent:"BrowserWorker",status:"testing",next:"E2E run"},
  {p:"P3",name:"NexusReach v2",phase:"IDEA",agent:"APEX",status:"queued",next:"Auto"},
]
const BADGEMAP:Record<string,string>={in_progress:"#dbeafe|#1e40af",awaiting_approval:"#fef3c7|#92400e",processing:"#f3f4f6|#374151",testing:"#ede9fe|#6d28d9",queued:"#f3f4f6|#9ca3af"}

export default function Dashboard() {
  return (
    <>
      <TopBar breadcrumb={["Command Center"]} notificationCount={2} />
      <div className="page-wrapper">
        <div className="page-header">
          <div>
            <h1 className="page-title">Command Center</h1>
            <p className="page-subtitle">Universal Autonomous Coding System — Active <span style={{color:"#22c55e"}}>●</span></p>
          </div>
          <a href="/pipeline/ideas"><button className="btn btn-gold">+ New Project</button></a>
        </div>

        {/* Status bar */}
        <div style={{background:"#111",borderRadius:8,padding:"12px 20px",marginBottom:20,display:"flex",gap:20,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{color:"#f8b800",fontSize:10,fontWeight:800,letterSpacing:"0.1em"}}>ALL SYSTEMS</span>
          {[["APEX","ONLINE"],["ChatGPT","LIVE"],["BrowserWorker","READY"],["GitHub","CONNECTED"],["Vercel","CONNECTED"],["Bridge","ACTIVE"]].map(([name,status])=>(
            <div key={name} style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:"#22c55e"}}/>
              <span style={{color:"#e5e7eb",fontSize:11}}>{name}</span>
              <span style={{color:"#22c55e",fontSize:10,fontWeight:700}}>{status}</span>
            </div>
          ))}
        </div>

        {/* KPIs */}
        <div className="grid-4" style={{marginBottom:20}}>
          {[["3","ACTIVE PROJECTS","↑ 1 this week"],["7","QUEUE DEPTH","2 awaiting approval"],["12","DEPLOYED THIS MONTH","↑ 4 vs last month"],["94%","FAANG PASS RATE","Target ≥90%"]].map(([v,l,d],i)=>(
            <div key={i} className="stat-tile" style={{borderTop:i===0?"3px solid #f8b800":undefined}}>
              <div className="stat-value">{v}</div>
              <div className="stat-label">{l}</div>
              <div style={{fontSize:11,color:"#16a34a",marginTop:4}}>{d}</div>
            </div>
          ))}
        </div>

        {/* Queue table */}
        <div className="card" style={{marginBottom:20}}>
          <div className="card-header">
            <span className="card-title">Active Queue</span>
            <div style={{display:"flex",gap:8}}>
              <a href="/queue"><button className="btn btn-outline btn-sm">View All</button></a>
              <a href="/pipeline/ideas"><button className="btn btn-gold btn-sm">+ Add Idea</button></a>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>#</th><th>PROJECT</th><th>PHASE</th><th>AGENT</th><th>STATUS</th><th>NEXT</th></tr></thead>
              <tbody>{QUEUE.map((row,i)=>{
                const [bg,col]=(BADGEMAP[row.status]||"#f3f4f6|#374151").split("|")
                return <tr key={i}>
                  <td><span className="badge badge-gold">{row.p}</span></td>
                  <td style={{fontWeight:600}}>{row.name}</td>
                  <td><span className="badge badge-gray">{row.phase}</span></td>
                  <td style={{fontSize:12}}>{row.agent}</td>
                  <td><span style={{background:bg,color:col,borderRadius:20,padding:"2px 10px",fontSize:11,fontWeight:600}}>{row.status.replace("_"," ")}</span></td>
                  <td style={{fontSize:12,color:"#6b7280"}}>{row.next}</td>
                </tr>
              })}</tbody>
            </table>
          </div>
        </div>

        {/* Recent deploys */}
        <div className="card">
          <div className="card-header"><span className="card-title">Recently Deployed</span></div>
          {[["BidGenius","Jul 24","91","bidgenius.vercel.app"],["National Epoxy Pros","Jul 12","96","nationalepoxypros.com"],["Xtreme Scraper","Jul 10","89","xtreme-scraper.vercel.app"]].map(([name,date,score,url],i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:16,padding:"12px 20px",borderBottom:i<2?"1px solid #f3f4f6":"none"}}>
              <div style={{width:36,height:36,background:"#000",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",color:"#f8b800",fontWeight:900,fontSize:14,flexShrink:0}}>{(name as string)[0]}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:13}}>{name}</div>
                <div style={{fontSize:11,color:"#9ca3af"}}>{date} · <a href={"https://"+url} target="_blank" style={{color:"#3b82f6"}}>{url}</a></div>
              </div>
              <span style={{fontWeight:800,fontSize:16,color:"#16a34a"}}>{score}/100</span>
              <span className="badge badge-green">LIVE</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
