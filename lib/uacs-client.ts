// ============================================================
// UACS API CLIENT
// Connects to the UACS pipeline APIs
// ============================================================

const BROWSERWORKER_URL = process.env.NEXT_PUBLIC_BROWSERWORKER_URL || 
  'https://browserworker-j4homeh5w-strategic-minds-advisory.vercel.app'
const BRIDGE_URL = process.env.NEXT_PUBLIC_CHATGPT_BRIDGE_URL || 
  'https://xtreme-ai-bridge.vercel.app'

export async function screenshotPage(url: string): Promise<string | null> {
  try {
    const BW_SECRET = process.env.BROWSERWORKER_SECRET || ''
    const res = await fetch(`${BROWSERWORKER_URL}/api/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${BW_SECRET}` },
      body: JSON.stringify({
        steps: [
          { action: 'goto', url },
          { action: 'wait_for_selector', selector: 'body', timeout_ms: 8000 },
          { action: 'screenshot', fullPage: false }
        ]
      })
    })
    if (!res.ok) return null
    const data = await res.json()
    return data?.artifacts?.screenshots?.[0] || null
  } catch { return null }
}

export async function submitIdea(idea: {
  project_name: string
  description: string
  business_goal: string
  priority: string
  notes?: string
}): Promise<{ success: boolean; project_id?: string; error?: string }> {
  try {
    const res = await fetch('/api/queue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'idea', ...idea })
    })
    return await res.json()
  } catch (e: any) {
    return { success: false, error: e.message }
  }
}

export async function triggerChatGPTBrand(projectId: string, spec: object) {
  try {
    const res = await fetch(`${BRIDGE_URL}/api/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.BRIDGE_SHARED_SECRET}` },
      body: JSON.stringify({ type: 'brand_generation', project_id: projectId, spec })
    })
    return await res.json()
  } catch (e: any) {
    return { success: false, error: e.message }
  }
}

export async function runFAANGValidation(previewUrl: string): Promise<{
  code_quality: number
  visual_parity: number
  functional: number
  performance: number
  total: number
  pass: boolean
}> {
  // Stub — replace with actual BrowserWorker + PageSpeed calls
  return { code_quality: 24, visual_parity: 23, functional: 25, performance: 22, total: 94, pass: true }
}
