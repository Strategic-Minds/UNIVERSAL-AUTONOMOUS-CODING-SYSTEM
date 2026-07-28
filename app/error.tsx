'use client'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div style={{padding:'40px',textAlign:'center'}}>
      <h2 style={{color:'#ef4444',fontSize:'20px'}}>Something went wrong!</h2>
      <p style={{color:'#666',marginTop:'10px'}}>{error.message}</p>
      <button onClick={() => reset()} style={{background:'#f8b800',color:'#000',padding:'10px 20px',borderRadius:'6px',border:'none',cursor:'pointer',marginTop:'20px'}}>
        Try again
      </button>
    </div>
  )
}
