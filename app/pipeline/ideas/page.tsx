"use client"
import {useState} from "react"
import TopBar from "@/components/uacs/TopBar"

export default function IdeaIntake() {
  const [form,setForm]=useState({name:"",desc:"",goal:"revenue",user:"",ref:"",priority:"P3",notes:""})
  const [status,setStatus]=useState<"idle"|"submitting"|"done"|"error">("idle")

  const submit=async()=>{
    setStatus("submitting")
    try {
      const res=await fetch("/api/queue",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({project_name:form.name,description:form.desc,business_goal:form.goal,target_user:form.user,reference_url:form.ref,priority:form.priority,notes:form.notes})})
      if(res.ok) setStatus("done"); else setStatus("error")
    } catch { setStatus("error") }
  }

  return (
    <>
      <TopBar breadcrumb={["Pipeline","Idea Intake"]} />
      <div className="page-wrapper">
        <div className="page-header">
          <div>
            <h1 className="page-title">Idea Intake</h1>
            <p className="page-subtitle">Drop a minimal idea — APEX handles everything else</p>
          </div>
        </div>

        {status==="done" ? (
          <div className="card card-p" style={{textAlign:"center",padding:"60px 40px"}}>
            <div style={{fontSize:48,marginBottom:16}}>🚀</div>
            <h2 style={{fontSize:24,fontWeight:800,marginBottom:8}}>Idea Submitted!</h2>
            <p style={{color:"#6b7280",marginBottom:24}}>APEX is processing your idea. You will receive a WhatsApp notification when brand options are ready for approval.</p>
            <button className="btn btn-gold" onClick={()=>setStatus("idle")}>Submit Another</button>
          </div>
        ) : (
          <div className="grid-2" style={{alignItems:"start"}}>
            <div className="card card-p">
              <h2 style={{fontSize:16,fontWeight:700,marginBottom:20}}>New Project Idea</h2>
              {[
                ["Project Name","name","text","e.g. Dallas Epoxy Pros"],
                ["One-line description","desc","text","What does it do in one sentence?"],
                ["Target user","user","text","Who is this for?"],
                ["Reference / inspiration","ref","text","Any sites or apps to reference? (optional)"],
              ].map(([label,key,type,ph])=>(
                <div key={key} className="form-group">
                  <label className="form-label">{label}</label>
                  <input type={type} placeholder={ph as string} value={(form as Record<string,string>)[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} className="form-input"/>
                </div>
              ))}
              <div className="form-group">
                <label className="form-label">Business Goal</label>
                <select className="form-input form-select" value={form.goal} onChange={e=>setForm(f=>({...f,goal:e.target.value}))}>
                  <option value="revenue">Revenue Generation</option>
                  <option value="automation">Automation</option>
                  <option value="lead_gen">Lead Generation</option>
                  <option value="internal_tool">Internal Tool</option>
                  <option value="client_delivery">Client Delivery</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Priority</label>
                <div style={{display:"flex",gap:8}}>
                  {["P1","P2","P3","P4","P5"].map(p=>(
                    <button key={p} className={`btn ${form.priority===p?"btn-gold":"btn-outline"} btn-sm`} onClick={()=>setForm(f=>({...f,priority:p}))}>{p}</button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Notes (optional)</label>
                <textarea className="form-input form-textarea" value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} placeholder="Any additional context, constraints, or preferences..."/>
              </div>
              <button className="btn btn-gold" style={{width:"100%"}} onClick={submit} disabled={status==="submitting" || !form.name}>
                {status==="submitting" ? "Submitting to Queue..." : "Submit to Queue →"}
              </button>
              {status==="error" && <p style={{color:"#ef4444",fontSize:12,marginTop:8}}>Failed to submit. Check Supabase connection.</p>}
            </div>

            <div>
              <div className="card card-p" style={{marginBottom:16,background:"#000",color:"#fff"}}>
                <h3 style={{color:"#f8b800",fontWeight:800,fontSize:14,marginBottom:12}}>WHAT HAPPENS NEXT</h3>
                {[
                  ["1","APEX generates full spec","~2 min","auto"],
                  ["2","ChatGPT creates 3 brand options","~10 min","auto"],
                  ["3","You approve 1 option","30 sec","YOU"],
                  ["4","APEX builds all screens","~2 hrs","auto"],
                  ["5","BrowserWorker validates","~15 min","auto"],
                  ["6","FAANG gate — score ≥90","auto-fix","auto"],
                  ["7","Deploys to production","~5 min","auto"],
                  ["8","WhatsApp notification","live URL","YOU"],
                ].map(([num,step,time,who])=>(
                  <div key={num} style={{display:"flex",gap:10,marginBottom:10,alignItems:"flex-start"}}>
                    <div style={{width:22,height:22,background:who==="YOU"?"#f8b800":"#1f2937",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:who==="YOU"?"#000":"#f8b800",flexShrink:0}}>{num}</div>
                    <div>
                      <div style={{fontSize:12,fontWeight:600,color:who==="YOU"?"#f8b800":"#e5e7eb"}}>{step}</div>
                      <div style={{fontSize:10,color:"#6b7280"}}>{time} · {who==="YOU"?<strong style={{color:"#f8b800"}}>You</strong>:"auto"}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card card-p">
                <h3 style={{fontWeight:700,fontSize:13,marginBottom:10}}>TEMPLATE MATCH</h3>
                {[["city-site","City Epoxy Site","80% reuse"],["saas-dashboard","SaaS Dashboard","70% reuse"],["landing-page","Marketing Landing","75% reuse"],["crm-dashboard","CRM Dashboard","65% reuse"]].map(([id,name,reuse])=>(
                  <div key={id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #f3f4f6"}}>
                    <span style={{fontSize:13}}>{name}</span>
                    <span className="badge badge-green">{reuse}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
