"use client"
import { useState } from "react"
import TopBar from "@/components/uacs/TopBar"

const ITEMS = [
  {id:1,p:"P1",name:"Xtreme Takeoff",desc:"AI estimator — 10 screens",phase:"BUILD",agent:"APEX",status:"in_progress",pct:73,queued:"Jul 25",eta:"Jul 28"},
  {id:2,p:"P1",name:"NCP Contractor App",desc:"Mobile app — epoxy contractors",phase:"BRAND",agent:"ChatGPT",status:"awaiting_approval",pct:30,queued:"Jul 26",eta:"Jul 28"},
  {id:3,p:"P2",name:"Dallas Epoxy Site",desc:"City landing page — lead gen",phase:"SPEC",agent:"APEX",status:"processing",pct:10,queued:"Jul 27",eta:"Jul 29"},
  {id:4,p:"P2",name:"Enterprise AI Factory",desc:"10-app SaaS suite",phase:"VALIDATE",agent:"BrowserWorker",status:"testing",pct:88,queued:"Jul 20",eta:"Jul 28"},
  {id:5,p:"P3",name:"NexusReach v2",desc:"Apollo-inspired platform",phase:"IDEA",agent:"APEX",status:"queued",pct:0,queued:"Jul 27",eta:"Aug 1"},
  {id:6,p:"P3",name:"PCU Alumni Outreach",desc:"Campaign for 496 alumni",phase:"IDEA",agent:"APEX",status:"queued",pct:0,queued:"Jul 27",eta:"Aug 2"},
  {id:7,p:"P4",name:"XPS Shopify Revamp",desc:"Storefront redesign",phase:"IDEA",agent:"APEX",status:"queued",pct:0,queued:"Jul 27",eta:"Aug 5"},
  {id:8,p:"P4",name:"70-City Epoxy Network",desc:"SEO landing pages x70",phase:"IDEA",agent:"APEX",status:"queued",pct:0,queued:"Jul 27",eta:"Aug 10"},
]
const TABS = ["All","In Progress","Awaiting Approval","Testing","Queued"]
const PHASES = ["IDEA","SPEC","BRAND","BUILD","VALIDATE","DEPLOY"]
const PHASE_IDX: Record<string,number> = {IDEA:0,SPEC:1,BRAND:2,BUILD:3,VALIDATE:4,DEPLOY:5}

export default function Queue() {
  const [tab, setTab] = useState("All")
  const items = tab === "All" ? ITEMS : ITEMS.filter(i => i.status.replace(/_/g," ") === tab.toLowerCase() || i.phase.toLowerCase() === tab.toLowerCase())

  return (
    <>
      <TopBar breadcrumb={["Queue"]} notificationCount={2} />
      <div className="page-wrapper">
        <div className="page-header">
          <div>
            <h1 className="page-title">Project Queue</h1>
            <p className="page-subtitle">{ITEMS.length} items &middot; {ITEMS.filter(i => i.status === "in_progress").length} active</p>
          </div>
          <a href="/pipeline/ideas"><button className="btn btn-gold">+ Add to Queue</button></a>
        </div>

        <div className="tabs" style={{marginBottom:20}}>
          {TABS.map(t => <button key={t} className={"tab" + (tab === t ? " active" : "")} onClick={() => setTab(t)}>{t}</button>)}
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {items.map(item => {
            const phaseIdx = PHASE_IDX[item.phase] || 0
            return (
              <div key={item.id} className="card card-p">
                <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
                  <div style={{width:40,height:40,background:"#000",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#f8b800",fontWeight:900,fontSize:16,flexShrink:0}}>{item.name[0]}</div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <span style={{fontWeight:700,fontSize:14}}>{item.name}</span>
                      <span className="badge badge-gold">{item.p}</span>
                      <span className="badge badge-gray">{item.agent}</span>
                    </div>
                    <div style={{fontSize:12,color:"#6b7280",marginBottom:10}}>{item.desc}</div>
                    <div style={{display:"flex",gap:4,alignItems:"center",marginBottom:10}}>
                      {PHASES.map((ph, i) => (
                        <div key={ph} style={{display:"flex",alignItems:"center",gap:4}}>
                          <div style={{width:i === phaseIdx ? 24 : 8,height:8,borderRadius:20,background:i < phaseIdx ? "#22c55e" : i === phaseIdx ? "#f8b800" : "#e5e7eb"}} />
                          {i < PHASES.length - 1 && <div style={{width:8,height:1,background:"#e5e7eb"}} />}
                        </div>
                      ))}
                      <span style={{fontSize:10,color:"#6b7280",marginLeft:4}}>{item.phase}</span>
                    </div>
                    {item.pct > 0 && <div className="progress-wrap"><div className="progress-bar" style={{width:item.pct + "%"}} /></div>}
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontSize:11,color:"#9ca3af",marginBottom:4}}>Queued {item.queued}</div>
                    <div style={{fontSize:11,color:"#9ca3af",marginBottom:8}}>ETA {item.eta}</div>
                    <div style={{display:"flex",gap:6}}>
                      <button className="btn btn-outline btn-sm">View</button>
                      {item.status === "awaiting_approval" && <button className="btn btn-gold btn-sm">Approve</button>}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
