// ============================================================
// UACS UNIVERSAL TYPE DEFINITIONS
// ============================================================

export type ProjectStatus = 'idea' | 'spec' | 'brand' | 'build' | 'validate' | 'deployed' | 'archived'
export type ProjectPriority = 'P1' | 'P2' | 'P3' | 'P4' | 'P5'
export type AgentType = 'apex' | 'chatgpt' | 'browserworker'
export type QueueStatus = 'queued' | 'in_progress' | 'awaiting_approval' | 'blocked' | 'completed' | 'failed'
export type ValidationStatus = 'pending' | 'running' | 'passed' | 'failed' | 'auto_healing'

export interface UACSProject {
  id: string
  name: string
  description: string
  status: ProjectStatus
  priority: ProjectPriority
  repo_url?: string
  vercel_url?: string
  preview_url?: string
  qa_score?: number
  faang_passed?: boolean
  assigned_agent: AgentType
  created_at: string
  updated_at: string
  deployed_at?: string
}

export interface QueueItem {
  id: string
  project_id: string
  project_name: string
  phase: ProjectStatus
  agent: AgentType
  status: QueueStatus
  priority: ProjectPriority
  queued_at: string
  started_at?: string
  completed_at?: string
  eta?: string
  notes?: string
}

export interface ValidationResult {
  project_id: string
  pass1_code_quality: number
  pass2_visual_parity: number
  pass3_functional: number
  pass4_performance: number
  total_score: number
  status: ValidationStatus
  screenshot_urls: string[]
  issues: string[]
  auto_fixes: string[]
  browserworker_report_url?: string
}

export interface AgentStatus {
  name: AgentType
  status: 'online' | 'offline' | 'busy' | 'error'
  current_task?: string
  tasks_completed: number
  last_active: string
}

export interface IdeaSubmission {
  project_name: string
  description: string
  business_goal: 'revenue' | 'automation' | 'lead_gen' | 'internal_tool' | 'client_delivery'
  target_user: string
  reference_url?: string
  priority: ProjectPriority
  notes?: string
  mockup_urls?: string[]
}
