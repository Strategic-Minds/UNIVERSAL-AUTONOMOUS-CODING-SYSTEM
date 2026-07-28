"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  useEffect(() => { router.replace("/dashboard") }, [router])
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#f0f0f0",fontFamily:"Inter,sans-serif"}}>
      <div style={{textAlign:"center"}}>
        <div style={{width:48,height:48,background:"#000",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:"#f8b800",fontWeight:900,fontSize:24,margin:"0 auto 12px"}}>A</div>
        <div style={{fontWeight:700,fontSize:16}}>Loading APEX...</div>
      </div>
    </div>
  )
}
