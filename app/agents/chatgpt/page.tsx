"use client"
import {useState,useEffect} from "react"
import TopBar from "@/components/uacs/TopBar"

export default function ChatGPTBridge() {
  const [bridge,setBridge]=useState<{status:string,timestamp:string}|null>(null)

  useEffect(()=>{
    fetch("/api/bridge").then(r=>r.json()).then(d=>setBridge({status:d.status,timestamp:d.timestamp})).catch(()=>setBridge({status:"error",timestamp:""}))
  },[])

  return (
    <>
      <TopBar breadcrumb={["Agents","ChatGPT Bridge"]} />
      <div className="page-wrapper">
        <div className="page-header">
          <div>
            <h1 className="page-title">ChatGPT Bridge</h1>
            <p className="page-subtitle">Bidirectional sync — Base44 ↔ ChatGPT</p>
          </div>
          <span className="badge badge-green">BRIDGE ACTIVE</span>
        </div>

        <div className="grid-2" style={{marginBottom:20}}>
          <div className="card card-p">
            <h3 style={{fontWeight:700,fontSize:14,marginBottom:16}}>Bridge Status</h3>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:bridge?.status==="operational"?"#22c55e":"#f59e0b"}}/>
              <span style={{fontWeight:600}}>{bridge?.status || "Checking..."}</span>
            </div>
            {[["Bridge URL","https://xtreme-ai-bridge.vercel.app"],["UACS Webhook","/api/webhook"],["Auth","Bearer token (BRIDGE_SHARED_SECRET)"],["Protocol","REST JSON / Bidirectional"],["Last Sync",bridge?.timestamp||"—"]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #f3f4f6",fontSize:12}}>
                <span style={{color:"#6b7280",fontWeight:600}}>{k}</span>
                <span style={{color:"#374151",fontFamily:"monospace",fontSize:11}}>{v}</span>
              </div>
            ))}
          </div>

          <div className="card card-p">
            <h3 style={{fontWeight:700,fontSize:14,marginBottom:16}}>ChatGPT Responsibilities</h3>
            {[
              ["Logo Design","SVG + PNG pack (3 options per project)","✅"],
              ["Brand Identity","Colors, typography, voice guide","✅"],
              ["Screen Mockups","All routes — 1:1 with approved design","✅"],
              ["Visual Validation","99% parity check vs live screenshots","✅"],
              ["Content Writing","Headlines, copy, CTAs","✅"],
            ].map(([name,desc,status])=>(
              <div key={name} style={{display:"flex",gap:10,marginBottom:12,alignItems:"flex-start"}}>
                <span style={{fontSize:16,flexShrink:0}}>{status}</span>
                <div>
                  <div style={{fontWeight:600,fontSize:13}}>{name}</div>
                  <div style={{fontSize:12,color:"#6b7280"}}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title">Bidirectional Flow</span></div>
          <div style={{padding:20}}>
            <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
              {[
                {label:"Jeremy submits idea",dir:null},
                {label:"→"},
                {label:"APEX generates spec",dir:null},
                {label:"→"},
                {label:"Bridge POSTs to ChatGPT",dir:null},
                {label:"→"},
                {label:"ChatGPT creates brand",dir:null},
                {label:"→"},
                {label:"Bridge webhooks back",dir:null},
                {label:"→"},
                {label:"UACS shows for approval",dir:null},
              ].map((item,i)=>(
                <div key={i} style={{background:item.label.startsWith("→")?"transparent":"#f9fafb",border:item.label.startsWith("→")?"none":"1px solid #e5e7eb",borderRadius:6,padding:item.label.startsWith("→")?"0":"8px 12px",fontSize:item.label.startsWith("→")?20:12,color:item.label.startsWith("→")?"#d1d5db":"#374151",fontWeight:600}}>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
